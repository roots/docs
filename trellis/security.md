---
ID: 6151
post_title: Security
author: Ben Word
post_date: 2015-09-03 17:49:35
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/security/
published: true
---
## Locking down root

The `sshd` role heightens your server's security by providing better SSH defaults. SSH password authentication will be disabled. We encourage you to disable SSH `root` login as well. You may adjust these two particular options in `group_vars/all/security.yml`. See the [`sshd` role `README.md`](https://github.com/roots/trellis/tree/master/roles/sshd) for more configuration options.

## Admin user

The first provision via the `server.yml` playbook will create the `admin_user` and set up related [SSH Keys](https://roots.io/trellis/docs/ssh-keys/). If you disable `root` login, subsequent connections will be made as the `admin_user`.

## Admin user sudoer password

If `root` login is disabled and the `server.yml` playbook connects as the `admin_user`, it will invoke `sudo` using the password in `vault_users` (`group_vars/<environment>/vault.yml`). If you run the playbook with `--ask-become-pass`, Trellis will use the password you enter via the CLI. You are strongly encouraged to protect the sensitive `vault_users` information by enabling Ansible [Vault](https://roots.io/trellis/docs/vault/).

The `vault_sudoer_passwords` dictionary is no longer used, having been replaced by `vault_users` in [roots/trellis#614](https://github.com/roots/trellis/pull/614). Convert to the new variable format by inserting the raw (unhashed) password for each user into `vault_users`. The new format frees you from having to manually hash your passwords and from having to use the `--ask-become-pass` CLI option.
