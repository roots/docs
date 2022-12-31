---
description: Sage includes a `theme.json` file that is based on the Tailwind config and includes the default color palette, font families, and font sizes from Tailwind.
---

# Gutenberg

An in-depth framework for working with Gutenberg is largely beyond the scope of Sage, but it does ship with `/resources/scripts/editor.js` which can be used to register, modify, etc, Gutenberg block styles.

Included in that file is a simple example to get you on the right track.

## theme.json generator

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from the Tailwind config (`tailwind.config.js`).

::: tip theme.json spec
Reference [the `theme.json` documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) for the full specification.
:::

Due to Sage including a `theme.json` file, this means [trying to use `add_theme_support()` to configure the editor](https://developer.wordpress.org/block-editor/developers/themes/theme-support/) will not work.

In Sage's Bud config (`bud.config.mjs`), there a section for generating `theme.json`. This is where you'll want to make any changes to your `theme.json` file.

### Default color palette

Rather than [manually defining the the editor colors](https://developer.wordpress.org/themes/advanced-topics/theme-json/#color) in your Sage-based WordPress themes by adding them to `theme.json`, your color palette as defined by your Tailwind config will be used by default for the WordPress editor.

Tailwind’s [default color palette](https://tailwindcss.com/docs/customizing-colors) is a good starting point for sites that don’t already have color/branding guidelines to follow.

### Sizes and font families

In addition to including Tailwind’s color palette for the WordPress editor, Sage will also configure the editor with Tailwind’s font families and font sizes.

Be sure to take a look at [Bud’s documentation on this feature](https://bud.js.org/extensions/sage/theme.json/) for further information.
