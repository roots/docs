# Functionality

The `app/` directory contains all of the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

- `app/setup.php` – Enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, register navigation menus and sidebars. See [Theme Configuration and Setup](configuration.md).

- `app/admin.php` – Placeholder code for the WordPress theme customizer. You can also use this file for anything related to the WordPress admin.

- `app/filters.php` – Add WordPress filters in this file. Filters included by default:
  - `body_class` – add `<body>` classes
  - `excerpt_more` – add "… Continued" to excerpts
  - `template_include` – enable the theme wrapper
  - Various filters for the Blade implementation
    
- `app/helpers.php` – Helper functions used throughout the theme:
  - `asset_path` – used when enqueueing theme assets to provide the correct versioned asset filenames
  - `display_sidebar` – used to control displaying the sidebar
  - `title` – used to return page titles
