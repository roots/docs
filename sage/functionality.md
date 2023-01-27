---
description: The `app/` directory contains all the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.
authors:
  - alwaysblank
  - ben
  - jure
  - Log1x
---

# Functionality

The `app/` directory contains all the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.

Most of the PHP code in Sage is namespaced and autoloaded, so make sure to use namespaced functions and classes. If you aren't familiar with these methods, see our blog posts on:

* [Namespacing and Autoloading](/namespacing-and-autoloading/)
* [Upping PHP Requirements in Your WordPress Themes and Plugins](/upping-php-requirements-in-your-wordpress-themes-and-plugins/)

## The `app/` directory

- `app/setup.php` — Enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, register navigation menus and sidebars. 
    See [Theme Configuration and Setup](configuration.md).

- `app/filters.php` — Add WordPress filters in this file. 
    Filters included by default:
  - `excerpt_more` — add "… Continued" to excerpts.

- `app/Providers` — The place for any [Service Providers](https://laravel.com/docs/9.x/providers) you care to define for your theme.
    Comes with `ThemeServiceProvider` that adds no functionality but provides a template for your own Service Providers.
    
- `app/View` — The place for view-related code, i.e. Composers and Components.
    For more information, see the documentation on [Composers](composers.md) and [Components](components.md).
