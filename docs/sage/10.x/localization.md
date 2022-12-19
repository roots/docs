---
description: How to generate language files for your WordPress theme created with Sage with an additional build script, and how to load them.
---

# Localization

## Generating language files

1. Open `package.json` and add a script for generating language files:
    ```json
    {
      "name": "sage",
      ...
      "scripts": {
        ...
        "pot": "mkdir -p ./resources/lang && find ./resources ./app -iname '*.php' | xargs xgettext --add-comments=TRANSLATORS --force-po --from-code=UTF-8 --default-domain=de_DE -k__ -k_e -k_n:1,2 -k_x:1,2c -k_ex:1,2c -k_nx:4c,12 -kesc_attr__ -kesc_attr_e -kesc_attr_x:1,2c -kesc_html__ -kesc_html_e -kesc_html_x:1,2c -k_n_noop:1,2 -k_nx_noop:3c,1,2, -k__ngettext_noop:1,2 -o resources/lang/sage.pot && find ./resources -iname '*.blade.php' | xargs xgettext --language=Python --add-comments=TRANSLATORS --force-po --from-code=UTF-8 --default-domain=de_DE -k__ -k_e -k_n:1,2 -k_x:1,2c -k_ex:1,2c -k_nx:4c,12 -kesc_attr__ -kesc_attr_e -kesc_attr_x:1,2c -kesc_html__ -kesc_html_e -kesc_html_x:1,2c -k_n_noop:1,2 -k_nx_noop:3c,1,2, -k__ngettext_noop:1,2 -j -o resources/lang/sage.pot"
      },
    }
    ```

2. Run `yarn pot` from your theme directory to generate the language files. In case of an error, install/update `coreutils`, `findutils` and/or `gettext` on homebrew.

3. Open the generated `.pot` file with [Poedit](https://poedit.net/), select "Create new translation", save `.mo` & `.po` files in the `resources/lang` folder with the correct name syntax (eg. `fr_FR`, `en_US`)

When adding/removing translations in templates, run `yarn pot` again, then select "Catalog > Update from a POT file" in Poedit.

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
