---
ID: 6136
post_title: Theme Templates
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-templates/
published: true
post_date: 2015-09-01 19:12:53
---
The `resources/views/` directory contains files that you can further extend with the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy):

<dl class="dl-horizontal">
  <dt><code>404.blade.php</code></dt>
  <dd>Error 404 page</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>index.blade.php</code></dt>
  <dd>Archive page (used by blog page, category archives, author archives and more)</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>page.blade.php</code></dt>
  <dd>Single page</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>search.blade.php</code></dt>
  <dd>Search results page</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>single.blade.php</code></dt>
  <dd>Single post page</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>template-custom.blade.php</code></dt>
  <dd>An example single page template</dd>
</dl>

<p>All templates are wrapped by a base file in the <code>layouts/</code> directory:</p>

<dl class="dl-horizontal">
  <dt><code>app.blade.php</code></dt>
  <dd>The base template which wraps the base markup around all template files</dd>
</dl>

<p>These files include templates from the <code>resources/views/partials/</code> directory which is where you&rsquo;ll be making most of your customizations:</p>

<dl class="dl-horizontal">
  <dt><code>comments.blade.php</code></dt>
  <dd>Markup for comments</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>content-page.blade.php</code></dt>
  <dd>Markup included from <code>resources/views/page.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>content-search.blade.php</code></dt>
  <dd>Markup included from <code>resources/views/search.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>content-single.blade.php</code></dt>
  <dd>Markup included from <code>resources/views/single.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>content.blade.php</code></dt>
  <dd>Markup included from <code>resources/views/index.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>entry-meta.blade.php</code></dt>
  <dd>Post entry meta information included from <code>resources/views/content-single.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>footer.blade.php</code></dt>
  <dd>Footer markup included from <code>layouts/base.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>head.blade.php</code></dt>
  <dd><code>&lt;head&gt;</code> markup included from <code>layouts/base.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>header.blade.php</code></dt>
  <dd>Header markup included from <code>layouts/base.blade.php</code></dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>page-header.blade.php</code></dt>
  <dd>Page title markup included from most of the files in the <code>resources/views/</code> directory</dd>
</dl>
<dl class="dl-horizontal">
  <dt><code>sidebar.blade.php</code></dt>
  <dd>Sidebar markup included from <code>layouts/base.blade.php</code></dd>
</dl>

## Extending templates

The normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) is still intact. Here’s some examples:

* Copy `index.blade.php` to `author.blade.php` for customizing author archives
* Copy `index.blade.php` to `home.blade.php` for customizing the Home page if you’re showing the latest posts (under Reading Settings) instead of a static front page
* Copy `index.blade.php` to `archive-gallery.blade.php` for customizing the archive page for a custom post type registered as `gallery`
* Copy `page.blade.php` to `front-page.blade.php` for customizing the static front page
* Copy `page.blade.php` to `page-about.blade.php` for customizing a page called About