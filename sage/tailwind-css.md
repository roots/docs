---
date_modified: 2024-05-22 11:15
date_published: 2023-03-13 11:00
description: Sage includes Tailwind CSS support, including generating the Tailwind color palette, font families, and sizes for `theme.json` which is used by the block editor.
title: Tailwind CSS
authors:
  - ben
  - MWDelaney
---

# Tailwind CSS

Sage includes support for Tailwind CSS out of the box, along with some helpful functionality for integrating your Tailwind config into the WordPress block editor.

## Content configuration

Sage sets the Tailwind [content configuration](https://tailwindcss.com/docs/content-configuration) to the areas of your project that will contain Tailwind CSS class names. Any of the files in these files and directories that use Tailwind class names will be included in your theme build:

```javascript
content: ['./index.php', './app/**/*.php', './resources/**/*.{php,vue,js}'],
```

By default, this covers all theme template files along with all files in the `app/` directory.

## Generating `theme.json` from Tailwind's config

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from the Tailwind config (`tailwind.config.cjs`).

In Sage's Bud config (`bud.config.js`), there a section for generating `theme.json`. This is where you'll want to make any changes to your `theme.json` file.

### Default color palette

Rather than [manually defining the editor colors](https://developer.wordpress.org/themes/advanced-topics/theme-json/#color) by adding them to `theme.json`, your Tailwind config will be used to generate colors for the WordPress editor.

Tailwind’s [default color palette](https://tailwindcss.com/docs/customizing-colors) is a good starting point for sites that don’t already have color/branding guidelines to follow.

### Sizes and font families

In addition to including Tailwind’s color palette for the WordPress editor, Sage will also configure the editor with Tailwind’s font families and font sizes.

Be sure to take a look at [Bud’s documentation on this feature](https://bud.js.org/extensions/sage/theme.json/) for further information.
