---
date_modified: 2024-09-11 10:00
date_published: 2015-10-15 12:27
description: Using Trellis on a remote server requires a server running a bare/stock version of Ubuntu 24.04 LTS. You can't run Trellis on a shared host.
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

Trellis can be used for setting up remote servers (offered by VPS/cloud service providers such as [DigitalOcean](/trellis/docs/deploy-to-digitalocean/)) to host your staging and production environments.

::: warning
**Trellis cannot provision shared or managed hosts.** Trellis requires a bare server if you want to use it for provisioning.
:::

## Server requirements

* Ubuntu 24.04 LTS
* SSH access to the server

You need a server running a bare/stock version of Ubuntu 24.04 LTS. If you're using a host such as DigitalOcean that lets you pick an OS to start with, then select the Ubuntu 24.04 option.

You need to be able to connect to your Ubuntu server from your local computer via SSH. We *highly* suggest doing this via SSH keys so you don't have to specify a password every time. Many hosts offer to automatically add your SSH key when creating a server, so take advantage of that. 

Once you have a Ubuntu server up and running, you can provision it.

## Provisioning

Provisioning a server means to set it up with the necessary software and configuration to run a WordPress site. For Trellis this means things like: installing MariaDB, installing Nginx, configuring Nginx, creating a database, etc.

Trellis has two main [playbooks](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html): `dev.yml` and `server.yml`. As mentioned in local development, Vagrant automatically runs the `dev.yml` playbook for us.

For remote servers, you provision a server via the `server.yml` playbook. This leaves you with a server *prepared* to run a WordPress site, but without the actual codebase yet.

Before provisioning your server, there's a little more configuration to do.
First determine the _environment_ you want to configure; after development,
you'll likely be creating a `production` or `staging` environment.

### Configuration

1. Copy your `wordpress_sites` from your working development site in `group_vars/development/wordpress_sites.yml` to `group_vars/<environment>/wordpress_sites.yml`.
2. Modify your site and add the necessary settings for [remote servers](wordpress-sites.md#remote-servers) since they have a few more settings than local development. Also see the [Passwords docs](passwords.md).
3. Add your server hostname to `hosts/<environment>` (replacing `your_server_hostname`).
4. Specify public SSH keys for `users` in `group_vars/all/users.yml`. See the [SSH Keys docs](ssh-keys.md).
5. Consider setting `sshd_permit_root_login: false` in `group_vars/all/security.yml`. See the [Security docs](security.md).

Now you're ready to provision your server. Ansible connects to the remote server
via SSH so run the following command from your local machine:

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
