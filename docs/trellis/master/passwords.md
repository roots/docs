---
description: Passwords that can be configured in Trellis include the MySQL root password, sudoer password, admin password, and WordPress site database passwords.
---

# Passwords

There are a few places you'll want to set/change passwords:

`group_vars/<environment>/vault.yml`
- `vault_mysql_root_password`
- `vault_users.*.password`
- `vault_wordpress_sites.*.env.db_password`

`group_vars/development/vault.yml`
- `vault_wordpress_sites.admin_password`

`group_vars/all/vault.yml`
- `vault_mail_password`

For staging/production environments, it's best to randomly generate longer passwords using something like [random.org](http://www.random.org/passwords/).

You may be concerned about setting plaintext passwords in a Git repository, and you should be. We strongly recommend you encrypt these passwords before committing them to your repo. Trellis is structured to make it easy to enable [Ansible Vault](vault.md to encrypt select files. Alternatively, you could try an option such as [git-crypt](https://github.com/AGWA/git-crypt).

::: warning Note
Any type of server configs such as this playbook should always be in a **private** Git repository.
:::
