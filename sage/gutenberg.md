---
date_modified: 2023-01-27 13:17
date_published: 2021-10-21 13:21
description: Sage includes a `theme.json` generator that is based on the Tailwind config and includes the default color palette, font families, and font sizes from Tailwind.
title: Gutenberg
authors:
  - alwaysblank
  - ben
  - Log1x
---

# Gutenberg

An in-depth framework for working with Gutenberg is largely beyond the scope of Sage, but it does ship with `/resources/scripts/editor.js` which can be used to register, modify, etc, Gutenberg block styles.

Included in that file is a simple example to get you on the right track.

## theme.json generator

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from the Tailwind config (`tailwind.config.cjs`).

::: tip theme.json spec
Reference [the `theme.json` documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) for the full specification.
:::

Due to Sage including a `theme.json` file, this means [trying to use `add_theme_support()` to configure the editor](https://developer.wordpress.org/block-editor/developers/themes/theme-support/) will not work.

In Sage's Bud config (`bud.config.js`), there a section for generating `theme.json`. This is where you'll want to make any changes to your `theme.json` file.

Tailwind CSS colors, font families, and sizes are generated on the theme build for `theme.json`. See the [Sage docs on Tailwind CSS](/sage/docs/tailwind-css/) for more information.
