# Templates

The markup in Sage is based on [HTML5 Boilerplate](http://html5boilerplate.com/) with ARIA roles for accessibility and the hNews microformat for posts.

The `templates/` directory contains files that you can further extend with the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy):

<dl class="dl-horizontal">
  <dt>`404.php`</dt>
  <dd>Error 404 page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`index.php`</dt>
  <dd>Archive page (used by blog page, category archives, author archives and more)</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`page.php`</dt>
  <dd>Single page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`search.php`</dt>
  <dd>Search results page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`single.php`</dt>
  <dd>Single post page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`template-custom.php`</dt>
  <dd>An example single page template</dd>
</dl>

All templates are wrapped by a base file in the `layouts/` directory:

<dl class="dl-horizontal">
  <dt>`base.php`</dt>
  <dd>The <a href="/sage/docs/theme-wrapper/">theme wrapper</a> which wraps the base markup around all template files</dd>
</dl>

These files include templates from the `templates/partials/` directory which is where you&rsquo;ll be making most of your customizations:

<dl class="dl-horizontal">
  <dt>`comments.php`</dt>
  <dd>Markup for comments</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-page.php`</dt>
  <dd>Markup included from `templates/page.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-search.php`</dt>
  <dd>Markup included from `templates/search.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-single.php`</dt>
  <dd>Markup included from `templates/single.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content.php`</dt>
  <dd>Markup included from `templates/index.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`entry-meta.php`</dt>
  <dd>Post entry meta information included from `templates/content-single.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`footer.php`</dt>
  <dd>Footer markup included from `layouts/base.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`head.php`</dt>
  <dd>`&lt;head&gt;` markup included from `layouts/base.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`header.php`</dt>
  <dd>Header markup included from `layouts/base.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`page-header.php`</dt>
  <dd>Page title markup included from most of the files in the `templates/` directory</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`sidebar.php`</dt>
  <dd>Sidebar markup included from `layouts/base.php`</dd>
</dl>

## Extending templates

Even with the [theme wrapper](/sage/docs/theme-wrapper/), the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) is still intact. Here’s some examples:

- Copy `index.php` to `author.php` for customizing author archives
- Copy `index.php` to `home.php` for customizing the Home page if you’re showing the latest posts (under Reading Settings) instead of a static front page
- Copy `index.php` to `archive-gallery.php` for customizing the archive page for a custom post type registered as `gallery`
- Copy `page.php` to `front-page.php` for customizing the static front page
- Copy `page.php` to `page-about.php` for customizing a page called About

The [theme wrapper documentation](/sage/docs/theme-wrapper/) goes into depth about creating new `base.php` files, but if you’d like to have a customized `base.php` based on a certain template, just copy it to `templates/layouts/base-<template name>.php`. You can add conditional statements to `base.php` whenever possible and should generally aim to not have multiple theme wrappers in your theme.
