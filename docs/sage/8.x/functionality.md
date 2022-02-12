# Functionality

`functions.php` is used to include files from the `src/` directory which contains all of the theme functionality. Don’t place any custom code in this file — use it only for includes.

Since Sage is a starter theme, it’s okay for you to modify files within `src/` to meet the needs of the site you’re building.

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

## Configuration

### `src/setup.php`

Enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, register navigation menus and sidebars. See [Theme Configuration and Setup](configuration.md).

### `src/admin.php`

Placeholder code for the WordPress theme customizer. You can also use this file for anything related to the WordPress admin.

### `src/filters.php`

Add WordPress filters in this file. Filters included by default:

- `body_class` – add `<body>` classes
- `excerpt_more` – add "… Continued" to excerpts
- `template_include` – enable the theme wrapper
- Various filters for the Blade implementation

### `src/helpers.php`

Helper functions used throughout the theme:

- `asset_path` – used when enqueueing theme assets to provide the correct versioned asset filenames
- `display_sidebar` – used to control displaying the sidebar
- `title` – used to return page titles

### `src/lib/`

This directory contains the Blade implementation code along with the code used to parse `dist/assets.json` and enqueue assets with the versioned filenames.
