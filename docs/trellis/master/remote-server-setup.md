---
description: Using Trellis on a remote server requires a server running a bare/stock version of Ubuntu 20.04 LTS. You can't run Trellis on a shared host.
---

# Remote Server Setup

Setting up remote servers (usually staging or production environments) is similar to the [local development setup](local-development.md) with a few additional requirements and steps.

In development, Trellis handles everything for you. It automatically creates a server (Vagrant virtual machine), provisions it, and installs WordPress.
For remote servers, the workflow is a little different with two new separate concepts:

- [Provision](#provision)
- [Deploy](#deploy)

Before getting to those, there's some additional requirements as well.

## Dependencies

The Trellis [installation instructions](installation.md) are optimized for a quick start using Vagrant. For deploying and provisioning remote servers, we need to ensure all of Trellis' dependencies (mainly Ansible) are installed on your local/host machine.

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

If you're using trellis-cli, just re-run the following command to ensure your
project is initialized and the dependencies are installed:

```bash
$ trellis init
```

</template>
<template v-slot:manual>

Run both the following commands in your local trellis project directory:

1. Install Ansible and other dependencies: `pip install -r requirements.txt`
2. Install Galaxy roles: `ansible-galaxy install -r galaxy.yml`

</template>
</CodeSwitcher>


## Server requirements

1. You need a server running a bare/stock version of Ubuntu 20.04 LTS (Focal). If you're using a host such as DigitalOcean that lets you pick an OS to start with, then select the Ubuntu 20.04 option.

::: warning Shared hosts
Trellis **cannot be used** on a shared host. Trellis requires a dedicated server if
you want to use it for provisioning and deployments.
:::

2. You need to be able to connect to your Ubuntu server from your local computer via SSH. We *highly* suggest doing this via SSH keys so you don't have to specify a password every time. Many hosts like DigitalOcean offer to automatically add your SSH key when creating a server so take advantage of that. Or follow a guide such as [this one](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2).

Once you have a Ubuntu server up and running, you can provision it.

## Provision

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

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

```bash
$ trellis provision <environment>
```

</template>
<template v-slot:manual>

```bash
$ ansible-playbook server.yml -e env=<environment>
```

</template>
</CodeSwitcher>

### Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision your remote servers again to apply the changes:

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

Run the following from any directory within your project:

```bash
$ trellis provision <environment>
```

</template>
<template v-slot:manual>

Run the following from your project's `trellis` directory:

```bash
$ ansible-playbook server.yml -e env=<environment>
```

</template>
</CodeSwitcher>

You can also provision with specific tags to only run the relevant roles:


<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

Run the following from any directory within your project:

```bash
$ trellis provision --tags users <environment>
```

</template>
<template v-slot:manual>

Run the following from your project's `trellis` directory:

```bash
$ ansible-playbook server.yml -e env=<environment> --tags=users
```

</template>
</CodeSwitcher>


## Deploy

In development it's easy to get your site/codebase onto the VM through synced folders. However for remote servers, we need to deploy first.

Deploys are done in Trellis by running the `deploy.yml` playbook. This gets your codebase onto the server by cloning it from a Git repository. It also takes cares of things like: running Composer, creating config files, reloading Nginx, etc.

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

Run the following from any directory within your project:

```bash
$ trellis deploy <environment>
```

</template>
<template v-slot:manual>

Run the following from your project's `trellis` directory:

```bash
$ ansible-playbook deploy.yml -e "site=<site name> env=<environment>"
```

</template>
</CodeSwitcher>

## Resources

- [Using Trellis to Provision and Deploy to DigitalOcean Droplets](https://roots.io/guides/using-trellis-to-provision-and-deploy-to-digitalocean-droplets/)
