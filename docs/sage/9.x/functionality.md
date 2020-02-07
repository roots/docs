# Functionality

The `app/` directory contains all of the theme functionality. Since Sage is a starter theme, it’s okay for you to modify files within `app/` to meet the needs of the site you’re building.

The PHP code in Sage is namespaced, so make sure to [use namespaced functions and classes](https://roots.io/upping-php-requirements-in-your-wordpress-themes-and-plugins/).

<dl class="dl-horizontal">
  <dt>`app/setup.php`</dt>
  <dd>Enqueue stylesheets and scripts, register support for theme features with `add_theme_support`, register navigation menus and sidebars. See <a href="/sage/docs/theme-configuration-and-setup/">Theme Configuration and Setup</a>.</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`app/admin.php`</dt>
  <dd>Placeholder code for the WordPress theme customizer. You can also use this file for anything related to the WordPress admin.</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`app/filters.php`</dt>
  <dd>
    Add WordPress filters in this file. Filters included by default:
    <ul>
      <li>`body_class` – add `&lt;body&gt;` classes</li>
      <li>`excerpt_more` – add "… Continued" to excerpts</li>
      <li>`template_include` – enable the theme wrapper</li>
      <li>Various filters for the Blade implementation</li>
    </ul>
  </dd>
  <dl class="dl-horizontal">
    <dt>`app/helpers.php`</dt>
    <dd>
      Helper functions used throughout the theme:
      <ul>
        <li>`asset_path` – used when enqueueing theme assets to provide the correct versioned asset filenames</li>
        <li>`display_sidebar` – used to control displaying the sidebar</li>
        <li>`title` – used to return page titles</li>
      </ul>
    </dd>
  </dl>
</dl>
