---
ID: 6152
post_title: Passwords
author: Ben Word
post_date: 2015-09-03 17:50:15
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/passwords/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}'
---
There are a few places you'll want to set/change passwords:

* `group_vars/<environment>/vault.yml` - `vault_mysql_root_password`
* `group_vars/<environment>/vault.yml` - `vault_sudoer_passwords`
* `group_vars/development/vault.yml` - `vault_wordpress_sites.admin_password`
* `group_vars/<environment>/vault.yml` - `vault_wordpress_sites.env.db_password`

For staging/production environments, it's best to randomly generate longer passwords using something like [random.org](http://www.random.org/passwords/).

You may be concerned about setting plaintext passwords in a Git repository, and you should be. We strongly recommend you encrypt these passwords before committing them to your repo. Trellis is structured to make it easy to enable [Ansible Vault](https://roots.io/trellis/docs/vault/) to encrypt select files. Alternatively, you could try an option such as [Git Encrypt](https://github.com/shadowhand/git-encrypt).

Note: Any type of server configs such as this playbook should always be in a **private** Git repository.