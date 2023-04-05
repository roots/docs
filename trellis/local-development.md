---
date_modified: 2023-01-27 13:17
date_published: 2015-10-15 12:24
description: Trellis uses Vagrant for local development environments. Our Vagrantfile uses Ansible to provision a virtual machine running your WordPress site.
title: Local Development
authors:
  - ben
  - fullyint
  - IanEdington
  - Log1x
  - MWDelaney
  - swalkinshaw
  - TangRufus
---

# Local Development
Trellis has two official integrations for development environments using virtual machines:

* [Vagrant](#vagrant)
* [Trellis CLI](#trellis-cli)

Other options include:
* [Laravel Valet](#laravel-valet)
* [Manual virtual machines](#manual-virtual-machines)
* [Nothing!](#nothing)

## Vagrant
Trellis integrates with Vagrant to automatically run the [Ansible provisioner](https://www.vagrantup.com/docs/provisioning/ansible) via the default [`Vagrantfile`](https://github.com/roots/trellis/blob/master/Vagrantfile). Provisioning in development uses the `dev.yml` Ansible playbook to create a Vagrant virtual machine running your WordPress site.

Follow these steps to get a development server running:
1. Configure your site(s) based on the [WordPress Sites docs](wordpress-sites.md) and read the [development specific](wordpress-sites.md#development) ones.
2. Make sure you've edited both `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault.yml`.
3. Optionally configure the IP address at the top of the `vagrant.default.yml` to allow for multiple boxes to be run concurrently (default is `192.168.56.5`).
4. Run `trellis up` from anywhere in your project (or `vagrant up` from your trellis directory, usually the `trellis/` subdirectory of your project).

::: warning Note
`trellis up` will fail [if you are using encrypted folders/hard drives](https://www.vagrantup.com/docs/synced-folders/nfs.html#other-notes)
:::

Then let Vagrant and Ansible do their thing. After roughly 5-10 minutes you'll have a virtual machine running and a WordPress site automatically installed and configured.

To access the VM, run `trellis ssh development` (or`vagrant ssh` from your `trellis` directory). Sites can be found at `/srv/www/<site name>` on the Ubuntu VM. See the [Vagrant docs](https://www.vagrantup.com/docs/cli/) for more commands.

Note that each WP site you configured is synced between your local machine (the host) and the Vagrant VM. Any changes made to your host will be synced instantly to the VM. There's no need to manually sync files or deploy to the VM.

Composer and WP-CLI commands need to be run on the virtual machine for any post-provision modifications. Front-end build tools should be run from your host machine and not the Vagrant VM.

### WordPress installation

Trellis installs WordPress on your first `vagrant up` with `admin` as the default user. You can override this by defining `admin_user`, as noted in the [WordPress sites options](wordpress-sites.md#options).

### Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision the VM again to apply the changes:

Run the following from your project's `trellis` directory:

```shell
$ trellis provision development
```

You can also provision with specific tags to only run the relevant roles:

Run the following from your project's `trellis` directory:

```shell
$ trellis provision --tags=users development
```

If you added a *new* WordPress site (or manually added new synced directories to Vagrant), you'll need to reload the VM as well:

```shell
$ vagrant reload
```

### More
See the [Vagrant](../vagrant) page for more Vagrant specific configuration details.

## Trellis CLI
::: tip
New in trellis-cli `v1.10.0`: experimental VM support built-in! See our
[blog](https://roots.io/introducing-lima-to-trellis-for-faster-local-development/#adding-lima-support-to-trellis)
for the announcement.
:::

Trellis' [CLI](cli.md) now includes built-in integration for managing virtual machines in development as an alternative to Vagrant.

VM support is powered by [Lima](https://github.com/lima-vm/lima) which is an open source tool to run Linux virtual machines on macOS.
Lima isn't just a replacement for Vagrant, it also replaces the Vagrant VM provider like VirtualBox or Parallels too.

The VM integration with Lima uses macOS's Virtualization.Framework ("vz") which offers near-native performance and that includes file syncing via `virtiofs`.

### Requirements:
* macOS 13 (Ventura)
* Intel or Apple Silicon
* Lima >= 0.15

### Usage:
There's 5 new commands:

* `trellis vm start` - create or start a VM
* `trellis vm stop` - stop a running VM
* `trellis vm delete` - delete a stopped VM
* `trellis vm shell` - open a shell/terminal on the VM
* `trellis vm sudoers` - configure sudoers to avoid the need for `sudo`

Run `trellis vm <command> -h` for details on each command.

For default use cases, `trellis vm start` can be run without any customization first. It will create a new virtual machine (using Lima) from a generated config file (`project/trellis/.trellis/lima/config/<name>.yml`). The site's `local_path` will be automatically mounted on the VM and your `/etc/hosts` file will be updated.

Note: run `trellis vm sudoers -h` to make `/etc/hosts` file updates passwordless:
```bash
$ trellis vm sudoers | sudo tee /etc/sudoers.d/trellis
```

Under the hood, those commands wrap equivalent `limactl` features. Just like the previous Vagrant integration, you can always run `limactl` directly to manage your VMs.

### Configuration:
For the common use case, the default configuration should be all that's needed which is why config options are limited to start with. We will offer more customization over time.

The CLI [config file](cli.md#configuration) (global or project level) supports a new `vm` option. The only useful config option right now is `ubuntu` for setting the Ubuntu version.

Here's an example of specifying 20.04:

```yml
vm:
  ubuntu: 20.04
```

Note: this must be changed _before_ creating the VM, otherwise you'll need to delete it first and re-create it.

### Integration details
When you first run `trellis vm start`, the CLI will do the following:

1. Generate a Lima config file (`.trellis/lima/example.com.yml`) based on your Trellis project's development site
2. Create the Lima instance by running `limactl start --name=example.com .trellis/lima/example.com.yml`
3. Generate an Ansible inventory/hosts file for the VM (`.trellis/lima/inventory`)
4. Add your sites hosts to your `/etc/hosts` file

Knowing how the CLI and Lima interact can help with troubleshooting and debugging. Issues with the VM itself are usually related to Lima, and the underlying `limactl` command can be run manually to try and isolate the issue.

Tip: run `limactl list` to see all Lima instances and their statuses.

### Ansible inventory
As detailed above, trellis-cli will automatically generate and manage a VM specific inventory file.
There is no need to manually edit the `hosts/development` file as it won't be used.

Commands like `trellis provision` will automatically detect and specify the Lima inventory file. If you need to run an Ansible command manually against the VM host, the `--inventory-file` flag needs to be set:
```bash
ansible-playbook dev.yml --inventory-file=.trellis/lima/inventory
```

#### SSH port
One reason why the inventory file needs to be generated each time a VM is created or started is due to SSH port forwarding.
Lima will find a free _local_ port and use it to forward to port 22 on the VM.
The inventory file references this forwarded port and Ansible will use that for its SSH connection.

It's recommended to use `trellis vm shell` to SSH to the VM and open a shell/terminal since you don't need to worry about hosts or ports.

To connect manually via SSH, run `limactl show-ssh -f config <instance name>` or `limactl show-ssh <instance name>` to view the SSH config in various formats.

### Vagrant migration
If you are migrating from Vagrant to Lima, or want to try both together at the same time, you may need to manually edit your `/etc/hosts` file.

Both Vagrant and trellis-cli will automatically manage entries to `/etc/hosts`, but only for their own VMs. So if you're trying out the different VM solutions on the _same_ project, there will be conflicting hosts. The Vagrant specific hosts block (within vagrant hosts-manager comments) should be deleted:

```plaintext
## vagrant-hostmanager-start-{id}
192.168.50.5 example.test www.example.test
## vagrant-hostmanager-end-{id}
```

There is no need to edit your `hosts/development` file unless you were manually using it in a non-standard setup. As mentioned in the [Ansible inventory](#ansible-inventory) section above, trellis-cli generates a separate inventory file.

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
environment. Or you might only want to use Trellis for deploying to managed servers. Trellis is quite flexible and supports these uses cases as well.
