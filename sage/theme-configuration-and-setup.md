---
---
`lib/setup.php` is used to enable/disable theme features and set configuration values. The theme features that can be disabled include:

Clean up from [Soil](/plugins/soil):

    add_theme_support('soil-clean-up');

Cleaner nav walker from [Soil](/plugins/soil):

    add_theme_support('soil-nav-walker');

Relative URLs from [Soil](/plugins/soil):

    add_theme_support('soil-relative-urls');

Nice search from [Soil](/plugins/soil):

    add_theme_support('soil-nice-search');

Enable loading jQuery from [Soil](/plugins/soil):

    add_theme_support('soil-jquery-cdn');

`lib/setup.php` is also used to register navigation menus, sidebars, and define theme support for WordPress core functionality such as post thumbnails, post formats, and HTML5 markup.

### Translations

The first part of the theme setup is making the theme translation available. Sage has [over 35 community translations](https://github.com/roots/sage-translations) available thanks to our contributors.

### Title tag support

`add_theme_support('title-tag')` is a feature added in WordPress 4.1 that allows themes and plugins to manage the document title. This means that there's no `<title>` tag found in the head template since it's automatically added by `wp_head()`.

### Register navigation menus

Sage registers a navigation menu called Primary Navigation. Additional menus should be added in the `register_nav_menus` locations array.

### Post thumbnails

Post thumbnails are enabled with `add_theme_support('post-thumbnails')`, but they aren't output on any of the default templates. Add custom post thumbnail sizes with `add_image_size()`.

### Post formats

Some WordPress post formats are enabled by default, but Sage doesn't provide any styling or templates for different post formats.

### Editor stylesheet

The TinyMCE editor in WordPress allows loading a custom stylesheet which is registered with `add_editor_style()`. The editor stylesheet is automatically generated from your main theme stylesheet when you run the build script.

### Register sidebars

Sage registers two sidebars by default: Primary & Footer. Add additional sidebars with `register_sidebar()`.