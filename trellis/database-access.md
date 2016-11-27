---
ID: 17469
post_title: Database Access
author: Ben Word
post_date: 2016-11-27 12:34:29
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/database-access/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
Accessing your databases with a tools such as [Sequel Pro](https://www.sequelpro.com/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) just requires some initial configuration.

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