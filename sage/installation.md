---
date_modified: 2024-05-22 11:15
date_published: 2015-08-29 18:09
description: Install Sage 10, a WordPress starter theme, by running `composer create-project roots/sage`.
title: Installing Sage
authors:
  - alwaysblank
  - ben
  - Jacek
  - Lachlan_Arthur
  - Log1x
  - QWp6t
  - TangRufus
  - MWDelaney
---

# Installing Sage

## What is Sage?

Sage is a [WordPress starter theme](https://roots.io/sage/).

## Why use Sage?

- Clean, efficient theme templating utilizing [Laravel Blade](https://laravel.com/docs/master/blade).
- Lightning fast frontend development workflow powered by [Bud](https://bud.js.org/).
- Out of the box support for [Tailwind CSS](https://tailwindcss.com/).
- Harness the power of [Laravel](https://laravel.com) and its available packages thanks to [Acorn](https://github.com/roots/acorn).

## System Requirements

- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/download/)

::: warning Windows users
WSL is required in order to use Sage. Build commands must be run from a [WSL environment](https://docs.microsoft.com/en-us/windows/wsl/).
:::

<!-- For help setting up your development environment, see the [Local Development Environment](/sage/docs/local-development-environment/) guide. -->

## Create a new theme with Sage

### 1. Create a new Sage-based WordPress theme with Composer

Create a new WordPress theme using Sage with Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```shell
# From your WordPress themes directory, run:
composer create-project roots/sage your-theme-name
```

### 2. Edit `bud.config.js` to match your environment

Modify the `bud.config.js` file in your new Sage-based theme's directory to match the theme's directory name and local development URL, if applicable.

```javascript
// bud.config.js

/**
 * Around line 26, update the following path 
 * to match your theme's directory:
*/

app.setPublicPath('/app/themes/sage/public/');

/**
 * Around line 37, pdate the following URL 
 * to match your local development URL:
*/
.setProxyUrl('http://example.test')
```

### 3. Build the theme assets

From your new Sage-based theme's directory, run:

```shell
yarn && yarn build
```

::: warning You must build theme assets in order to access your site. Failing to build the assets will result in the error:

```plaintext
The manifest [/path/to/sage/public/manifest.json] cannot be found.
```

:::

That's it! You're ready to activate your theme in WordPress and start developing!

## What Next?

From here you might want to [explore the structure of your new Sage-based theme](/sage/docs/theme-structure/), or [learn how to use Blade templates](/sage/docs/blade-templates/), or how to [compile assets](/sage/docs/compiling-assets/). These documents are meant to be referenced as you work with Sage, so feel free to jump around as needed.
