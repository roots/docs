---
date_modified: 2023-06-01 10:20
date_published: 2018-04-24 09:47
description: How to generate language files for your WordPress theme created with Sage with an additional build script, and how to load them.
title: Localization
authors:
  - alwaysblank
  - ben
  - bonakor
  - jure
  - Log1x
  - strarsis
---

# Localization

## Generating language files

Run `yarn translate:pot` from your theme directory to generate the language files. Then open the generated `.pot` file with [Poedit](https://poedit.net/), select "Create new translation", save `.mo` & `.po` files in the `resources/lang` folder with the correct name syntax (eg. `fr_FR`, `en_US`).

When adding/removing translations in templates, run `yarn translate:update`, then select "Catalog > Update from a POT file" in Poedit.

## Loading language files

Add the following to `app/setup.php`:

```php
add_action('after_setup_theme', function () {
    load_theme_textdomain('sage', get_template_directory() . '/resources/lang');
});
```

Make sure language files exist in the `resources/lang` directory.

## Polylang and Sage

- Install [BenjaminMedia/wp-polylang-theme-strings](https://github.com/BenjaminMedia/wp-polylang-theme-strings)
- Replace `__()` with `pll__()` in your templates

Need to also translate strings from the `app/` folder? See [`Sage_Polylang_Theme_Translation`](https://github.com/roots/sage/issues/1875#issuecomment-380076482).
