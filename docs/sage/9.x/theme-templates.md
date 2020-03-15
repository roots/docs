---
description: The `resources/views/` directory contains files that you can further extend with the normal WordPress template hierarchy.
---

# Theme Templates

The `resources/views/` directory contains files that you can further extend with the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy):

- `404.blade.php` – Error 404 page
- `index.blade.php` – Archive page (used by blog page, category archives, author archives and more)
- `page.blade.php` – Single page
- `search.blade.php` – Search results page
- `single.blade.php` – Single post page
- `template-custom.blade.php` – An example single page template

All templates are wrapped by a base file in the `layouts/` directory:

- `app.blade.php` – The base template which wraps the base markup around all template files

These files include templates from the `resources/views/partials/` directory which is where you'll be making most of your customizations:

- `comments.blade.php` – Markup for comments
- `content-page.blade.php` – Markup included from `resources/views/page.blade.php`
- `content-search.blade.php` – Markup included from `resources/views/search.blade.php`
- `content-single.blade.php` – Markup included from `resources/views/single.blade.php`
- `content.blade.php` – Markup included from `resources/views/index.blade.php`
- `entry-meta.blade.php` – Post entry meta information included from `resources/views/content-single.blade.php`
`footer.blade.php` – Footer markup included from `layouts/base.blade.php`
- `head.blade.php` – `&lt;head&gt;` markup included from `layouts/base.blade.php`
- `header.blade.php` – Header markup included from `layouts/base.blade.php`
- `page-header.blade.php` – Page title markup included from most of the files in the `resources/views/` directory
- `sidebar.blade.php` – Sidebar markup included from `layouts/base.blade.php`

## Extending templates

The normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) is still intact. Here’s some examples:

- Copy `index.blade.php` to `author.blade.php` for customizing author archives
- Copy `index.blade.php` to `home.blade.php` for customizing the Home page if you’re showing the latest posts (under Reading Settings) instead of a static front page
- Copy `index.blade.php` to `archive-gallery.blade.php` for customizing the archive page for a custom post type registered as `gallery`
- Copy `page.blade.php` to `front-page.blade.php` for customizing the static front page
- Copy `page.blade.php` to `page-about.blade.php` for customizing a page called About
