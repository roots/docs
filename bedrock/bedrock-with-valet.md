---
date_modified: 2023-03-08 8:55
date_published: 2023-02-19 12:16
description: How to configure Valet, a local development tool, for a Bedrock-based WordPress site.
title: Bedrock with Valet
authors:
  - ben
---

# Bedrock with Valet

[Laravel Valet](https://laravel.com/docs/10.x/valet) is a local development environment. In this guide you will learn how to setup a Bedrock-based WordPress site with Valet.

Valet supports Bedrock out of the box, along with traditional WordPress installations, Laravel apps, Drupal sites, and more. Since Valet is very lightweight, it is a great local development setup for folks that are working on several WordPress sites at any given time.

See the [Valet installation docs](https://laravel.com/docs/10.x/valet#installation) for information on how to install Valet. You will also want to install the Valet WP-CLI command:

```shell
$ wp package install aaemnnosttv/wp-cli-valet-command:@stable
```

## Setting up a Bedrock site

To create a new Bedrock site for Valet, navigate to Valet sites directory and use the `wp valet` command:

```shell
$ cd ~/Sites/valet
$ wp valet new bedrock --project=bedrock
```

You should now be able to access your new site at `https://bedrock.test`.

If you hit a 404, make sure that you have ran `valet park` from your Valet sites directory first.

### Bedrock multisite

#### Subdomain installs

* `wp valet new bedrock-multisite --project=bedrock`
* Add to `config/application.php` in Bedrock:

```php
Config::define('WP_ALLOW_MULTISITE', true);
```

* Visit `https://bedrock-multisite.test/wp/wp-admin/network.php` to install the network and select subdomain install
* Add to `.env`: `DOMAIN_CURRENT_SITE=bedrock-multisite.test`
* Update `config/application.php` again with full multisite constants:

```php
/**
 * Multisite
 */
Config::define('WP_ALLOW_MULTISITE', true);
Config::define('MULTISITE', true);
Config::define('SUBDOMAIN_INSTALL', true);
Config::define('DOMAIN_CURRENT_SITE', env('DOMAIN_CURRENT_SITE'));
Config::define('PATH_CURRENT_SITE', env('PATH_CURRENT_SITE') ?: '/');
Config::define('SITE_ID_CURRENT_SITE', env('SITE_ID_CURRENT_SITE') ?: 1);
Config::define('BLOG_ID_CURRENT_SITE', env('BLOG_ID_CURRENT_SITE') ?: 1);
```

* Add the Bedrock multisite URL fixer plugin: `composer require roots/multisite-url-fixer`
* Link any subdomains to current site with Valet:

```shell
$ valet link test.bedrock-multisite
$ valet link site2.bedrock-multisite
```

#### Subfolder / subdirectory installs

* Copy the [Bedrock multisite subdirectory driver](https://gist.github.com/QWp6t/1e055482d722e2b02dfff1bb21698194) into `~/.valet/Drivers/`
* `wp valet new bedrock-multisite --project=bedrock`
* Add to `config/application.php` in Bedrock:

```php
Config::define('WP_ALLOW_MULTISITE', true);
```

* Visit `https://bedrock-multisite.test/wp/wp-admin/network.php` to install the network and select subfolder install
* Add to `.env`: `DOMAIN_CURRENT_SITE=bedrock-multisite.test`
* Update `config/application.php` again with full multisite constants:

```php
/**
 * Multisite
 */
Config::define('WP_ALLOW_MULTISITE', true);
Config::define('MULTISITE', true);
Config::define('SUBDOMAIN_INSTALL', true);
Config::define('DOMAIN_CURRENT_SITE', env('DOMAIN_CURRENT_SITE'));
Config::define('PATH_CURRENT_SITE', env('PATH_CURRENT_SITE') ?: '/');
Config::define('SITE_ID_CURRENT_SITE', env('SITE_ID_CURRENT_SITE') ?: 1);
Config::define('BLOG_ID_CURRENT_SITE', env('BLOG_ID_CURRENT_SITE') ?: 1);
```

* Add the Bedrock multisite URL fixer plugin: `composer require roots/multisite-url-fixer`

* * *

Thank you to [Evan Mattson](https://discourse.roots.io/u/aaemnnosttv) for contributing Bedrock's driver to Valet, and for creating the [Valet WP-CLI command](https://github.com/aaemnnosttv/wp-cli-valet-command).

Thank you to [Craig](https://discourse.roots.io/u/QWp6t) for the multisite subdirectory driver.
