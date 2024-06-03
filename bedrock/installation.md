---
date_modified: 2024-05-22 11:15
date_published: 2015-10-15 12:29
description: Installing Bedrock requires PHP 8.0+ and Composer. After setting environment variables and the document root you can access your WordPress installation.
title: Installing Bedrock
authors:
  - ben
  - Log1x
  - swalkinshaw
  - MWDelaney
---

# Installation

## System requirements

- PHP >= 8.0
- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)

## Installing Bedrock with Composer

Create a new Bedrock project:

```shell
composer create-project roots/bedrock
```

## Create your `.env` file

- Create a `.env` file with the following environment variables (see `.env.example` as an example):
  - Database variables
    - `DB_NAME` - Database name
    - `DB_USER` - Database user
    - `DB_PASSWORD` - Database password
    - `DB_HOST` - Database host
    - Optionally, you can define `DATABASE_URL` for using a DSN instead of using the variables above (e.g. `mysql://user:password@127.0.0.1:3306/db_name`)
  - `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  - `WP_HOME` - Full URL to WordPress home (https://example.com)
  - `WP_SITEURL` - Full URL to WordPress including subdirectory (https://example.com/wp)
  - `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`
    - Generate with [wp-cli-dotenv-command](https://github.com/aaemnnosttv/wp-cli-dotenv-command)
    - Generate with [our WordPress salts generator](https://roots.io/salts.html)
- Add theme(s) in `web/app/themes/` as you would for a normal WordPress site
- Set the document root on your webserver to Bedrock's `web` folder: `/path/to/site/web/`
- Access WordPress admin at `https://example.com/wp/wp-admin/`

### Multisite

Bedrock is multisite network compatible, but needs the [roots/multisite-url-fixer](https://github.com/roots/multisite-url-fixer) mu-plugin on subdomain installs to make sure admin URLs function properly. This plugin is not _needed_ on subdirectory installs but will work well with them. From your Bedrock directory:

```shell
composer require roots/multisite-url-fixer
```

## What is Bedrock?

Bedrock is a [WordPress boilerplate](https://roots.io/bedrock/).

### Why use Bedrock?

- Better folder structure
- Dependency management with [Composer](https://getcomposer.org)
- Easy WordPress configuration with environment specific files
- Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
- Autoloader for mu-plugins (use regular plugins as mu-plugins)
- Enhanced security (separated web root and secure passwords with [wp-password-bcrypt](https://github.com/roots/wp-password-bcrypt))
