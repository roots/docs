---
ID: 6135
post_title: Theme Functionality
author: Ben Word
post_date: 2015-09-01 19:05:16
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-functionality/
published: true
---
`functions.php` is used to include files from the `src/` directory which contains all of the theme functionality. Don’t place any custom code in this file — use it only for includes.

Since Sage is a starter theme, it’s okay for you to modify files within `src/` to meet the needs of the site you’re building.

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

<dl class="dl-horizontal">
  <dt><code>src/setup.php</code></dt>
  <dd>Enqueue stylesheets and scripts, register support for theme features with <code>add_theme_support</code>, register navigation menus and sidebars. See <a href="/sage/theme-configuration-and-setup.md">Theme Configuration and Setup</a>.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>src/admin.php</code></dt>
  <dd>Placeholder code for the WordPress theme customizer. You can also use this file for anything related to the WordPress admin.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>src/filters.php</code></dt>
  <dd>
    <p>Add WordPress filters in this file. Filters included by default:</p>
    <ul>
      <li><code>body_class</code> &mdash; add <code>&lt;body&gt;</code> classes</li>
      <li><code>excerpt_more</code> &mdash; add "… Continued" to excerpts</li>
      <li><code>template_include</code> &mdash; enable the theme wrapper</li>
      <li>Various filters for the Blade implementation</li>
    </ul>
  </dd>
  <dl class="dl-horizontal">
    <dt><code>src/helpers.php</code></dt>
    <dd>
      <p>Helper functions used throughout the theme:</p>
      <ul>
        <li><code>asset_path</code> &mdash; used when enqueueing theme assets to provide the correct versioned asset filenames</li>
        <li><code>display_sidebar</code> &mdash; used to control displaying the sidebar</li>
        <li><code>title</code> &mdash; used to return page titles</li>
      </ul>
    </dd>
  </dl>
  <dl class="dl-horizontal">
    <dt><code>src/lib/</code></dt>
    <dd>This directory contains the Blade implementation code along with the code used to parse <code>dist/assets.json</code> and enqueue assets with the versioned filenames</dd>
  </dl>
</dl>
