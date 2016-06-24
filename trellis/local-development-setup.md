---
ID: 7763
post_title: Local Development Setup
author: Ben Word
post_date: 2015-10-15 12:24:41
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/local-development-setup/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}'
---
Development is handled by [Vagrant](https://www.vagrantup.com/) in Trellis. Our `Vagrantfile` automatically uses the Ansible provisioner to run the `dev.yml` playbook and you'll get a virtual machine running your WordPress site.

1. Configure your site(s) based on the [WordPress Sites docs](https://roots.io/trellis/docs/wordpress-sites/) and read the [development specific](https://roots.io/trellis/docs/wordpress-sites/#development) ones.
2. Make sure you've edited both `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault.yml`.
3. Run `vagrant up`.

Then let Vagrant and Ansible do their thing. After roughly 5-10 minutes you'll have a server running and a WordPress site automatically installed and configured.

To access the VM, run `vagrant ssh`. Sites can be found at `/srv/www/<site name>`. See the [Vagrant docs](https://www.vagrantup.com/docs/cli/) for more commands.

Note that each WP site you configured is synced between your local machine (the host) and the Vagrant VM. Any changes made on your host will be synced to the VM.

Windows users have a slightly different workflow. See the [docs](https://roots.io/trellis/docs/windows/).