---
date_modified: 2024-01-17 08:22
date_published: 2015-09-01 19:02
description: Use setup.php in Sage to enable/disable theme features and set configuration values. Register navigation menus, sidebars, define theme support and more.
title: Configuration
authors:
  - alwaysblank
  - ben
  - Log1x
---

# Configuration

## Introduction

All of the configuration for Sage lives inside of `app/setup.php`. Each option is documented allowing for you to easily familiarize yourself with the options configured out of the box.

## Theme Configuration

Configuration specific to WordPress resides in the `app/setup.php` file. In this file, you will find the default enqueued stylesheets and scripts, the supported theme features added with `add_theme_support`, and the registration hooks for navigation menus and sidebars.

By default, Sage is configured to:

- Enqueue `app.css` and `app.js` on the frontend.
- Enqueue `editor.css` and `editor.js` in the Gutenberg editor.
- Add theme support for common functionality.
- Register a default navigation menu called `primary_navigation`.
- Register a primary and footer Sidebar widget area.

### `theme.json`

Sage ships with a starter `theme.json` that is generated from the build based on your Tailwind config. See the [Gutenberg docs](/sage/docs/gutenberg/) for further information.
