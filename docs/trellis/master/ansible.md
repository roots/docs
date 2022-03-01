---
description: Learn more about Trellis by understanding key Ansible concepts
---

# How Trellis uses Ansible
Since Trellis is powered by Ansible, the best way to understand Trellis is to understand Ansible itself.
Even knowing a just key Ansible concepts will help you learn Trellis and how to
customize it to fit your needs.

Ansible's own [documentation](https://docs.ansible.com/ansible/latest/user_guide/index.html) is very comprehensive and should be considered as an extension of Trellis' documentation.

However, since Ansible itself is unopinionated, this will explore some key
concepts and how they apply to Trellis.

## Playbooks
At the highest level, Trellis provides a few playbooks which execute _tasks_
organized into _roles_.

Trellis' playbooks are found in the root of Trellis itself:
* [`dev.yml`](https://github.com/roots/trellis/blob/master/dev.yml) - provisions a development server. This playbook assumes that your local Trellis project files have been synced to a virtual machine and automatically installs WordPress.
* [`server.yml`](https://github.com/roots/trellis/blob/master/dev.yml) -
provisions a remote (non-dev) server. This playbook assumes you will be
deploying sites separately and does not attempt to install WordPress.
* [`deploy.yml`](https://github.com/roots/trellis/blob/master/deploy.yml) - deploys a single site to an environment
* [`rollback.yml`](https://github.com/roots/trellis/blob/master/deploy.yml) - rolls back a previously deployed release
* [`xdebug-tunnel.yml`](https://github.com/roots/trellis/blob/master/xdebug-tunnel.yml) - opens or closes the PHP Xdebug tunnel

## Roles
Each playbook listed above contains a list of roles to run. A role's main
purpose is to group a collection of tasks to run within the `tasks` directory.

All of Trellis' roles are found under the top-level [`roles`](https://github.com/roots/trellis/tree/master/roles) directory. Additionally, there are some 3rd party community roles used from Ansible Galaxy which are specified in the [`galaxy.yml`](https://github.com/roots/trellis/blob/master/galaxy.yml) file.

Roles in Trellis usually contain one of more of these subfolders:

* `defaults` - variables defined with low precedence
* `tasks` - tasks to be executed - the main functional part of roles
* `templates` - templates in Jinja format which are used in tasks

## Inventory
In Ansible,
[inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#intro-inventory) is a list of defined hosts in your infrastructure.

For most Trellis projects, this list of hosts is usually one development
virtual machine, one staging server (optional), and one production server.

If you look at the default inventory files in [`hosts`](https://github.com/roots/trellis/tree/master/hosts) directory, you'll see three files named after the standard environments: `development`, `staging`, `production`.

Here's what an inventory file in Trellis looks like:
```ini
[production]
your_server_hostname

[web]
your_server_hostname
```

Each host is under two groups: `production` and `web`. These groups can be used
for any semantic grouping you want, but in Trellis you at least need those two
built-in ones.

## Group variables
The "group" naming isn't the most clear, but as shown above, these refer to Ansible's concept of "inventory groups".
And since Trellis' inventory hosts are named for environments, "group vars" are
really just _environment specific variables_. Though they can also be used for any
semantic grouping of inventory hosts for more advanced use cases.

Note: the `all` group (in `group_vars/all`) is special and applies to all groups.

## Variables
All variables in Ansible can be considered _global_. Even if a variable is
defined within a role (eg: `roles/nginx/defaults/main.yml`), it can be
referenced or re-defined in a `group_vars` file. Once a role is included in a
playbook, their variables (in `defaults` or `vars`) are available globally.

### Example
As an example, let's say you wanted to change PHP's max execution time in development to be
higher than in production.

[`php_max_execution_time`](https://github.com/roots/trellis/blob/40b949a910373398e3fda06105287e0edf24051a/roles/php/defaults/main.yml#L10) is found in [`roles/php/defaults/main.yml`](https://github.com/roots/trellis/blob/master/roles/php/defaults/main.yml).

We can apply two things we learned above:
1. variables are global
2. group vars can be used to define environment specific values

Taking advantage of Ansible's [variable
precendence](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#understanding-variable-precedence), we'll just override the variable by re-defining it in `group_vars/development/php.yml`:

```yaml
php_max_execution_time: 500
```
