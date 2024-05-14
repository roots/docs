---
date_modified: 2024-04-14 12:23
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

## What is Sage?

Sage is a [WordPress starter theme](https://roots.io/sage/).

## Why use Sage?

- Clean, efficient theme templating utilizing [Laravel Blade](https://laravel.com/docs/master/blade).
- Lightning fast frontend development workflow powered by [Bud](https://bud.js.org/).
- Out of the box support for [Tailwind CSS](https://tailwindcss.com/).
- Harness the power of [Laravel](https://laravel.com) and its available packages thanks to [Acorn](https://github.com/roots/acorn).

## System Requirements

::: warning Windows users
WSL is required in order to use Sage. Build commands must be run from a [WSL environment](https://docs.microsoft.com/en-us/windows/wsl/).
:::

### Node.js

Sage requires Node.js based tools to manage dependencies and build assets. We recommend using [Volta](https://github.com/volta-cli/volta) to install and manage Node.js. We also recommend using [Yarn](https://yarnpkg.com/).

To install Node.js and Yarn with Volta, run the following command:

```shell
volta install node && npm install --global yarn
```

### Composer

Sage requires Composer to manage PHP dependencies. If your platform supports [Homebrew](https://brew.sh/), you can install Composer with:

```shell
brew install composer
```

Otherwise, [see Composer's documentation](https://getcomposer.org/download/) for installation instructions.

## Installing Sage

### 1. Create a new Sage-based WordPress theme with Composer

Create a new WordPress theme using Sage with Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```shell
# From your WordPress themes directory, run:
composer create-project roots/sage your-theme-name
```

To install the latest development version of Sage, add `dev-main` to the end of the command:

```shell
composer create-project roots/sage your-theme-name dev-main
```

### 2. Install Acorn

::: note This step is required
Sage requires the [Acorn](https://roots.io/acorn/) but doesn't ship with it included. This is to give you the flexibility to include it in a way that works best for your environment.
:::

To install Acorn as part of Sage (this is the most common use case for theme development), run the following command from your Sage-based theme's directory:

```shell
composer require roots/acorn
```

See the [Acorn installation](/acorn/docs/installation/) docs for additional details.

### 3. Edit `bud.config.js`

Modify the `bud.config.js` file in the theme directory to match your theme's directory name and local development URL, if applicable.

```javascript
// bud.config.js

/**
 * Around line 26, update the following path 
 * to match your theme's directory name:
*/

app.setPublicPath('/app/themes/sage/public/');

/**
 * Around line 37, pdate the following URL 
 * to match your local development URL:
*/
.setProxyUrl('http://example.test')
```

### 4. Build assets

From your theme directory, run:

```shell
yarn && yarn build
```

::: warning You must build theme assets in order to access your site. Failing to build the assets will result in the error:

```plaintext
The manifest [/path/to/sage/public/manifest.json] cannot be found.
```

:::

## What Next?

From here you might want to [explore the structure of your new Sage theme](/sage/docs/theme-structure/), or [learn how to use Blade templates](/sage/docs/blade-templates/), or how to [compile assets](/sage/docs/compiling-assets/). These documents are meant to be referenced as you work with Sage, so feel free to jump around as needed.
