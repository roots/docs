---
date_modified: 2023-04-18 13:53
date_published: 2021-11-19 11:58
description: Install Acorn by running `composer require roots/acorn` in the root of your Composer-based WordPress project.
title: Installing Acorn
authors:
  - alwaysblank
  - ben
  - csorrentino
  - QWp6t
---

# Installation

## What is Acorn?

Acorn is a way to use [Laravel components inside of WordPress](https://roots.io/acorn/).

### Why use Acorn?

Acorn brings elements of the Laravel ecosystem to any WordPress plugin or theme.

To put it simply, Acorn provides a way to gracefully load a Laravel application container inside of WordPress while respecting the WordPress lifecycle and template hierarchy.

This means you get access to Laravel's artisan commands through the use of [`wp acorn`](wp-cli.md). You can utilize [Blade templates](blade.md). You gain access to [third-party packages](available-packages.md#user-contributed) built specifically for Acorn. And we provide some first-party components as well, such as [view composers](/acorn/docs/blade#composers) and [assets management](assets-management.md).

## Installing Acorn with Composer

We recommend that you install Acorn on your WordPress install managed by Composer, such as with [Bedrock](https://roots.io/bedrock/):

```shell
$ composer require roots/acorn
```

We also recommend adding Acorn's `postAutoloadDump` function to Composer's `post-autoload-dump` event in the `scripts` section of `composer.json`:

```json
"scripts": {
  //...
  "post-autoload-dump": [
    "Roots\\Acorn\\ComposerScripts::postAutoloadDump"
  ]
}
```

If you don't use Bedrock and you are using a Sage-based theme, you can install Acorn with Composer from your theme directory.

## Server requirements

Acorn's server requirements are minimal, and mostly come from WordPress and [Laravel 8's requirements](https://laravel.com/docs/9.x/deployment#server-requirements).

- PHP >=8.0
- WordPress >= 5.4
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
