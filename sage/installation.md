---
date_modified: 2025-02-27 13:45
date_published: 2015-08-29 18:09
description: Install Sage 11, a WordPress starter theme, by running `composer create-project roots/sage`.
title: Installing Sage
authors:
  - alwaysblank
  - ben
  - Jacek
  - Lachlan_Arthur
  - Log1x
  - QWp6t
  - TangRufus
---

# Installation

Install Sage using Composer from your WordPress themes directory:

```shell
$ composer create-project roots/sage your-theme-name
```

To install the latest development version of Sage, add `dev-main` to the end of the command:

```shell
$ composer create-project roots/sage your-theme-name dev-main
```

## Build assets

- Edit the `base` path in `vite.config.js`
- Run `npm install` from the theme directory to install dependencies
- Run `npm run build` to compile assets

You must build theme assets in order to access your site. Failing to build the assets will result in the error:

```plaintext
Vite manifest not found at [/path/to/sage/public/build/manifest.json] cannot be found.
```
