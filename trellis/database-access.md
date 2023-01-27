---
description: Accessing your WordPress databases in Trellis with Sequel Pro or TablePlus just requires some initial configuration. phpMyAdmin not necessary.
authors:
  - ben
  - huubl
  - Log1x
  - MWDelaney
  - mZoo
  - swalkinshaw
  - TangRufus
---

# Database Access

Accessing your databases with client software like [Sequel Pro](https://www.sequelpro.com/), [Sequel Ace](https://sequel-ace.com/) and [TablePlus](http://tableplus.com/) is straight forward with [`trellis-cli`](https://github.com/roots/trellis-cli):


Run the following from any directory within your project:

For Sequel Pro (or Sequel Ace):
```bash
$ trellis db open --app=sequel-pro production example.com
```

For TablePlus
```bash
$ trellis db open --app=tableplus production example.com
```

::: tip SSH Password?
Because Trellis provisions remote environments to use [SSH keys](/trellis/docs/ssh-keys/) rather than passwords, the password field or prompt is left blank.
:::


## Vagrant and SSH configs

Regardless of if you're using trellis-cli or doing it manually, Vagrant boxes
require some additional configuration since they require an SSH private key.

Since the path of this private key depends on the Vagrant provider (eg:
VirtualBox or Parallels) you're using, we recommend making sure that your
database GUI app of choice is properly configured to respect your local SSH
config (usually in `~/.ssh/config`).

Trellis' Vagrant integration _automatically_ adds the necessary configuration to
your SSH config for each Vagrant machine.

The main thing to verify is that you can SSH into your Vagrant machine with `ssh vagrant@<hostname>`.
If that works, then your SSH config is setup properly and will make any database
access over SSH easier.

### Sequel Ace

In Sequel Ace, you need to set your SSH config and SSH known hosts file, then
additionally give the app access to those files **and** your Vagrant private
key.

See this [Discourse
post](https://discourse.roots.io/t/advice-for-trellis-db-open-with-vagrant-dev-box/22002/3?u=swalkinshaw)
for full details on this process.

### TablePlus
  
For TablePlus and VirtualBox, you need to manually select the private key from `.vagrant/machines/default/virtualbox/private_key`.
