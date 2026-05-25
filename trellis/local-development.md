---
date_modified: 2026-04-21 10:00
date_published: 2015-10-15 12:24
description: Trellis uses Lima VM's for local development. Trellis uses Ansible to automatically provision virtual machines running complete WordPress environments.
title: Local WordPress Development with Trellis
authors:
  - ben
  - fullyint
  - IanEdington
  - Log1x
  - MWDelaney
  - swalkinshaw
  - TangRufus
---

# Local WordPress Development with Trellis

Trellis has an official integration with Lima for development environments using virtual machines.

Other options include:

* [Laravel Valet](#laravel-valet)
* [Nothing!](#nothing)

## Lima
Trellis integrates with Lima to automatically run the Ansible provisioning. Provisioning in development uses the `dev.yml` Ansible playbook to create a Lima virtual machine running your WordPress site.

Follow these steps to get a development server running:
1. Configure your site(s) based on the [WordPress Sites docs](wordpress-sites.md) and read the [development specific](wordpress-sites.md#development) ones.
2. Make sure you've edited both `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault.yml`.
3. Run `trellis vm start` from anywhere in your project.

Then let Lima and Ansible do their thing. After roughly 5 minutes you'll have a virtual machine running and a WordPress site automatically installed and configured.

To access the VM, run `trellis vm shell`. Sites can be found at `/srv/www/<site name>` on the VM.

Note that each WP site you configured is synced between your local machine (the host) and the Lima VM. Any changes made to your host will be synced instantly to the VM. There's no need to manually sync files or deploy to the VM.

Composer and WP-CLI commands need to be run on the virtual machine for any post-provision modifications. Front-end build tools should be run from your host machine and not the Lima VM.

### WordPress installation

Trellis installs WordPress on your first `trellis vm start` with `admin` as the default user. You can override this by defining `admin_user`, as noted in the [WordPress sites options](wordpress-sites.md#options).

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

### Usage

There's 5 commands for working with VMs:

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

Under the hood, those commands wrap equivalent `limactl` features. You can always run `limactl` directly to manage your VMs.

### Configuration:
For the common use case, the default configuration should be all that's needed which is why config options are limited to start with. We will offer more customization over time.

The CLI [config file](cli.md#configuration) (global or project level) supports a new `vm` option. The only useful config option right now is `ubuntu` for setting the Ubuntu version.

Here's an example of specifying 24.04:

```yml
vm:
  ubuntu: 24.04
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

There is no need to edit your `hosts/development` file unless you were manually using it in a non-standard setup. As mentioned in the [Ansible inventory](#ansible-inventory) section above, trellis-cli generates a separate inventory file.

## Other non-Lima options
While Trellis offers integrated Lima development environments, it is completely optional. There are other local development options as well. Most of these options mean you're using Trellis for your production servers but something else entirely in development which is why it's not recommended.

### Laravel Valet
[Valet](https://laravel.com/docs/10.x/valet) can be used in development if you're
already using it for Laravel projects or want a lighter-weight solution than a
full virtual machine.

However, be warned that doesn't guarantee [development and production parity](https://roots.io/twelve-factor-10-dev-prod-parity/).
Using Valet locally means you aren't using Trellis _at all_ in development.

trellis-cli does offer some basic Valet integration as well. Run `trellis valet`
for more information.

### Nothing
That's right... nothing! You might not care about a local development environment. Or you might only want to use Trellis for deploying to managed servers. Trellis is quite flexible and supports these uses cases as well.
