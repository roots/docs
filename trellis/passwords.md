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
publish_to_discourse:
  - "0"
---
There a few places you'll want to set/change passwords:

* `group_vars/<environment>/main.yml` - `mysql_root_password`
* `group_vars/<environment>/wordpress_sites.yml` - `wordpress_sites.admin_password`
* `group_vars/<environment>/wordpress_sites.yml` - `wordpress_sites.env.db_password`

For staging/production environments, it's best to randomly generate longer passwords using something like [random.org](http://www.random.org/passwords/).

You may be concerned about setting plaintext passwords in a Git repository, and you should be. Any type of server configs such as this playbook should always be in a **private** Git repository.

Even then it's still best to try avoid it if possible, so you have few options:

* Use [Ansible Vault](http://docs.ansible.com/playbooks_vault.html)
* Use [Git Encrypt](https://github.com/shadowhand/git-encrypt)

Note: if you're mostly using this for development environments only, you probably don't need to worry about any of this as everything is just run locally.