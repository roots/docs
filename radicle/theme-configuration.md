---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Theme Configuration
authors:
  - ben
---

# Theme Configuration Basics

The `config/theme.php` file should be used to configure:

* Navigation menus
* Sidebars
* Theme supports

::: tip
Coming from a typical Sage setup? This file replaces `app/setup.php`
:::

The Bud config (`bud.config.js`) is used for configuring the `theme.json` file that is used by the WordPress editor. For further information on `theme.json` and Bud's generator for it, see:

* [https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
* [https://bud.js.org/extensions/sage/theme.json](https://bud.js.org/extensions/sage/theme.json)
* [https://roots.io/sage/docs/tailwind-css/](https://roots.io/sage/docs/tailwind-css/)

You will never need to edit anything from the theme directory (`public/content/themes/radicle/`) unless you want to change the name of the theme from Radicle.
