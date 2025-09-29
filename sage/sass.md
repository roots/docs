---
date_modified: 2025-04-15 11:15
date_published: 2023-06-06 17:30
description: Enable Sass in Sage by renaming `app.css` to `app.scss` for advanced CSS preprocessing with variables and mixins.
title: Using Sass with Sage WordPress Theme
authors:
  - ben
  - carlosfaria
  - code23_isaac
  - diomededavid
  - MWDelaney
  - kellymears
  - talss89
---

# Using Sass with Sage WordPress Theme

Remove Tailwind CSS dependencies: `npm uninstall -D @tailwindcss/vite tailwindcss`

Delete the contents of `resources/css/app.css` and `resources/css/editor.css`.

Add the `sass` extension:

```shell
$ npm install -D sass
```

In the `resources/css` directory, rename `app.css` to `app.scss` and rename `editor.css` to `editor.scss`.

```plaintext
app.css    -> app.scss
editor.css -> editor.scss
```

Modify `vite.config.js` to remove the Tailwind plugin, reference the new file extensions, and disable the Tailwind CSS `theme.json` generation:

```diff
 import { defineConfig } from 'vite'
-import tailwindcss from '@tailwindcss/vite';
 import laravel from 'laravel-vite-plugin'
 import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

 export default defineConfig({
   base: '/app/themes/sage/public/build/',
   plugins: [
-    tailwindcss(),
     laravel({
       input: [
-        'resources/css/app.css',
+        'resources/css/app.scss',
         'resources/js/app.js',
-        'resources/css/editor.css',
+        'resources/css/editor.scss',
         'resources/js/editor.js',
       ],

     wordpressThemeJson({
-      disableTailwindColors: false,
-      disableTailwindFonts: false,
-      disableTailwindFontSizes: false,
+      disableTailwindColors: true,
+      disableTailwindFonts: true,
+      disableTailwindFontSizes: true,
     }),
   ],
```

Modify the `@vite()` directive in `resourves/views/layouts/app.blade.php` to use `app.scss` instead of `app.css`:

```diff
-    @vite(['resources/css/app.css', 'resources/js/app.js'])
+    @vite(['resources/css/app.scss', 'resources/js/app.js'])
```

Modify the `block_editor_settings_all` filter in `app/setup.php` to use `editor.scss` instead of `editor.css`;

```diff
add_filter('block_editor_settings_all', function ($settings) {
-    $style = Vite::asset('resources/css/editor.css');
+    $style = Vite::asset('resources/css/editor.scss');

    $settings['styles'][] = [
        'css' => "@import url('{$style}')",
    ];

    return $settings;
});

```
