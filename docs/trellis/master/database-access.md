---
description: Accessing your WordPress databases in Trellis with Sequel Pro or TablePlus just requires some initial configuration. phpMyAdmin not necessary.
---

# Database Access

Accessing your databases with client software like [Sequel Pro](https://www.sequelpro.com/), [Sequel Ace](https://sequel-ace.com/) and [TablePlus](http://tableplus.com/) is straight forward with `trellis-cli`:

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

Run the following from any directory within your project:

For Sequel Pro (or Sequel Ace):
```bash
$ trellis db open --app=sequel-pro production example.com
```

For TablePlus
```bash
$ trellis db open --app=tableplus production example.com
```

</template>
<template v-slot:manual>

Configure your Sequel client as follows:
## Development (Vagrant box)

- Connection type: SSH
- MySQL host: `127.0.0.1`
- Username: `example_com`
- Password: `example_dbpassword` (use the value of `db_password` from `group_vars/development/vault.yml`)
- SSH Host: `example.test`
- SSH User: `vagrant`
- SSH Key: Select the following file from your Trellis directory: `.vagrant/machines/default/virtualbox/private_key`

## Remote servers

- Connection type: SSH
- MySQL host: `127.0.0.1`
- Username: `example_com`
- Password: `example_dbpassword` (use the value of `db_password` from `group_vars/<environment>/vault.yml`)
- SSH Host: `example.com`
- SSH User: `web`

::: tip SSH Password?
Because Trellis provisions remote environments to use [SSH keys](https://roots.io/docs/trellis/master/ssh-keys/) rather than passwords, the password field or prompt is left blank.
:::

</template>
</CodeSwitcher>
