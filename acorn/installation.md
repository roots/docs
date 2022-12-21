---
description: Install Acorn by running `composer require roots/acorn` to start using Laravel components in WordPress.
---

# Installation

[[toc]]

## What is Acorn?

Acorn is a way to use [Laravel components inside of WordPress](https://roots.io/acorn/).

### Why use Acorn?

Acorn brings elements of the Laravel ecosystem to any WordPress plugin or theme.

To put it simply, Acorn provides a way to gracefully load a Laravel application container inside of WordPress while respecting the WordPress lifecycle and template hierarchy.

This means you get access to Laravel's artisan commands through the use of [`wp acorn`](wp-cli.md). You can utilize Blade for [on-the-fly rendering](blade.md) of your Blade views. You gain access to [third-party packages](available-packages.md#user-contributed) built specifically for Acorn. And we provide some first-party components as well, such as [view composers](/acorn/docs/blade#composers) and [assets management](assets-management.md).

## Installing Acorn with Composer

Install Acorn on your WordPress install managed by Composer, such as with [Bedrock](https://roots.io/bedrock/):

```sh
$ composer require roots/acorn
```

We also recommend adding Acorn's `postAutoloadDump` function to Composer's `post-autoload-dump` event in `composer.json`:

```json
"post-autoload-dump": [
  "Roots\\Acorn\\ComposerScripts::postAutoloadDump"
]
```

## Installing Acorn as a plugin

Although not officially supported, the following options _should_ work. Please file a [bug report](https://github.com/roots/docs/issues/new?assignees=&labels=&template=bug_report.md) for future consideration if you run into issues.

- **Install as mu-plugin.**
  Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract to your `mu-plugins` directory. Make sure you have a mechanism in place to autoload it, such as [`bedrock-autoloader`](https://github.com/roots/bedrock-autoloader).
- **Install as a normal plugin.** 
  Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract to your `plugins` directory. Make sure to activate the plugin, or it won't work.

## Server Requirements

Acorn's server requirements are minimal, and mostly come from WordPress and [Laravel 8's requirements](https://laravel.com/docs/8.x/deployment#server-requirements).

- PHP >=7.3 or >=8.0
- WordPress >= 5.4
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
