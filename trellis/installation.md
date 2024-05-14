---
date_modified: 2023-01-27 13:17
date_published: 2015-10-15 12:20
description: Trellis installation and new project instructions.
title: Installing Trellis
authors:
  - ben
  - Log1x
  - MWDelaney
  - nikitasol
  - swalkinshaw
  - TangRufus
---

# Installation

## System requirements

* [Vagrant](https://www.vagrantup.com/downloads.html)
* A Vagrant [provider](https://developer.hashicorp.com/vagrant/docs/providers):
  * [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  * [Parallels](https://www.parallels.com/products/desktop/download/) (for Apple Silicon M1, M2, M3, etc. Macs)

## Install Trellis CLI

```shell
brew install roots/tap/trellis-cli
```

## Create a new project with Trellis

Choose a descriptive project name (and use it in place of the default example.com). We recommend the domain of the site for uniqueness.

```shell
trellis new example.com
```

After you've created a project, the folder structure for a Trellis project will look like this:

```shell
example.com/      # → Root folder for the project
├── trellis/      # → Your server configuration (a customized install of Trellis)
└── site/         # → A Bedrock-based WordPress site
    └── web/
        ├── app/  # → WordPress content directory (themes, plugins, etc.)
        └── wp/   # → WordPress core (don't touch! - managed by Composer)
```

Check out the following files to review the basic site configuration:

* `trellis/group_vars/development/wordpress_sites.yml`
* `trellis/group_vars/production/wordpress_sites.yml`

## Start your development environment

```shell
trellis up
```

This command will start the Vagrant environment and provision the server. Once it's done, you can visit your developmentsite at the URL you chose when you ran `trellis new`.

See [Local Development](/trellis/docs/local-development-environment/) for more information.

## What's Next?

### Encrypt your vault files

You probably want to encrypt your vault files, which hold automatically-generated passwords and other sensitive information. Check out the [Vault](/trellis/docs/vault/) documentation for more information.

::: note Shut down your development environment

Before you encrypt your vault files, make sure to shut down your development environment with `trellis down`.
:::

```shell
trellis vault encrypt
```

### Provision your `production` server

Before deploying to production, you'll need to provision your server. Check out [Provisioning](/trellis/docs/remote-server-setup//) for details.

```shell
trellis provision production
```

### Deploy to `production`

When you're ready to deploy your site to production, check out the [Deployments](/trellis/docs/deployments) for details.

```shell
trellis deploy production example.com
```
