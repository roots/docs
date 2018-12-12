---
ID: 7765
post_title: Remote Server Setup
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/remote-server-setup/
published: true
post_date: 2015-10-15 12:27:00
---
Setting up remote servers (staging/production) is similar to the [local development setup](https://roots.io/trellis/docs/local-development-setup/) with a couple differences.

In development, Trellis handles everything for you. It automatically creates a server (virtual machine), provisions it, and installs WordPress.

For remote servers, the workflow is a little different with two new concepts:

* Provision
* Deploy

## Provision

Provisioning a server means to set it up with the necessary software and configuration to run a WordPress site. For Trellis this means things like: installing MariaDB, installing Nginx, configuring Nginx, creating a database, etc.

Trellis has two main [playbooks](http://docs.ansible.com/ansible/playbooks.html): `dev.yml` and `server.yml`. As mentioned in local development, Vagrant automatically runs the `dev.yml` playbook for us.

For remote servers, you provision a server via the `server.yml` playbook. This leaves you with a server *prepared* to run a WordPress site, but without the actual codebase yet.

## Deploy

In development it's easy to get your site/codebase onto the VM through synced folders. However for remote servers, we need to deploy first.

Deploys are done in Trellis by running the `deploy.yml` playbook. This gets your codebase onto the server by cloning it from a Git repository. It also takes cares of things like: running Composer, creating config files, reloading Nginx, etc.

## Requirements

The Trellis [installation instructions](https://roots.io/trellis/docs/installing-trellis/) skipped a few requirements because Vagrant handles them automatically for us.

To use Trellis for remote servers, we recommend installing Ansible locally on your host machine ([except for Windows users](https://roots.io/trellis/docs/windows/)).

1. Install [Ansible](http://docs.ansible.com/ansible/intro_installation.html#latest-releases-via-pip) >= 2.4
2. Install Galaxy roles: `ansible-galaxy install -r requirements.yml` (in local trellis directory)

Then there are two additional requirements for the remote server itself:

1. You need a server running a bare/stock version of Ubuntu 18.04 LTS (Bionic Beaver). If you're using a host such as DigitalOcean, then just select their Ubuntu 18.04 option.

**You can't run Trellis on a shared host**.

2. You need to be able to connect to your server from your local computer via SSH. We *highly* suggest doing this via SSH keys so you don't have to specify a password every time. Many hosts like DigitalOcean offer to automatically add your SSH key when creating a server so take advantage of that. Or follow a guide such as [this one](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2).

Now that you have a working Ubuntu 18.04 server that you can easily SSH into, you need to configure a few things:

1. Copy your `wordpress_sites` from your working development site in `group_vars/development/wordpress_sites.yml` to the remote environment you want (`staging` or `production`) in `group_vars/production/wordpress_sites.yml`.
2. Modify your site and add the necessary settings for [remote servers](https://roots.io/trellis/docs/wordpress-sites/#remote-servers) since they have a few more settings than local development. Also see the [Passwords docs](https://roots.io/trellis/docs/passwords/).
3. Add your server hostname to `hosts/<environment>` (replacing `your_server_hostname`).
4. Specify public SSH keys for `users` in `group_vars/all/users.yml`. See the [SSH Keys docs](https://roots.io/trellis/docs/ssh-keys/).
5. Consider setting `sshd_permit_root_login: false` in `group_vars/all/security.yml`. See the [Security docs](https://roots.io/trellis/docs/security/).
6. Run `ansible-playbook server.yml -e env=<environment>` from your local machine (Ansible connects to your remote server via SSH).

This leaves you with a *provisioned* server. The next step is to [deploy](https://roots.io/trellis/docs/deploys/) your site.

## Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision your remote servers again to apply the changes:

```bash
ansible-playbook server.yml -e env=<environment>
```

You can also provision with specific tags to only run the relevant roles:

```bash
ansible-playbook server.yml -e env=<environment> --tags=users
```