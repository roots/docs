---
date_modified: 2025-02-27 14:00
date_published: 2021-10-21 13:21
description: Sage includes full WordPress block editor support with HMR for editor styles, ensuring consistent styling between editor and frontend with `theme.json` integration.
title: Gutenberg Block Editor Support in Sage
authors:
  - alwaysblank
  - ben
  - joshf
  - Log1x
  - strarsis
---

# Gutenberg Block Editor Support in Sage

Sage includes two assets that are enqueued when working with the WordPress block editor, also known as Gutenberg:

* `resources/js/editor.js`
* `resources/css/editor.css`

Any styles added to `editor.css` will only be applied to the block editor.

::: warning All blocks must have version 3 support
Sage's `editor.css` expects the block editor to be iframed. If you have any blocks that don't support version 3, then the block editor won't be iframed.
:::

<small>([Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/#version-3-wordpress-6-3))</small>

## `theme.json` generator

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from your Tailwind setup.

::: tip theme.json spec
Reference [the `theme.json` documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) for the full specification.
:::

Due to Sage including a `theme.json` file, this means [trying to use `add_theme_support()` to configure the editor](https://developer.wordpress.org/block-editor/developers/themes/theme-support/) will not work.

Tailwind CSS colors, font families, and sizes are generated on the theme build for `theme.json`. See the [Sage docs on Tailwind CSS](/sage/docs/tailwind-css/) for more information. This can be disabled in `vite.config.js`.
