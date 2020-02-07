# Local Development

Development is handled by [Vagrant](https://www.vagrantup.com/) in Trellis. Our `Vagrantfile` automatically uses the Ansible provisioner to run the `dev.yml` playbook and you'll get a virtual machine running your WordPress site.

1. Configure your site(s) based on the [WordPress Sites docs](https://roots.io/trellis/docs/wordpress-sites/) and read the [development specific](https://roots.io/trellis/docs/wordpress-sites/#development) ones.
2. Make sure you've edited both `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault.yml`.
3. Optionally configure the IP address at the top of the `vagrant.default.yml` to allow for multiple boxes to be run concurrently (default is `192.168.50.5`).
4. Run `vagrant up` (from your trellis directory, usually the `trellis/` subdirectory of your project).

::: warning Note
:warning: `vagrant up` will fail [if you are using encrypted folders/hard drives](https://www.vagrantup.com/docs/synced-folders/nfs.html#other-notes)
:::

Then let Vagrant and Ansible do their thing. After roughly 5-10 minutes you'll have a server running and a WordPress site automatically installed and configured.

To access the VM, run `vagrant ssh`. Sites can be found at `/srv/www/<site name>`. See the [Vagrant docs](https://www.vagrantup.com/docs/cli/) for more commands.

Note that each WP site you configured is synced between your local machine (the host) and the Vagrant VM. Any changes made to your host will be synced to the VM. 

Composer and WP-CLI commands need to be run on the virtual machine for any post-provision modifications. Front-end build tools should be run from your host machine and not the Vagrant VM.

Mounting an encrypted folder is not possible with Trellis due to an issue with NFS. 

Windows users have a slightly different workflow. See the [Windows getting started docs](https://roots.io/getting-started/docs/windows-development-environment-trellis/).

## WordPress installation

Trellis installs WordPress on your first `vagrant up` with `admin` as the default user. You can override this by defining `admin_user`, as noted in the [WordPress sites options](https://roots.io/trellis/docs/wordpress-sites/#options).

## Re-provisioning

Re-provisioning is always assumed to be a safe operation. When you make changes to your Trellis configuration, you should provision the VM again to apply the changes:

```bash
vagrant provision
```

You can also provision with specific tags to only run the relevant roles:

```bash
SKIP_GALAXY=true ANSIBLE_TAGS=wordpress vagrant provision
```

Notes on the commands: 

- `SKIP_GALAXY` saves some time because you already have those roles installed
- `ANSIBLE_TAGS` runs only the relevant roles
- `--provision` is so that it runs the `dev.yml` playbook and its roles tagged `wordpress`

If you added a *new- WordPress site (or manually added new synced directories to Vagrant), you'll need to reload the VM as well:

```bash
vagrant reload --provision
```
