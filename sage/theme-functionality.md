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
docs_project:
  - "17"
publish_to_discourse:
  - "0"
---
`functions.php` is used to include files from the `lib/` directory which contains all of the theme functionality. Don’t place any custom code in this file — use it only for includes. 

Since Sage is a starter theme, it’s okay for you to modify files within `lib/` to meet the needs of the site you’re building. 

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

<dl class="dl-horizontal">
  <dt><code>lib/assets.php</code></dt>
  <dd>Enqueue stylesheets and scripts. See <a href="/sage/docs/theme-development/"><b>Theme Development and Building</b></a>.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>lib/extras.php</code></dt>
  <dd>Contains a function for adding classes to <code>&lt;body&gt;</code> and a function that adds a 'Continued' link to excerpts.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>lib/setup.php</code></dt>
  <dd>Enable/disable theme features, set configuration values, register navigation menus, sidebars, and define theme support for WordPress core functionality such as post thumbnails, post formats, and HTML5 markup. See <a href="/sage/docs/theme-configuration/"><b>Theme Configuration and Setup</b></a>.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>lib/titles.php</code></dt>
  <dd>Control the output of page titles.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>lib/wrapper.php</code></dt>
  <dd>The theme wrapper. See <a href="/sage/docs/theme-wrapper/"><b>Theme Wrapper</b></a>.</dd>
</dl>