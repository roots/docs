---
description: Accessing your WordPress databases in Trellis with Sequel Pro or MySQL Workbench just requires some initial configuration. phpMyAdmin not necessary.
---

# Database Access

Accessing your databases with tools such as [Sequel Pro](https://www.sequelpro.com/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) just requires some initial configuration.

## Development (Vagrant box)

- Connection type: SSH
- MySQL host: `127.0.0.1`
- Username: `example_com`
- Password: `example_dbpassword` (use the value of `db_password` from `group_vars/development/vault.yml`)
- SSH Host: `example.test`
- SSH User: `vagrant`
- SSH Key: Select the following file from your Trellis directory: `.vagrant/machines/default/virtualbox/private_key`

::: tip macOS Users
[vagrant-trellis-sequel](https://github.com/TypistTech/vagrant-trellis-sequel) allows for opening Trellis databases in Sequel Pro with a single command.
:::

## Remote servers

- Connection type: SSH
- MySQL host: `127.0.0.1`
- Username: `example_com`
- Password: `example_dbpassword` (use the value of `db_password` from `group_vars/<environment>/vault.yml`)
- SSH Host: `example.com`
- SSH User: `web`

NOTE: If you have provisioned your server to include local or remote ssh keys (see `group_vars/all/users.yml`), you can leave the SSH User password blank  in your DB Application, because SSH already knows about it. (In Sequel Pro the "key" icon toggles a browse field for SSH Key.) Additionally, [Trellis-cli](https://github.com/roots/trellis-cli) provides a one-liner to configure your connection via Sequel Pro or Table Plus.

