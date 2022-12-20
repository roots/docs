---
description: Acorn is a framework that brings Laravel into WordPress, allowing you to build powerful and elegant plugins and themes.
---

# Acorn

[Acorn](https://github.com/roots/acorn) allows you to lazy-load Laravel functionality like [Blade templates](blade-templates.md), [View Composers](composers.md), Service Providers, and more into your WordPress plugins and themes.

In Sage specifically, it's used for Blade templates, Composers, Components, and a number of other helpers.

Acorn also includes a powerful set of WP-CLI commands that can help you manage your site and develop new features.

To see what it can do, run `wp acorn`.

::: tip
Out of the box, Acorn will use its own configs, and it will keep the application cache and logs in the standard WordPress cache directory.

View the [Acorn docs](/acorn/docs/directory-structure.md#zero-config) to find out more information
:::
