---
---
Accessing your databases with tools such as [Sequel Pro](https://www.sequelpro.com/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) just requires some initial configuration.

## Development (Vagrant box)

* Connection type: SSH
* MySQL host: `127.0.0.1`
* Username: `root`
* Password: `devpw` (use the value of `vault_mysql_root_password` from `group_vars/development/vault.yml`)
* SSH Host: `example.dev`
* SSH User: `vagrant`
* SSH Key: Select the following file from your Trellis directory: `.vagrant/machines/default/virtualbox/private_key`

## Remote servers

* Connection type: SSH
* MySQL host: `127.0.0.1`
* Username: `root`
* Password: `productionpw` (use the value of `vault_mysql_root_password` from `group_vars/<environment>/vault.yml`)
* SSH Host: `example.com`
* SSH User: `web`