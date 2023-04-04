---
date_modified: 2023-04-04 11:30
date_published: 2018-05-15 12:00
description: How to disable WordPress plugins on certain environments, such as local development, by using Bedrock Plugin Disabler.
title: Disable Plugins Based on Environment
authors:
  - ben
  - luke
  - owi
---

# Disable Plugins Based on Environment

Bedrock supports defining an environment with the `WP_ENV` environment variable. A typical setup for a project could contain several different environments:

* `development` for local development
* `staging` for a staging environment
* `production` for the live/production environment

In some cases, you may want to enforce certain plugins to be deactivated on one or more of your environments.

The [Bedrock Plugin Disabler](https://github.com/lukasbesch/bedrock-plugin-disabler) mu-plugin package by [@luke](https://discourse.roots.io/u/luke) can be used to configure a list of disabled plugins in your Bedrock environment configs located in `config/environments/`.

Install the mu-plugin with Composer:

```shell
$ composer require lukasbesch/bedrock-plugin-disabler
```

This package requires defining a `DISABLED_PLUGINS` constant with an array of plugin filenames to be disabled.

## Disabling plugins on local development

The most common use-case is disabling caching plugins on local development. We'll cover disabling WP Rocket and WP Super Cache in the following example.

Open `config/environments/development.php` and add the `DISABLED_PLUGINS` constant:

```php
Config::define('DISABLED_PLUGINS', [
    'wp-rocket/wp-rocket.php',
    'wp-super-cache/wp-cache.php',
]);
```
