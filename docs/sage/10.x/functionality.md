---
description: The `app/` directory contains all the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.
---

# Functionality

The `app/` directory contains all the theme functionality. 
Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.

The PHP code in Sage is [namespaced](https://roots.io/namespacing-and-autoloading/), so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

- `app/setup.php` – Enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, register navigation menus and sidebars. 
    See [Theme Configuration and Setup](configuration.md).

- `app/admin.php` – Placeholder code for the WordPress theme customizer. 
    You can also use this file for anything related to the WordPress admin.

- `app/filters.php` – Add WordPress filters in this file. 
    Filters included by default:
  - `excerpt_more` – add "… Continued" to excerpts.

- `app/helpers.php` – A place for you to put functions used throughout your theme.
    Does not ship with any code.

- `app/Providers` - The place for any [Service Providers](https://laravel.com/docs/7.x/providers) you care to define for your theme.
    Comes with `ThemeServiceProvider` that adds no functionality but provides a template for your own Service Providers.
    
- `app/View` - The place for view-related code, i.e. Composers and Components.
    For more information, see the documentation on [Composers](composers.md) and [Components](components.md).
