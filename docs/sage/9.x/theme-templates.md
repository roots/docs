# Theme Templates

The `resources/views/` directory contains files that you can further extend with the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy):

<dl class="dl-horizontal">
  <dt>`404.blade.php`</dt>
  <dd>Error 404 page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`index.blade.php`</dt>
  <dd>Archive page (used by blog page, category archives, author archives and more)</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`page.blade.php`</dt>
  <dd>Single page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`search.blade.php`</dt>
  <dd>Search results page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`single.blade.php`</dt>
  <dd>Single post page</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`template-custom.blade.php`</dt>
  <dd>An example single page template</dd>
</dl>

All templates are wrapped by a base file in the `layouts/` directory:

<dl class="dl-horizontal">
  <dt>`app.blade.php`</dt>
  <dd>The base template which wraps the base markup around all template files</dd>
</dl>

These files include templates from the `resources/views/partials/` directory which is where you&rsquo;ll be making most of your customizations:

<dl class="dl-horizontal">
  <dt>`comments.blade.php`</dt>
  <dd>Markup for comments</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-page.blade.php`</dt>
  <dd>Markup included from `resources/views/page.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-search.blade.php`</dt>
  <dd>Markup included from `resources/views/search.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content-single.blade.php`</dt>
  <dd>Markup included from `resources/views/single.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`content.blade.php`</dt>
  <dd>Markup included from `resources/views/index.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`entry-meta.blade.php`</dt>
  <dd>Post entry meta information included from `resources/views/content-single.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`footer.blade.php`</dt>
  <dd>Footer markup included from `layouts/base.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`head.blade.php`</dt>
  <dd>`&lt;head&gt;` markup included from `layouts/base.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`header.blade.php`</dt>
  <dd>Header markup included from `layouts/base.blade.php`</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`page-header.blade.php`</dt>
  <dd>Page title markup included from most of the files in the `resources/views/` directory</dd>
</dl>
<dl class="dl-horizontal">
  <dt>`sidebar.blade.php`</dt>
  <dd>Sidebar markup included from `layouts/base.blade.php`</dd>
</dl>

## Extending templates

The normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) is still intact. Here’s some examples:

- Copy `index.blade.php` to `author.blade.php` for customizing author archives
- Copy `index.blade.php` to `home.blade.php` for customizing the Home page if you’re showing the latest posts (under Reading Settings) instead of a static front page
- Copy `index.blade.php` to `archive-gallery.blade.php` for customizing the archive page for a custom post type registered as `gallery`
- Copy `page.blade.php` to `front-page.blade.php` for customizing the static front page
- Copy `page.blade.php` to `page-about.blade.php` for customizing a page called About
