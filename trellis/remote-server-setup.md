---
date_modified: 2023-01-27 13:17
date_published: 2015-10-15 12:27
description: Using Trellis on a remote server requires a server running a bare/stock version of Ubuntu 22.04 LTS. You can't run Trellis on a shared host.
title: Remote Server Setup
authors:
  - ben
  - fullyint
  - Log1x
  - MWDelaney
  - nicbovee
  - swalkinshaw
  - MWDelaney
---

# Remote Server Setup

Trellis sets up and configures (or "provisions") remote Ubuntu servers (like [DigitalOcean](https://digitalocean.com) droplets) to host your `staging` and `production` environments. It does this using [Ansible](https://www.ansible.com/) playbooks to maintain [parity between your development and production environments](https://roots.io/twelve-factor-10-dev-prod-parity/). Trellis handles everything from installing packages to configuring Nginx and PHP and creating databases.

Trellis also deploys your WordPress site to your `staging` and `production` servers with zero downtime.

## (Remote) system requirements

* A server running a bare/stock version of Ubuntu 22.04 LTS.

::: warning Shared hosts
Trellis **cannot be used** on a shared host. Trellis requires a dedicated server if you want to use it for provisioning and deployments.
:::

* SSH access to your Ubuntu server

::: note We recommend using SSH keys
We *highly* suggest using SSH keys so you don't have to specify a password every time you interact with your remote server(s). Many hosts like DigitalOcean offer to automatically add your SSH key when creating a server so take advantage of that. Or follow a guide like [this one](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2).

## Provisioning

Provisioning a server means to set it up with the necessary software and configuration to run a WordPress site. For Trellis this means things like: installing MariaDB, installing Nginx, configuring Nginx, creating a database, etc.

### Configure your environment

Modify your project's `group_vars/<environment>/wordpress_sites.yml` file to match your site's details following the [WordPress Sites](/trellis/docs/wordpress-sites/) documentation.

### Provision your server

Run the following command from your local machine:


```shell
trellis provision <environment>
```

### Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision your remote servers again to apply the changes:

Run the following from any directory within your project:

```shell
trellis provision <environment>
```

You can also provision with specific tags to only run the relevant roles:

Run the following from any directory within your project:

```shell
trellis provision --tags users <environment>
```

## What's Next?

[Deploy your site](/trellis/docs/deployments/) to your server!


## The technical details

Trellis has two main [playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html): `dev.yml` and `server.yml`. As mentioned in local development, Vagrant automatically runs the `dev.yml` playbook for us.

For remote servers, you provision a server via the `server.yml` playbook. This leaves you with a server *prepared* to run a WordPress site, but without the actual codebase yet.
