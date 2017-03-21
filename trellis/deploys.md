---
ID: 7587
post_title: Deploys
author: Scott Walkinshaw
post_date: 2015-10-09 17:53:28
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/deploys/
published: true
---
Trellis offers one-command deploys out of the box with little configuration needed.

## Configuration

First you need to have at least one [WordPress site](https://roots.io/trellis/docs/wordpress-sites/) configured and your remote server provisioned and working according to the [remote server setup](https://roots.io/trellis/docs/remote-server-setup/).

For deploys, there's a couple more settings needed:

* `repo` (required) - git URL of your Bedrock-based WordPress project (in SSH format: `git@github.com:roots/bedrock.git`)
* `repo_subtree_path` (optional) - relative path to your Bedrock/WP directory in your repo if its not the root (like `site` in [roots-example-project](https://github.com/roots/roots-example-project.com))
* `branch` (optional) - the git branch to deploy (default: `master`)

Those variables should be added to the corresponding site in `group_vars/<environment>/wordpress_sites.yml` as detailed in the [docs](https://roots.io/trellis/docs/wordpress-sites/#remote-servers).

At this point you should also generate your salts and keys and save them to your `vault.yml` file.

## Deploying

Deploy with a single command: `./bin/deploy.sh <environment> <domain>`

`deploy.sh` is a very simple Bash script which just runs the actual `ansible-playbook` command which can be a little annoying to type out.

The actual command looks like this: `ansible-playbook deploy.yml -e "site=<domain> env=<environment>"`.

You can always use this command itself since it can take any additional `ansible-playbook` options.

**Trellis does not automatically install WordPress on remote servers**. It's normal and expected to see the WordPress install screen the first time you deploy. It's up to you to either import an existing database or install a fresh site.

## Default flow

By default, Trellis deploys are configured for Bedrock-based sites and take care of everything needed. The hooks below are for more advanced customization purposes.

## Hooks

Trellis deploys let you customize what happens at each step of the deploy process. A single deploy has the following steps in order:

1. `initialize` - creates the site directory structure (or ensures it exists)
2. `update` - clones the Git repo onto the remote server
3. `prepare` - prepares the files/directories in the new release path (such as moving the repo subtree if one exists)
4. `build` - builds the new release by copying templates, files, and folders
5. `share` - symlinks shared files/folders to new release
6. `finalize` - finalizes the deploy by updating the `current` symlink

Each step has a `before` and `after` hook. The hooks are variables that you can define to point to a custom task files. The tasks within that file will be run when the hook fires.

The hook variables available are:

* `deploy_before`
* `deploy_initialize_before`
* `deploy_initialize_after`
* `deploy_update_before`
* `deploy_update_after`
* `deploy_prepare_before`
* `deploy_prepare_after`
* `deploy_build_before`
* `deploy_build_after`
* `deploy_share_before`
* `deploy_share_after`
* `deploy_finalize_before`
* `deploy_finalize_after`
* `deploy_after`

### Default hooks

By default, Trellis only defines and uses two hooks: `deploy_build_after` and `deploy_finalize_after`.

* `deploy_build_after` is used to run `composer install`.
* `deploy_finalize_after` is used to restart services like php-fpm.

### Custom tasks

To use a hook, define/override the variable in the `deploy.yml` playbook file:

```yml
vars:
  deploy_build_after: "{{ playbook_dir }}/roles/deploy/hooks/build-after.yml"
  deploy_finalize_after: "{{ playbook_dir }}/roles/deploy/hooks/finalize-after.yml"
```

Those are the two default hooks that Trellis already uses. If you want to use the same hooks as we do and override them, we suggest copying the existing file and modifying it.

We also suggest keeping your hooks in a top level `deploy-hooks` folder in your Ansible folder like this:

```yml
vars:
  deploy_build_after: "{{ playbook_dir }}/deploy-hooks/build-after.yml"
  deploy_share_before: "{{ playbook_dir }}/deploy-hooks/share-before.yml"
  deploy_finalize_after: "{{ playbook_dir }}/roles/deploy/hooks/finalize-after.yml"
```

### SSH keys

Before you can deploy a site to a remote server, your SSH keys need to be working. Trellis takes advantage of SSH forwarding so your remote server does not need to generate an SSH key and add it to GitHub/Bitbucket.

The chain works like this: `local machine` -&gt; SSH via Ansible -&gt; `remote server` -&gt; Git clone -&gt; `remote Git repository`

See the [SSH Keys docs](https://roots.io/trellis/docs/ssh-keys/) on how to get your SSH key added to the `web` user which is the user Trellis deploys with.

### Example

Here's an example of all the configuration needed to deploy a site and what the commands would look like.

Configuration:
```yaml
# group_vars/production/wordpress_sites.yml

wordpress_sites:
  mysite.com:
    site_hosts:
      - canonical: mysite.com
    local_path: ../site
    repo: git@github.com:me/mysite.git
    repo_subtree_path: site
    multisite:
      enabled: false
    ssl:
      enabled: false
    cache:
      enabled: false
```

Deploy command:
```
./bin/deploy.sh production mysite.com
```

Or alternatively:
```
ansible-playbook deploy.yml -e "site=mysite.com env=production"
```

## Rollbacks

To rollback a deploy, run `ansible-playbook rollback.yml -e "site=<domain> env=<environment>"`
