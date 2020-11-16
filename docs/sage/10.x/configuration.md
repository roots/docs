---
description: Use setup.php in Sage to enable/disable theme features and set configuration values. Register navigation menus, sidebars, define theme support and more.
---

# Configuration

`app/setup.php` is used to enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, and register navigation menus and sidebars.

The various files in `app/config/` are used for additional [Laravel-style configuration](https://laravel.com/docs/7.x/configuration).
They provide configuration details for your theme and Acorn, and are also available to Laravel packages that interface with your theme through Acorn--and to you through `\Roots\config()`.

## Stylesheets and scripts

Manage your front-end theme assets from the `app/setup.php` file:

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('sage/vendor.js', asset('scripts/vendor.js')->uri(), ['jquery'], null, true);
    wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), ['sage/vendor.js', 'jquery'], null, true);

    wp_add_inline_script('sage/vendor.js', asset('scripts/manifest.js')->contents(), 'before');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('sage/app.css', asset('styles/app.css')->uri(), false, null);
}, 100);
```

See [theme assets](compiling-assets.md#theme-assets) for more on how these assets are built.
`asset()`--full name `\Roots\asset()`--is a helper function that can provide you with the path, URI, or contents of an asset.

## Theme features

### Soil

We recommend using the [Soil](/plugins/soil) Plugin with every WordPress install for additional features:

- Load jQuery from the jQuery CDN*
- Cleaner WordPress markup*
- Cleaner HTML output of navigation menus*
- Root relative URLs*
- Nice search*
- Google Analytics snippet from HTML5 Boilerplate
- Move all JS to the footer
- Disable trackbacks and pingbacks

<small>&lowast;If Soil is installed and activated on your WordPress install, Sage will enable these features by default.</small>

### Title tag support

`add_theme_support('title-tag')` is a feature added in WordPress 4.1 that allows themes and plugins to manage the document title. This means that there's no `<title>` tag found in the head template since it's automatically added by `wp_head()`.

### Register navigation menus

Sage registers a navigation menu called Primary Navigation. Additional menus should be added in the `register_nav_menus` locations array.

### Post thumbnails

Post thumbnails are enabled with `add_theme_support('post-thumbnails')`, but they aren't output on any of the default templates. Add custom post thumbnail sizes with `add_image_size()`.

### HTML5 markup

Sage enables HTML5 markup for captions, comment forms, comment lists, galleries, and the search form.

### Editor stylesheet

The TinyMCE editor in WordPress allows loading a custom stylesheet which is registered with `add_editor_style()`. The editor stylesheet is automatically generated from your main theme stylesheet when you run the build script.

### Register sidebars

Sage registers two sidebars by default: Primary & Footer. Add additional sidebars with `register_sidebar()`.

## Theme structure

```sh
themes/your-theme-name/   # → Root of your Sage based theme
├── app/                  # → Theme PHP
│   ├── View/             # → View models
│   ├── Providers/        # → Service providers
│   ├── admin.php         # → Theme customizer setup
│   ├── filters.php       # → Theme filters
│   ├── helpers.php       # → Helper functions
│   └── setup.php         # → Theme setup
├── config/               # → Config files
│   ├── app.php           # → Application configuration
│   ├── assets.php        # → Asset configuration
│   ├── filesystems.php   # → Filesystems configuration
│   ├── logging.php       # → Logging configuration
│   └── view.php          # → View configuration
├── composer.json         # → Autoloading for `app/` files
├── composer.lock         # → Composer lock file (never edit)
├── dist/                 # → Built theme assets (never edit)
├── functions.php         # → Theme bootloader
├── index.php             # → Theme template wrapper
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── assets/           # → Front-end assets
│   │   ├── fonts/        # → Theme fonts
│   │   ├── images/       # → Theme images
│   │   ├── scripts/      # → Theme javascript
│   │   └── styles/       # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── form/         # → Form templates
│       ├── layouts/      # → Base templates
│       └── partials/     # → Partial templates
├── screenshot.png        # → Theme screenshot for WP admin
├── storage/              # → Storage location for cache (never edit)
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── webpack.mix.js        # → Laravel Mix configuration
```
