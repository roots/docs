---
ID: 13266
post_title: WordPress Sites
author: Scott Walkinshaw
post_date: 2016-03-28 21:10:17
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/wordpress-sites/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
Now that you have Trellis' requirements installed and a local project set up, the next thing to do is configure a WordPress site.

Everything in Trellis is built around the concept of "sites". Each Trellis managed server (local virtual machine or remote server) can support 1 or more WP sites. Trellis will automatically configure everything needed to host a WordPress site such as databases, Nginx vhosts, folder directories, etc.

These sites are configured in YAML files for each environment such as `group_vars/development/wordpress_sites.yml`.

There are two components and places to configure sites:

* Normal settings in `group_vars/development/wordpress_sites.yml`
* Passwords/secrets in `group_vars/development/vault.yml`

## Normal settings

`wordpress_sites` is a top-level dictionary used to define all the sites you want. Here's an absolute bare-minimum site as an example for development:

```yaml
# group_vars/development/wordpress_sites.yml
wordpress_sites:
  example.com:
    site_hosts:
      - example.dev
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: admin@example.dev
    multisite:
      enabled: false
    ssl:
      enabled: false
    cache:
      enabled: false
```

Each site starts with a "key" (`example.com` in this case). Trellis uses the key internally as the name of the site and as a default value in a lot of variables. We recommend naming your sites after their domain so it's descriptive.

Nested under the name/key are the site's variables which are for that site only. You only need to define a variable/setting if you want to overwrite the default value which can be found below.

## Passwords/secrets

When you add/edit a site in`wordpress_sites.yml`, you also need to edit `vault.yml` for the accompanying site/key. `vault.yml` exists to make easy to use Ansible's Vault feature to encrypt certain files. You never want to include plain-text passwords in a Git repository so we make it easier to optionally encrypt the `vault.yml` file while leaving the normal settings separate. See [Vault](https://roots.io/trellis/docs/vault/) for more information on this.

```yaml
#  group_vars/development/vault.yml
vault_wordpress_sites:
  example.com:
    admin_password: admin
    env:
      db_password: example_dbpassword
```

Notice the matching site keys in both `wordpress_sites` and `vault_wordpress_sites` for `example.com`.

For a complete working example of a real-life WordPress site, you can view the config files for [roots-example-project.com](https://github.com/roots/roots-example-project.com).

## Options

### Common

* `site_hosts` - array of hosts that Nginx will listen on (*required*, include main domain at least)
* `www_redirect` - whether to redirect `www/non-www` counterparts of `site_hosts` (default: `true`)
* `local_path` - path targeting Bedrock-based site directory (*required*)
* `db_create` - whether to auto create a database or not (default: `true`)
* `db_import` - Path to local `sql` dump file which will be imported (optional)
* `ssl` - SSL options. See the [SSL docs](https://roots.io/trellis/docs/ssl/)
* `multisite` - Multisite options. See the [Multisite docs](https://roots.io/trellis/docs/multisite/)
* `cache` - Nginx FastCGI cache options. See the [Cache docs](https://roots.io/trellis/docs/fastcgi-caching/)
* `env` - environment variables
  * `disable_wp_cron` - Disable WP cron and use system's (default: `true`)
  * `wp_home` - `WP_HOME` constant (default: `<protocol>://${HTTP_HOST}`)
  * `wp_siteurl` - `WP_SITEURL` constant (default: `${WP_HOME}/wp`)
  * `wp_env` - environment (default: `env` via Ansible)
  * `db_name` - database name (default: `<site name>_<env>`)
  * `db_user` - database username (default: `<site name>`)
  * `db_password` - database password (*required*, in `vault.yml`)
  * `db_host` - database hostname (default: `localhost`)

### Development

* `site_install` - whether to install WordPress or not (default: `true`)
* `site_title` - WP site title (default: site name)
* `admin_user` - WP admin user name (default: `admin_email`)
* `admin_email` - WP admin email address (*required*)
* `admin_password` - WP admin user password (*required* in `vault.yml`)
* `initial_permalink_structure` - permalink structure applied at time of WP install (default: `/%postname%/`)

### Remote servers

* `repo` - URL of the Git repo of your Bedrock project (*required*)
* `repo_subtree_path` - relative path to your Bedrock/WP directory in your repo (above) if its not the root (like site/ in roots-example-project)
* `branch` - the branch name, tag name, or commit SHA1 you want to deploy (default: `master`)
* `env` - environment variables
  * `auth_key` - Generate (*required* in `vault.yml`)
  * `secure_auth_key` - Generate (*required* in `vault.yml`)
  * `logged_in_key` - Generate (*required* in `vault.yml`)
  * `nonce_key` - Generate (*required* in `vault.yml`)
  * `auth_salt` - Generate (*required* in `vault.yml`)
  * `secure_auth_salt` - Generate (*required* in `vault.yml`)
  * `logged_in_salt` - Generate (*required* in `vault.yml`)
  * `nonce_salt` - Generate (*required* in `vault.yml`)
