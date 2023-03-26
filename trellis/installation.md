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
Trellis comes with [Vagrant](https://www.vagrantup.com/) support for local
development environments that run on isolated virtual machines. This means you
don't have to worry about polluting your local OS with software that might break
or conflict with other tools you use.

However, using Vagrant is optional and you're free to use other local dev tools
as well, or even none at all.

#### Customizable
While Trellis gives you everything for a standard WordPress server out of the
box, it's completely customizable as well. This is what makes Trellis different
from managed hosting or even tools like SpinupWP that automatically setup
WordPress servers.

Thanks to Ansible's YAML based configuration, Trellis is "infrastructure as
code" so you can easily see exactly what Trellis installs on your server and
customize if you want.

#### Portable without vendor-lock in
Trellis servers can be run on _any_ hosting platform; traditional dedicated
server hosting or cloud platforms. All Trellis needs is a server running a plain
Ubuntu operating system.

This means you can easily migrate hosting providers making your infrastructure
much more flexible and portable. You can even "disconnect" your server from
Trellis if you want and just manage your server manually. Trellis isn't required
to keep your server running (but we do recommend it!).

#### Cost effective
Managed WP hosting can make your life easier, but it can also be
extremely expensive and is often overkill for simpler WordPress sites.

Trellis lets you run performant sites on extremely cheap servers ($5-10/month)
and even supports running multiple sites on a single server for more efficiency.

#### Community backed
Since Trellis is open-source, we get the leverage of Roots and our community to
continuously improve the defaults over time. We are constantly learning better
settings and defaults for WordPress servers, and then we apply them to Trellis.

#### Development and production parity
Unlike many other solutions for WordPress server hosting, Trellis aims to have
[parity between your development and production environments](https://roots.io/twelve-factor-10-dev-prod-parity/). Trellis comes setup to run locally with Vagrant so you can test your WordPress sites with full confidence that they'll work once you deploy to production.

#### CLI
Trellis has its own [CLI](cli.md) that makes managing your local and remote servers much
easier. It also enables powerful CI/CD workflows like our [setup-trellis-cli](https://github.com/roots/setup-trellis-cli/)
GitHub action for continuous deploys.

#### Zero-downtime deploys
Trellis has atomic, zero-downtime deploys built-in that are completely
configurable with a powerful hook system. You can deploy and rollback releases
with a single command thanks to trellis-cli too.

</details>

### Software installed
Trellis provisions a base Ubuntu 22.04 server by installing and configuring the following software:

* PHP 8.0+
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

## Requirements

Trellis relies on a few other software tools. Make sure all dependencies have been installed before moving on:

- [Python 3](./python.md)
- [trellis-cli](https://github.com/roots/trellis-cli)

### Local development requirements
If you want to use Trellis' built-in Vagrant integration, you'll need the
following as well:

- [Vagrant](https://www.vagrantup.com/downloads.html) >= 2.1.0
- a Vagrant [provider](https://www.vagrantup.com/docs/providers):
  - x86 (Intel based Macs, Linux, Windows PCs): [VirtualBox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
  - Apple Silicon (M1 based Macs): See our [Parallels page](vagrant.md#parallels-apple-silicon-m1-macs)

::: warning Note for Windows users
**All commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**
:::

## Install trellis-cli

Install [trellis-cli](https://github.com/roots/trellis-cli) via [Homebrew](https://brew.sh/):

```shell
$ brew install roots/tap/trellis-cli
```

## Create a project

To create a new project, first, pick a descriptive name (and use it in place of the default `example.com`).
We recommend the domain of the site for convenience.

```shell
$ trellis new example.com
```

Or to explicitly set the site name and host, use the following:

```shell
$ trellis new --name example.com --host www.example.com ~/path/to/my/project
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

Assuming you used the CLI, you'll also have your first WordPress site automatically configured based on the
project folder (or name and host provided).

Check out the following files to see the basic site configuration:
* `trellis/group_vars/development/wordpress_sites.yml`
* `trellis/group_vars/production/wordpress_sites.yml`

## What's next?
Now that you have a project created and the basics configured, you can explore the following steps:

* Review your [sites and learn how to customize them](./wordpress-sites.md)
* Run your [local development server with Vagrant](./local-development.md)
* [Provision](./remote-server-setup.md) and [deploy](./deployments.md) a remote staging or production server
* Run `trellis --help` to explore all the commands available in the CLI
