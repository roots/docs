---
description: Install Sage 10, a WordPress starter theme, by running `composer create-project roots/sage`.
---

# Installation

[[toc]]

## What is Sage?

Sage is a [WordPress starter theme](https://roots.io/sage/).

### Why use Sage?

- Harness the power of [Laravel](https://laravel.com) and its available packages thanks to [Acorn](https://github.com/roots/acorn).
- Clean, efficient theme templating utilizing [Laravel Blade](https://laravel.com/docs/master/blade).
- Lightning fast frontend development workflow powered by [Bud](https://bud.js.org/).
- Out of the box support for [Tailwind CSS](https://tailwindcss.com/).

## Getting Started

::: warning Windows users
WSL is required in order to use Sage. Build commands must be ran from a [WSL environment](https://docs.microsoft.com/en-us/windows/wsl/).
:::

Sage relies on Node.js based tools to manage dependencies and build assets. We recommend using [Volta](https://github.com/volta-cli/volta) to install and manage Node.js. We also recommend using [Yarn](https://yarnpkg.com/). [After installing Volta](https://docs.volta.sh/guide/getting-started):

```bash
# Install the latest Node.js LTS release
$ volta install node

# Globally install Yarn
$ npm install --global yarn
```

## Installing Acorn

Sage requires Acorn but doesn't ship with it included. This is to give you the flexibility to include it in a way that works best for your environment.

:::: tabs

::: tab "Install Acorn with Composer"

Install Acorn on your WordPress install managed by Composer, such as with [Bedrock](https://roots.io/bedrock/):

```sh
$ composer require roots/acorn
```

:::

::: tab "Install Acorn as a mu-plugin"

Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract it to your `mu-plugins` directory. Make sure you have a mechanism in place to autoload it.

:::

::: tab "Install Acorn as a plugin"

Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract to your `plugins` directory. Make sure to activate the plugin or it won't work.

:::

::::


See the [Acorn installation](../../acorn/2.x/installation.md) docs for additional details.

## Installing Sage with Composer

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```sh
# From your WordPress themes directory, run:
$ composer create-project roots/sage your-theme-name
```

To install the latest development version of Sage, add `dev-main` to the end of the command:

```sh
$ composer create-project roots/sage your-theme-name dev-main
```

## Build assets

You must build theme assets in order to access your site. Failing to build the assets will result in the error:

```
The manifest [/path/to/sage/public/manifest.json] cannot be found.
```

### Running the first build

- Run `yarn` from the theme directory to install dependencies
- Update `bud.config.mjs` with your local dev URL
- `yarn build` — Compile assets
