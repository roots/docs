---
date_modified: 2024-05-22 11:15
date_published: 2015-09-07 20:44
description: Trellis offers zero-downtime WordPress deployment out of the box with little configuration needed. Hooks let you customize what happens at each step of the atomic deploy process.
title: Deployments
authors:
  - ben
  - dalepgrant
  - Log1x
  - MWDelaney
  - swalkinshaw
  - TangRufus
---

# Deployments

Trellis allows zero-downtime WordPress deployment out of the box with a little configuration. Hooks let you customize what happens at each step of the deploy process.

::: note Trellis deploys from Git

Trellis deploys your site from a Git repository. Make sure the `repo` and `branch` keys are set correctly in your `group_vars/<environment>/wordpress_sites.yml` file and that your project is commited to the repository. [Read more about WordPress Sites](/trellis/docs/wordpress-sites/).
:::

## Configuration

First, you need to have at least one [WordPress site](wordpress-sites.md) configured and your remote server provisioned and working according to the [remote server setup](remote-server-setup.md).

For deploys, there's a couple more settings needed:

- `repo` - git URL of your Bedrock-based WordPress project (in SSH format: `git@github.com:roots/example.com.git`)
- `branch` - the git branch to deploy (default: `master`)

Those variables should be added to the corresponding site in `group_vars/<environment>/wordpress_sites.yml` as detailed in the [docs](wordpress-sites.md).

## Deploying

Run the following from any directory within your project:

```shell
trellis deploy <environment>
```

::: warning Note
**Trellis does not automatically "install" WordPress on remote servers**.

It's normal and expected to see the WordPress install screen the first time you deploy. It's up to you to either import an existing database or install a fresh site.
:::

## Rollbacks

Run the following from any directory within your project:

```shell
trellis rollback <environment>
```

Manually specify a different release using `--release=12345678901234` as such:

```shell
trellis rollback --release=12345678901234 <environment>
```

By default Trellis stores 5 previous releases, not including the current release. See `deploy_keep_releases` in [Options - Remote Servers](wordpress-sites.md) to change this setting.

## Resources

- [Using Trellis to Provision and Deploy to DigitalOcean Droplets](https://roots.io/trellis/docs/deploy-to-digitalocean/)

## What's Next?

Keep reading to learn about [hooks](#hooks) and how to customize your deploys.

## Default flow

By default, Trellis deploys are configured for Bedrock-based sites and take care of everything needed. The hooks below are for more advanced customization purposes.

## Hooks

Trellis deploys let you customize what happens at each step of the atomic deployment process. A single deploy has the following steps in order:

1. `initialize` - creates the site directory structure (or ensures it exists)
2. `update` - clones the Git repo onto the remote server
3. `prepare` - prepares the files/directories in the new release path (such as moving the repo subtree if one exists)
4. `build` - builds the new release by copying templates, files, and folders
5. `share` - symlinks shared files/folders to new release
6. `finalize` - finalizes the deploy by updating the `current` symlink (atomic deployments)

Each step has a `before` and `after` hook. The hooks are variables that you can define with a list of custom task files to be included and run when the hook fires.

The hook variables available are:

- `deploy_before`
- `deploy_initialize_before`
- `deploy_initialize_after`
- `deploy_update_before`
- `deploy_update_after`
- `deploy_prepare_before`
- `deploy_prepare_after`
- `deploy_build_before`
- `deploy_build_after`
- `deploy_share_before`
- `deploy_share_after`
- `deploy_finalize_before`
- `deploy_finalize_after`
- `deploy_after`

### Default hooks

By default, Trellis defines and uses three hooks:

- `deploy_build_after` runs `composer install`.
- `deploy_finalize_before` checks the WordPress installation.
- `deploy_finalize_after` refreshes WordPress settings and reloads php-fpm.

The default deploy hooks are defined in `roles/deploy/defaults/main.yml`:

```yaml
deploy_build_before:
  - '{{ playbook_dir }}/deploy-hooks/build-before.yml'

deploy_build_after:
  - '{{ playbook_dir }}/roles/deploy/hooks/build-after.yml'
  # - "{{ playbook_dir }}/deploy-hooks/sites/{{ site }}-build-after.yml"

deploy_finalize_before:
  - '{{ playbook_dir }}/roles/deploy/hooks/finalize-before.yml'

deploy_finalize_after:
  - '{{ playbook_dir }}/roles/deploy/hooks/finalize-after.yml'
```

The `deploy_build_before` definition and the commented path under `deploy_build_after` offer examples of using hooks for custom tasks, as described below.

### Custom tasks

To use a deploy hook, define or override the hook variable somewhere within your `group_vars` directory, such as in `group_vars/all/main.yml`. If you end up defining many hooks, you may want to create a new file such as `group_vars/all/deploy-hooks.yml`.

Each deploy hook variable is a list of task files to be included and run when the hook fires. We suggest keeping your hooked task files in a top level `deploy-hooks` folder. Here are some example hook variable definitions:

```yaml
# Defining a hook that Trellis does not already use by default
deploy_before:
  - '{{ playbook_dir }}/deploy-hooks/deploy-before.yml'

# Overriding a hook that Trellis already uses by default
deploy_build_after:
  - '{{ playbook_dir }}/roles/deploy/hooks/build-after.yml'
  - '{{ playbook_dir }}/deploy-hooks/build-after.yml'
  - '{{ playbook_dir }}/deploy-hooks/sites/{{ site }}-build-after.yml'
```

The second example above demonstrates overriding the `deploy_build_after` hook that Trellis already uses by default. The first include file in this hook's list is `roles/deploy/hooks/build-after.yml`, which is the task file Trellis usually executes. If you omit a hook's default file when overriding an existing hook variable, the default file's tasks will no longer execute.

The second include file in the `deploy_build_after` example above, `deploy-hooks/build-after.yml`, is an example of adding a custom task file that would run on every deploy, regardless the site being deployed. The third include file, <code>deploy-hooks/sites/{{ site }}-build-after.yml</code>, demonstrates how you could use a `{{ site }}` variable to include a file based on the name of the site being deployed, e.g., `example.com-build-after.yml`.

### SSH keys

Before you can deploy a site to a remote server, your SSH keys need to be working. Trellis takes advantage of SSH forwarding so your remote server does not need to generate an SSH key and add it to GitHub/Bitbucket.

The chain works like this: `local machine` -&gt; SSH via Ansible -&gt; `remote server` -&gt; Git clone -&gt; `remote Git repository`

See the [SSH Keys docs](ssh-keys.md) on how to get your SSH key added to the `web` user which is the user Trellis deploys with.

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

Run the following from any directory within your project:

```shell
trellis deploy <environment>
```
