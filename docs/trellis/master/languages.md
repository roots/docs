---
description: Approach for installing (and updating) core/plugins/themes languages on a Trellis/Bedrock WordPress site.
---

## Current state of language management
### Locking in language versions?
With composer (Bedrock site) the plugin versions are already locked-in. So it naturally makes sense to also lock-in the plugin languages.
The [Composer WordPress language packs project](https://wp-languages.github.io/) by Koodimonni offers composer packages for plugin languages.
However, providing all languages for each plugin version results in a very large amount of packages.
Because of this practical issue, the site offers language packages for only a subset of plugins, so chances are, that languages for some plugins your site is using are not available there (e.g. [Redirection plugin](https://wordpress.org/plugins/redirection/))

### Using custom composer installers
There are some custom composer installers which simply download the latest languages for core, plugins and themes. However, this approach doesn't allow any locking-in of language versions. One may end up with different translations for same site release.
- [wplang](https://github.com/bjornjohansen/wplang)
- [Composer Auto Language Updates](https://github.com/Angrycreative/composer-plugin-language-update)


## Using `wp` on trellis deploy
At the time of writing there is no way yet for locking-in languages of core, plugins and themes (for all plugins and themes), so we are stuck with installing the latest language available.
The best approach is using the official mechanisms, which would be the `wp language` subcommand:

### Prerequisites
`wp` starting at `2.0.1` is required with the [`--all ` feature introduced](https://github.com/wp-cli/language-command/pull/64).
If required with your trellis setup, set `wp_cli_version` to at least `2.0.2` or recent version (at time of writing this was `2.2.0` which worked as expected):
`groups_vars/all/main.yml`:
```yml
wp_cli_version: 2.2.0
````
Run the playbook (once) before deploying so the deploy hooks we will set up can use the right `wp` version!

### deploy hook
We use the [`finalize-after` deploy hook](https://roots.io/trellis/docs/deploys/#default-hooks) for installing, activating and updating the core/plugins/themes languages of a site for the languages `en_GB`, `de_DE_formal` and `de_DE`:

`deploy-hooks/sites/example.com-finalize-after.yml`:
```yaml
# Install + activate languages
- name: Install core languages en_GB de_DE
  command: wp language core install en_GB de_DE
  args:
    chdir: "{{ deploy_helper.current_path }}"

- name: Install (and activate) core language de_DE_formal
  command: wp language core install de_DE_formal --activate
  args:
    chdir: "{{ deploy_helper.current_path }}"


- name: Install plugins languages en_GB de_DE de_DE_formal
  command: wp language plugin install --all en_GB de_DE de_DE_formal
  args:
    chdir: "{{ deploy_helper.current_path }}"

- name: Install themes languages en_GB de_DE de_DE_formal
  command: wp language theme install --all en_GB de_DE de_DE_formal
  args:
    chdir: "{{ deploy_helper.current_path }}"


# Update installed languages
- name: Update installed core languages
  command: wp language core update
  args:
    chdir: "{{ deploy_helper.current_path }}"

- name: Update plugins languages
  command: wp language plugin --all update
  args:
    chdir: "{{ deploy_helper.current_path }}"

- name: Install themes languages
  command: wp language theme --all update
  args:
    chdir: "{{ deploy_helper.current_path }}"
````
(All these `wp` commands are idempotent, they only install/update when it is required.)

In the first part the required languages are installed for core, plugins and themes.
In the second part all the installed languages of core, plugins and themes are updated.

#### Removing no longer needed languages
Note: If you ever want to remove a language, you can do this here, too.
Ideally the language is removed before updating as this removes an unnecessary update of a language that is removed anyway.
- [`wp language core uninstall <language> <language> ...`](https://developer.wordpress.org/cli/commands/language/core/uninstall/)
- [`wp language plugin uninstall --all  <language> <language> ...`](https://developer.wordpress.org/cli/commands/language/plugin/uninstall/)
- [`wp language theme uninstall --all  <language> <language> ...`](https://developer.wordpress.org/cli/commands/language/theme/uninstall/)

### Initial deploy (non-setup site)
Many `wp` commands including `wp language` don't work on a WordPress site that is installed but not had been set up yet.
````
Error: The site you have requested is not installed.
Run `wp core install` to create database tables.
````
For making an initial deploy possible, the WordPress site has to be setup at the beginning of deploy. You may overwrite everything using a transfer script or backup/restore plugin, etc. This is only important here for being able to install/update the languages on initial deploy.

`deploy-hooks/finalize-after.yml`:
````
- name: Install WP (required for installing languages on non-transferred site)
  command: wp core {{ project.multisite.enabled | default(false) | ternary('multisite-install', 'install') }}
           --allow-root
           --url="{{ site_env.wp_home }}"
           {% if project.multisite.enabled | default(false) %}
           --base="{{ project.multisite.base_path | default('/') }}"
           --subdomains="{{ project.multisite.subdomains | default('false') }}"
           {% endif %}
           --title="{{ project.site_title | default(site) }}"
           --admin_user="{{ project.admin_user | default('admin') }}"
           --admin_password="{{ vault_wordpress_sites[site].admin_password }}"
           --admin_email="{{ project.admin_email }}"
  args:
    chdir: "{{ deploy_helper.current_path }}"
  register: wp_install
  changed_when: "'WordPress is already installed.' not in wp_install.stdout and 'The network already exists.' not in wp_install.stdout"
````

### Add deploy hooks
For making trellis actually using these new deploy hooks, they need to be added:
`groups_vars/all/main.yml`:
```yml
# Deploy hooks
deploy_build_before:
  - "{{ playbook_dir }}/deploy-hooks/sites/{{ site }}-build-before.yml" # build + upload theme assets

deploy_build_after:
  - "{{ playbook_dir }}/roles/deploy/hooks/build-after.yml" # built-in

deploy_finalize_before:
  - "{{ playbook_dir }}/roles/deploy/hooks/finalize-before.yml" # built-in

deploy_finalize_after:
  - "{{ playbook_dir }}/roles/deploy/hooks/finalize-after.yml" # built-in
  - "{{ playbook_dir }}/deploy-hooks/finalize-after.yml" # finish site setup for installing languages
  - "{{ playbook_dir }}/deploy-hooks/sites/{{ site }}-finalize-after.yml" # install + update languages
````

### Improve performance / prevent "translation downtimes"
By default, for each new release the languages would have to be reinstalled, during that time the site can appear partially untranslated (falling back to English by default, or to the language setup by a language fallback plugin).

For preventing this "translation downtime" and for making a language update instead of install possible, the `languages` folder can be added to `project_copy_folders`, so it is copied between releases.

`group_vars/all/main.yml`:
````
project_copy_folders:
  - vendor
  - web/app/languages # copy languages between releases
````

## Language fallback
By experience, for languages with a formal and non-formal variation, plugins are often only translated for one of these variations. It is possible to fall back at least to the non-formal variation by using a [language fallback plugin](https://wordpress.org/plugins/language-fallback/).
With such a plugin installed and enabled, when a string is not translated in current language, it is looked up from the fallback language first, instead of falling back immediately to English.
