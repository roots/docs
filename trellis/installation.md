---
date_modified: 2024-06-04 17:00
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
  - MWDelaney
---

# Installation

## What is Trellis?

[Trellis](https://roots.io/trellis/) is a tool to create WordPress web servers and deploy WordPress sites.

Trellis lets you create and manage servers that are production ready, performance optimized and based on best practices that are continuously improved. Trellis is self-hosting done right since you benefit from the community and experience of Roots.

### Why use Trellis?

You’ll get a complete WordPress server [running all the software](#software-installed) you need configured according to the best practices that are fully customizable.

<details>
<summary>Trellis features</summary>

#### Ansible

Trellis is powered by [Ansible](https://docs.ansible.com/ansible/latest/index.html) for configuration management. You don’t have to use brittle and confusing Bash scripts or worry about commands you found to copy and paste.

You get the benefit of Ansible [documentation](https://docs.ansible.com/ansible/latest/user_guide/index.html), its extensive library of [modules and plugins](https://docs.ansible.com/ansible/latest/collections/all_plugins.html), and the community ecosystem of [Galaxy roles](https://galaxy.ansible.com/).

#### Local development

Trellis comes with [Vagrant](https://www.vagrantup.com/) support for local development environments that run on isolated virtual machines. This means you don't have to worry about polluting your local OS with software that might break
or conflict with other tools you use.

However, using Vagrant is optional and you're free to use other local dev tools as well, or even none at all.

#### Customizable

While Trellis gives you everything for a standard WordPress server out of the
box, it's completely customizable as well. This is what makes Trellis different
from managed hosting or even tools like SpinupWP that automatically setup
WordPress servers.

Thanks to Ansible's YAML based configuration, Trellis is "infrastructure as
code" so you can easily see exactly what Trellis installs on your server and
customize if you want.

#### Portable without vendor-lock in

Trellis servers can be run on _any_ hosting platform; traditional dedicated server hosting or cloud platforms. All Trellis needs is a server running a plain Ubuntu operating system.

This means you can easily migrate hosting providers making your infrastructure much more flexible and portable. You can even "disconnect" your server from Trellis if you want and just manage your server manually. Trellis isn't required to keep your server running (but we do recommend it!).

#### Cost effective

Managed WP hosting can make your life easier, but it can also be
extremely expensive and is often overkill for simpler WordPress sites.

Trellis lets you run performant sites on extremely cheap servers ($5-10/month) and even supports running multiple sites on a single server for more efficiency.

#### Community backed

Since Trellis is open-source, we get the leverage of Roots and our community to continuously improve the defaults over time. We are constantly learning better settings and defaults for WordPress servers, and then we apply them to Trellis.

#### Development and production parity

Unlike many other solutions for WordPress server hosting, Trellis aims to have [parity between your development and production environments](https://roots.io/twelve-factor-10-dev-prod-parity/). Trellis comes setup to run locally with Vagrant so you can test your WordPress sites with full confidence that they'll work once you deploy to production.

#### CLI

Trellis has its own [CLI](cli.md) that makes managing your local and remote servers much easier. It also enables powerful CI/CD workflows like our [setup-trellis-cli](https://github.com/roots/setup-trellis-cli/) [GitHub action that can be used for continuous deploys](/trellis/docs/deploy-with-github-actions/).

#### Zero-downtime deploys

Trellis has atomic, zero-downtime deploys built-in that are completely
configurable with a powerful hook system. You can deploy and rollback releases
with a single command thanks to trellis-cli too.

</details>

### Trellis servers are production-ready

Trellis provisions a base Ubuntu 24.04 server by installing and configuring the following software:

* PHP 8.1+
* Nginx (including HTTP2/ and optional FastCGI micro-caching)
* MariaDB (a drop-in MySQL replacement)
* SSL support (scores an A+ on the [Qualys SSL Server Test](https://www.ssllabs.com/ssltest/))
* Let's Encrypt for free SSL certificates
* Composer
* WP-CLI
* sSMTP (mail delivery)
* Memcached
* Fail2ban and ferm

In addition to configuring common services like ntp, sshd, etc.

## System requirements

* [Vagrant](https://www.vagrantup.com/downloads.html)
* [Vagrant provider](https://developer.hashicorp.com/vagrant/docs/providers)
  * [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  * [Parallels](https://www.parallels.com/products/desktop/download/) (for Apple Silicon M1, M2, M3, etc. Macs)

::: tip macOS users
Want to skip the Vagrant and Vagrant provider requirements? [**Try Lima as an alternative**](/introducing-lima-to-trellis-for-faster-local-development/)
:::

::: warning Windows users
WSL is required in order to use Trellis. All Trellis commands must be run from a [WSL environment](https://docs.microsoft.com/en-us/windows/wsl/).
:::

<details>
<summary>Additional requirements for Windows users</summary>

* [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install)
* Vagrant must be installed in WSL
* VirtualBox must be installed in Windows
* The following must be set in your WSL shell configuration file (`~/.bashrc`):
  * `VAGRANT_WSL_ENABLE_WINDOWS_ACCESS = 1`
  * `export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"`
* All Trellis commands must be run WSL  

</details>

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

This command will start the Vagrant environment and provision the server. Once it's done, you can visit your development site at the URL you chose when you ran `trellis new`.

[Read more about Local Development](/trellis/docs/local-development/)

## Configure your environments

Trellis pre-configures most of your site's settings, but you'll need to fill in a few gaps in the [WordPress Sites](/trellis/docs/wordpress-sites/) configuration.

## Encrypt your vault files

You probably want to encrypt your vault files, which hold automatically-generated passwords and other sensitive information. [Read more about Vault](/trellis/docs/vault/)

## Provision your production server

Before deploying to production, you'll need to provision your server. [Read more about provisioning](/trellis/docs/remote-server-setup/)

```shell
trellis provision production
```

## Deploy to production

Ready to deploy your site to production? [Read more about deployments](/trellis/docs/deployments/)

```shell
trellis deploy production example.com
```
