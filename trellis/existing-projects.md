---
date_modified: 2023-01-27 13:17
date_published: 2018-08-23 09:56
title: Existing Projects
description: How to work on an existing Trellis project.
authors:
  - ben
  - Log1x
  - MWDelaney
  - TangRufus
---

# Existing Projects

The majority of the Trellis documentation focuses on setting up new projects. If you are collaborating on, or taking over an existing project, the process is a little different.

::: tip Note
This documentation presumes your project follows the [Roots Example Project](https://github.com/roots/roots-example-project.com) recommendations.
:::

## Gather Information

To work on an existing Trellis project you need the following:

- Git repository access
- The Ansible Vault password
- Permissions for provisioning and deployment
- Your site's development URL
- A database dump and a copy of the project's `/uploads` folder

### Git Repository Access

Roots recommends that Trellis projects be kept in private Git repositories. Make sure you have permission and access to the project's Git repository and any dependent plugin or theme repositories.

### Ansible Vault password

Trellis stores passwords and other sensitive data in [encrypted vault files](vault.md). Retrieve the project's vault password from someone who already works on the project.

### Permission for provisioning and deployment

If you need to [provision this project's remote servers](remote-server-setup.md) or [deploy the project](deployments.md) to staging or production, add your SSH keys to the necessary remote servers either by accessing the server directly, or by having someone who already has access [add your SSH keys to the Trellis configuration](ssh-keys.md) and re-provision the server.

### Your site's development URL

Review the project's `trellis/group_vars/development/wordpress_sites.yml` and note its URL:

```yaml
wordpress_sites:
  example.com:
    site_hosts:
      - canonical: example.test # <-- this is the development URL
```

## Clone Your Project

```shell
$ git clone git@github.com:YourOrganization/example.com.git
```

## Ansible Vault

Determine whether your vault files are encrypted by looking at the `vault.yml` files in `trellis/group_vars/`

```yaml
$ANSIBLE_VAULT;1.1;AES256
343163646662643438323831343332626234333233386666333162383265663
3132306538383762336332376165383530633838643937320a6363343238643
363065366664316364646561613163653866623566303235666537343437643
6638363265383831390a6631663239373833636133623333666363643166383
6237663637353638653266616562616535623465636265316231613331 etc.
```

If any of the `vault.yml` files look like the example above, follow the [vault instructions](vault.md) to configure your Ansible Vault and vault password.

## Create Your Development VM

Run the following from any directory within your project:

```shell
$ trellis up
```

Confirm you can access the development site at the development URL noted earlier.

## Import the database

Retrieve an export of the current project’s database.

::: tip Note
For easy access during the import process, place the database export in your local project’s `site` directory.
:::

Run the following from any directory within your project:

```shell
$ trellis ssh development
```

Navigate to the web root:

```shell
$ cd /srv/www/example.com/current
```

Import the database with wp-cli:

```shell
$ wp db import example.com.sql
```

If the export is not from another development environment, search-and-replace the site's URL with wp-cli:

```shell
$ wp search-replace http://example.com http://example.test
```

## Import the Uploads

Retrieve a copy of the current project’s `uploads` directory and place it in your local project's `site/web/app` directory.
