---
description: Lorem ipsum...
---

# Theme Structure

[[toc]]

## Introduction

The default Sage structure is intended to provide a sane starting point for both small and large WordPress sites alike.

Where a file or class is located is ultimately decided by you. As long as Composer can autoload the class or you have modified the necessary paths in your [configuration](configuration.md), things should work as expected.

## The Root Directory

### The App Directory

The `app` directory contains the core code and functionality of your theme. Almost everything other than your views and assets will take place in this directory.

### The Config Directory

The `config` directory contains configuration pertaining directly to Sage and it's functionality with Acorn. Here you will not find much confugration related to WordPress but instead configuration for things such as modifying Blade view paths, registering directives, changing the asset path, and configuration for packages built for Sage.

### The Dist Directory

The `dist` directory contains the compiled assets for your theme. This directory will never be manually modified.

### The Node Modules Directory

The `node_modules` directory contains your [Node](#) dependencies used to build your assets during development or for production. This folder is automatically generated and should not be modified.

::: caution Do Not Upload
Not under any circumstance should there ever be a need to upload this folder or any of it's contents to a live production server. Not only is it a huge waste of time, it is a security risk.
:::

### The Resources Directory

The `resources` directory contains your Blade views as well as the un-compiled assets of your theme such as CSS, JavaScript, images, and fonts.

### The Storage Directory

The `storage` directory contains your compiled Blade templates as well as Sage's cache and logging files. This directory will typically never be modified, but instead contain useful theme log files located in the `logs` directory.

### The Vendor Directory

The `vendor` directory contains your [Composer](#) dependencies and autoloader. This directory is automatically generated and should not be modified.

```sh
themes/your-theme-name/   # → Root of your Sage based theme
├── app/                  # → Theme PHP
│   ├── View/             # → View models
│   ├── Providers/        # → Service providers
│   ├── admin.php         # → Theme customizer setup
│   ├── filters.php       # → Theme filters
│   ├── helpers.php       # → Helper functions
│   └── setup.php         # → Theme setup
├── config/               # → Config files
│   ├── app.php           # → Application configuration
│   ├── assets.php        # → Asset configuration
│   ├── filesystems.php   # → Filesystems configuration
│   ├── logging.php       # → Logging configuration
│   └── view.php          # → View configuration
├── composer.json         # → Autoloading for `app/` files
├── composer.lock         # → Composer lock file (never edit)
├── dist/                 # → Built theme assets (never edit)
├── functions.php         # → Theme bootloader
├── index.php             # → Theme template wrapper
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── assets/           # → Front-end assets
│   │   ├── fonts/        # → Theme fonts
│   │   ├── images/       # → Theme images
│   │   ├── scripts/      # → Theme javascript
│   │   └── styles/       # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── form/         # → Form templates
│       ├── layouts/      # → Base templates
│       └── partials/     # → Partial templates
├── screenshot.png        # → Theme screenshot for WP admin
├── storage/              # → Storage location for cache (never edit)
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── webpack.mix.js        # → Laravel Mix configuration
```
