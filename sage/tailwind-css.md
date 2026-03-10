---
date_modified: 2025-02-27 14:00
date_published: 2023-03-13 11:00
description: Sage generates `theme.json` from Tailwind configuration automatically, making Tailwind color palette, font families, and sizes available in WordPress block editor.
title: Using Tailwind CSS with Sage Theme
authors:
  - ben
  - MWDelaney
---

# Using Tailwind CSS with Sage Theme

Sage includes support for Tailwind CSS out of the box, along with some helpful functionality for integrating your Tailwind config into the WordPress block editor.

## Generating `theme.json` from your Tailwind setup

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from your `app.css` file.

This functionality is handled by the [`@roots/vite-plugin`](https://github.com/roots/vite-plugin) included in Sage.

To modify this behavior, open `vite.config.js` and edit the `wordpressThemeJson` plugin's configuration.

### Default color palette

Rather than [manually defining the editor colors](https://developer.wordpress.org/themes/advanced-topics/theme-json/#color) by adding them to `theme.json`, your Tailwind config will be used to generate colors for the WordPress editor.

Tailwind’s [default color palette](https://tailwindcss.com/docs/colors) is a good starting point for sites that don’t already have color/branding guidelines to follow.

### Sizes and font families

In addition to including Tailwind’s color palette for the WordPress editor, Sage will also configure the editor with Tailwind’s font families and font sizes.
