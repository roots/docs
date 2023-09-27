---
date_modified: 2023-09-27 22:00
date_published: 2021-10-21 13:21
description: How to work with Gutenberg, the WordPress block editor, with the Sage starter theme.
title: Gutenberg
authors:
  - alwaysblank
  - ben
  - joshf
  - Log1x
  - strarsis
---

# Block Editor (Gutenberg)

Sage includes two assets that are enqueued when working with the WordPress block editor, also known as Gutenberg:

* `resources/scripts/editor.js`
* `resources/styles/editor.css`

Any styles added to `editor.css` will only be applied to the block editor.

## Adding `app.css` to the editor

If you wish to include the `app.css` stylesheet to the block editor, you can do so by using the [`add_editor_style()` function](https://developer.wordpress.org/reference/functions/add_editor_style/):

```php
add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style(asset('app.css')->relativePath(get_theme_file_path()));
});
```

Your CSS will be added as inlined styles and all selectors will be prefixed with `.editor-styles-wrapper`, with the exception of any styles targeting the `body` element.

## `theme.json` generator

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from the Tailwind config (`tailwind.config.cjs`).

::: tip theme.json spec
Reference [the `theme.json` documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) for the full specification.
:::

Due to Sage including a `theme.json` file, this means [trying to use `add_theme_support()` to configure the editor](https://developer.wordpress.org/block-editor/developers/themes/theme-support/) will not work.

In Sage's Bud config (`bud.config.js`), there a section for generating `theme.json`. This is where you'll want to make any changes to your `theme.json` file.

Tailwind CSS colors, font families, and sizes are generated on the theme build for `theme.json`. See the [Sage docs on Tailwind CSS](/sage/docs/tailwind-css/) for more information.

## Editor styling workflows

### `bud-wp-editor-query`

[`bud-wp-editor-query`](https://github.com/talss89/bud-wp-editor-query) can be used to extract editor styles by using `@media (wp-editor)`.
