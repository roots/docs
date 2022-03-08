---
description: Trellis uses Vagrant for local development environments. Our Vagrantfile uses Ansible to provision a virtual machine running your WordPress site.
---

# Local Development
Development environments are handled by [Vagrant](https://www.vagrantup.com/) in Trellis. For other options, see [below](#other-none-vagrant-options)

## Vagrant
Trellis' `Vagrantfile` automatically uses the Ansible provisioner to run the `dev.yml` playbook and you'll get a virtual machine running your WordPress site.

1. Configure your site(s) based on the [WordPress Sites docs](wordpress-sites.md) and read the [development specific](wordpress-sites.md#development) ones.
2. Make sure you've edited both `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault.yml`.
3. Optionally configure the IP address at the top of the `vagrant.default.yml` to allow for multiple boxes to be run concurrently (default is `192.168.56.5`).
4. Run `trellis up` from anywhere in your project (or `vagrant up` from your trellis directory, usually the `trellis/` subdirectory of your project).

::: warning Note
`trellis up` will fail [if you are using encrypted folders/hard drives](https://www.vagrantup.com/docs/synced-folders/nfs.html#other-notes)
:::

Then let Vagrant and Ansible do their thing. After roughly 5-10 minutes you'll have a server running and a WordPress site automatically installed and configured.

To access the VM, run `trellis ssh development` (or`vagrant ssh` from your `trellis` directory). Sites can be found at `/srv/www/<site name>`. See the [Vagrant docs](https://www.vagrantup.com/docs/cli/) for more commands.

Note that each WP site you configured is synced between your local machine (the host) and the Vagrant VM. Any changes made to your host will be synced to the VM.

Composer and WP-CLI commands need to be run on the virtual machine for any post-provision modifications. Front-end build tools should be run from your host machine and not the Vagrant VM.

Mounting an encrypted folder is not possible with Trellis due to an issue with NFS.

### WordPress installation

Trellis installs WordPress on your first `vagrant up` with `admin` as the default user. You can override this by defining `admin_user`, as noted in the [WordPress sites options](wordpress-sites.md#options).

### Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision the VM again to apply the changes:

Run the following from your project's `trellis` directory:

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

```bash
$ trellis provision development
```

</template>
<template v-slot:manual>

```bash
$ vagrant provision
```
</template>
</CodeSwitcher>

You can also provision with specific tags to only run the relevant roles:

Run the following from your project's `trellis` directory:

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

```bash
$ trellis provision --tags=users development
```

</template>
<template v-slot:manual>

```bash
$ SKIP_GALAXY=true ANSIBLE_TAGS=users vagrant provision
```

Notes on the commands:

- `SKIP_GALAXY` saves some time because you already have those roles installed
- `ANSIBLE_TAGS` runs only the relevant roles
- `--provision` is so that it runs the `dev.yml` playbook and its roles tagged `wordpress`

</template>
</CodeSwitcher>

If you added a *new* WordPress site (or manually added new synced directories to Vagrant), you'll need to reload the VM as well:

```bash
$ vagrant reload
```

### More
See the [Vagrant](../vagrant) page for more Vagrant specific configuration details.

## Other non-Vagrant options
While Trellis offers integrated Vagrant development environments, it is
completely optional. There are other local development options as well. Most of
these options mean you're using Trellis for your production servers but
something else entirely in development which is why it's not recommended.

### Laravel Valet
[Valet](https://laravel.com/docs/9.x/valet) can be used in development if you're
already using it for Laravel projects or want a lighter-weight solution than a
full virtual machine.

However, be warned that doesn't guarantee [development and production parity](https://roots.io/twelve-factor-10-dev-prod-parity/).
Using Valet locally means you aren't using Trellis _at all_ in development.

trellis-cli does offer some basic Valet integration as well. Run `trellis valet`
for more information.

### Manual virtual machines
If you use another tool to create and run virtual machines, Trellis can be
configured to provision them as well. For this use case, you'll need to follow
the [remote server setup](../remote-server-setup) documentation since
provisioning a remote server is mostly the same as provisioning a virtual machine.

There's a few things you'll probably want to manually replicate with the Vagrant
integration:
* networking and hosts file management: you'll need some way to access the guest
IP of your virtual machine. This might involve manually editing your
`/etc/hosts` file to ensure that the domain is mapped to that IP.
* synced folders: the root directory of your site/Trellis project will need to
be shared/synced to your virtual machine so the files are
accessible.

If you don't (or can't) sync the local folders, then your setup will be
identical to the remote server setup. You'll run the `server.yml` playbook and
install/deploy separately.

If you do sync local folders, you can use the `dev.yml` development playbook
which assumes your site is available on the guest VM and runs the WordPress
installation process automatically.

### Nothing
That's right... nothing! You might not care about a local development
environment. Or you might only want to use Trellis for deploying to managed servers
like Kinsta. Trellis is quite flexible and supports these uses cases as well.

See our [Deploying to Kinsta with Trellis](https://roots.io/guides/deploying-to-kinsta-with-trellis/) guide for
an example of this workflow.

Or you can even Vagrant locally and then deploy to a managed host such as
Kinsta.
