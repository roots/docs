---
ID: 6134
post_title: Theme Configuration and Setup
author: Ben Word
post_date: 2015-09-01 19:02:19
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-configuration-and-setup/
published: true
---
`src/setup.php` is used to enqueue stylesheets and scripts, register support for theme features with <code>add_theme_support</code>, and register navigation menus and sidebars.

## Stylesheets and scripts

Manage your front-end theme assets at the top of the `src/setup.php` file:

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('sage/main.css', asset_path('styles/main.css'), false, null);
    wp_enqueue_script('sage/main.js', asset_path('scripts/main.js'), ['jquery'], null, true);
}, 100);
```

See [theme assets](/sage/docs/theme-development-and-building/#theme-assets) for more on how these assets are built. `asset_path` is a helper function that returns versioned asset filenames from the `dist/` directory.

## Theme features

### Soil

We recommend using the [Soil](/plugins/soil) Plugin with every WordPress install for additional features:

* Load jQuery from the jQuery CDN*
* Cleaner WordPress markup*
* Cleaner HTML output of navigation menus*
* Root relative URLs*
* Nice search*
* Google Analytics snippet from HTML5 Boilerplate
* Move all JS to the footer
* Disable trackbacks and pingbacks

<small>&lowast;If Soil is installed and activated on your WordPress install, Sage will enable these features by default.</small>

### Title tag support

`add_theme_support('title-tag')` is a feature added in WordPress 4.1 that allows themes and plugins to manage the document title. This means that there's no `<title>` tag found in the head template since it's automatically added by `wp_head()`.

### Register navigation menus

Sage registers a navigation menu called Primary Navigation. Additional menus should be added in the `register_nav_menus` locations array.

### Post thumbnails

Post thumbnails are enabled with `add_theme_support('post-thumbnails')`, but they aren't output on any of the default templates. Add custom post thumbnail sizes with `add_image_size()`.

### Post formats

Some WordPress post formats are enabled by default, but Sage doesn't provide any styling or templates for different post formats.

### HTML5 markup

Sage enables HTML5 markup for captions, comment forms, comment lists, galleries, and the search form.

### Editor stylesheet

The TinyMCE editor in WordPress allows loading a custom stylesheet which is registered with `add_editor_style()`. The editor stylesheet is automatically generated from your main theme stylesheet when you run the build script.

### Register sidebars

Sage registers two sidebars by default: Primary & Footer. Add additional sidebars with `register_sidebar()`.

## Theme structure

```shell
themes/theme-name/        # → Root of your Sage based theme
├── assets                # → Front-end assets
│   ├── config.json       # → Settings for compiled assets
│   ├── fonts/            # → Theme fonts
│   ├── images/           # → Theme images
│   ├── scripts/          # → Theme JS
│   └── styles/           # → Theme stylesheets
├── composer.json         # → Autoloading for `src/` files
├── composer.lock         # → Composer lock file (never manually edit)
├── dist/                 # → Built theme assets (never manually edit)
├── functions.php         # → Never manually edit
├── index.php             # → Never manually edit
├── node_modules/         # → Node.js packages (never manually edit)
├── package.json          # → Node.js dependencies and scripts
├── screenshot.png        # → Theme screenshot for WP admin
├── src/                  # → Theme PHP
├── style.css             # → Theme meta information
├── templates/            # → Theme templates
│   ├── layouts/          # → Base templates
│   └── partials/         # → Partial templates
├── vendor/               # → Composer packages (never manually edit)
├── watch.js              # → Webpack/BrowserSync watch config
└── webpack.config.js     # → Webpack config
```
