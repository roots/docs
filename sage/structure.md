---
date_modified: 2023-01-27 13:17
date_published: 2021-10-21 13:21
description: The default Sage structure is intended to provide a sane starting point for both small and large WordPress sites alike.
title: Theme Structure
authors:
  - alwaysblank
  - ben
  - jure
  - Log1x
---

# Theme Structure

[[toc]]

## Introduction

The default Sage structure is intended to provide a sane starting point for both small and large WordPress sites alike.

Where a file or class is located is ultimately decided by you. As long as Composer can autoload the class or you have modified the necessary paths in your [configuration](configuration.md), things should work as expected.

```php
themes/your-theme-name/   # → Root of your Sage based theme
├── app/                  # → Theme PHP
│   ├── Providers/        # → Service providers
│   ├── View/             # → View models
│   ├── filters.php       # → Theme filters
│   └── setup.php         # → Theme setup
├── composer.json         # → Autoloading for `app/` files
├── public/               # → Built theme assets (never edit)
├── functions.php         # → Theme bootloader
├── index.php             # → Theme template wrapper
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── fonts/            # → Theme fonts
│   ├── images/           # → Theme images
│   ├── scripts/          # → Theme javascript
│   ├── styles/           # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── forms/        # → Form templates
│       ├── layouts/      # → Base templates
│       └── partials/     # → Partial templates
├── screenshot.png        # → Theme screenshot for WP admin
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── bud.config.js         # → Bud configuration
```

## The root directory

### The `app/` directory

The majority of your theme functionality lives in the `app` directory. By default, this directory is namespaced under `App` and is automatically loaded by Composer using the [PSR-4 autoloading standard](https://www.php-fig.org/psr/psr-4/). See our blog post on [Namespacing and Autoloading](/namespacing-and-autoloading/) if you aren't familiar with these methods.

This directory is covered more in [Functionality](/sage/docs/functionality/).

### The `public/` directory

The `public` directory contains the compiled assets for your theme. This directory will never be manually modified.

### The `node_modules/` directory

The `node_modules` directory contains your [Node](https://nodejs.org/) dependencies used to build your assets during development or for production. This folder is automatically generated and should not be modified.

::: danger Don&rsquo;t upload node_modules
Under no circumstances should there ever be a need to upload this folder or any of its contents to a live production server. It is a security risk.
:::

### The `resources/` directory

The `resources` directory contains your Blade views as well as the un-compiled assets of your theme such as CSS, JavaScript, images, and fonts.

### The `vendor/` directory

The `vendor` directory contains your [Composer](https://getcomposer.org/) dependencies and autoloader. This directory is automatically generated and should not be modified.

