---
description: Lorem ipsum...
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
│   ├── helpers.php       # → Helper functions
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

## The Root Directory

### The App Directory

The `app` directory contains the core code and functionality of your theme. Almost everything other than your views and assets will take place in this directory.

### The Public Directory

The `public` directory contains the compiled assets for your theme. This directory will never be manually modified.

### The Node Modules Directory

The `node_modules` directory contains your [Node](https://nodejs.org/) dependencies used to build your assets during development or for production. This folder is automatically generated and should not be modified.

::: danger Do Not Upload
Not under any circumstance should there ever be a need to upload this folder or any of its contents to a live production server. It's a security risk, and a waste of time.
:::

### The Resources Directory

The `resources` directory contains your Blade views as well as the un-compiled assets of your theme such as CSS, JavaScript, images, and fonts.

### The Vendor Directory

The `vendor` directory contains your [Composer](https://getcomposer.org/) dependencies and autoloader. This directory is automatically generated and should not be modified.

## The App Directory

The majority of your theme functionality lives in the `app` directory. By default, this directory is namespaced under `App` and is automaticaally loaded by Composer using the [PSR-4 autoloading standard](https://www.php-fig.org/psr/psr-4/).

The `app` directory contains multiple additional directories such as `View` and `Providers` as well as configuration (`setup.php`) and filters (`filters.php`).

### The View Directory

The `View` folder contains functionality pertaining to your Blade templates including Composers and Components.

### The Providers Directory

The `Providers` directory contain all of the [service providers](https://laravel.com/docs/8.x/providers) for your theme. If you are familiar with Laravel, this allows you to bind services to the Acorn container to take advantage of the Laravel ecosystem within your theme.

This functionality can also be extracted into packages.
