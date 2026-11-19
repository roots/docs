---
date_modified: 2026-11-19 10:00
date_published: 2025-04-01 00:00
description: Configure PHP settings in Trellis by overriding default values. Adjust memory limits, max execution time, upload sizes, and other PHP directives per site.
title: Configuring PHP Settings in Trellis
authors:
  - dalepgrant
---

# Configuring PHP Settings in Trellis
Trellis will setup PHP and extensions suitable for a WordPress environment out of the box, but you may want to customise for your own setups. For example, you may want to change the version of PHP or add an extension.

::: tip Note
If you make a change to the PHP settings, you will need to [reprovision](https://roots.io/trellis/docs/local-development/#re-provisioning) your environments before seeing any changes. You can use `--tags=php` to only run the required role(s). Be sure to reprovision all the environments you need to.
:::

## Change the version of PHP
Trellis uses PHP 8.4 by default as of [#1702](https://github.com/roots/trellis/pull/1702). Older versions of Trellis default to PHP 8.3.

In [`group_vars/all/main.yml`](https://github.com/roots/trellis/blob/master/group_vars/all/main.yml), set the value of `php_version` to the version you're working with.

e.g. to use PHP 8.1: `php_version: "8.1"`

Trellis installs PHP from the [Sury repository](https://deb.sury.org/), and since [#1511](https://github.com/roots/trellis/pull/1511) the PHP role isn't tied to specific versions. Any `php_version` that Sury packages for your Ubuntu release will work, as long as:

* Every extension Trellis installs has a package for that version. This covers the defaults plus `memcached`, `redis` and `xdebug` if you use them. PECL extensions such as `imagick` and `xmlrpc` are often published a few weeks after a new PHP release.
* [WP-CLI](https://github.com/wp-cli/wp-cli/releases) supports it. WP-CLI 2.12.0, which Trellis installs, supports up to PHP 8.4.

If you try a newer version, you can help by reporting how it went on [Roots Discourse](https://discourse.roots.io/).

## Changing the default extensions
Trellis will look for a version-specific override file before falling back to the default PHP extensions. If you'd like to change the extensions installed on your environments, duplicate the [`roles/php/vars/version-specific-defaults.yml`](https://github.com/roots/trellis/blob/master/roles/php/vars/version-specific-defaults.yml) file and rename it to the version of PHP you are targetting.

### Example
To target PHP 8.4, duplicate and rename so that your folder looks like this:

```diff
 ├── ...other folders...
 └── roles/
     ├── ...other folders...
     └── php/
         ├── ...other folders...
         └── vars/
+            ├── 8.4.yml
             └── version-specific-defaults.yml
```

In your `8.4.yml` file you can then set the extensions you'd like to use. Include all extensions from the defaults file unless you have a good reason not to, remembering that [WP requires some extensions](https://make.wordpress.org/hosting/handbook/server-environment/#php-extensions) to work.

```yaml
php_extensions_default:
  php8.4-bcmath: "{{ apt_package_state }}"
  php8.4-example: "{{ apt_package_state }}"
  # etc.
```
