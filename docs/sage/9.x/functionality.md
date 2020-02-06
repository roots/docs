# Functionality

The `app/` directory contains all of the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

<dl class="dl-horizontal">
  <dt><code>app/setup.php</code></dt>
  <dd>Enqueue stylesheets and scripts, register support for theme features with <code>add_theme_support</code>, register navigation menus and sidebars. See <a href="/sage/docs/theme-configuration-and-setup/">Theme Configuration and Setup</a>.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>app/admin.php</code></dt>
  <dd>Placeholder code for the WordPress theme customizer. You can also use this file for anything related to the WordPress admin.</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>app/filters.php</code></dt>
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
    <dt><code>app/helpers.php</code></dt>
    <dd>
      <p>Helper functions used throughout the theme:</p>
      <ul>
        <li><code>asset_path</code> &mdash; used when enqueueing theme assets to provide the correct versioned asset filenames</li>
        <li><code>display_sidebar</code> &mdash; used to control displaying the sidebar</li>
        <li><code>title</code> &mdash; used to return page titles</li>
      </ul>
    </dd>
  </dl>
</dl>
