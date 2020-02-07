# Templates

The markup in Sage is based on [HTML5 Boilerplate](http://html5boilerplate.com/) with ARIA roles for accessibility and the hNews microformat for posts.

The `templates/` directory contains files that you can further extend with the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy):

- `404.php` – Error 404 page
- `index.php` – Archive page (used by blog page, category archives, author archives and more)
- `page.php` – Single page
- `search.php` – Search results page
- `single.php` – Single post page
- `template-custom.php` – An example single page template

All templates are wrapped by a base file in the `layouts/` directory:

- `base.php` – The [theme wrapper](wrapper.md) which wraps the base markup around all template files

These files include templates from the `templates/partials/` directory which is where you'll be making most of your customizations:

- `comments.php` – Markup for comments
- `content-page.php` – Markup included from `templates/page.php`
- `content-search.php` – Markup included from `templates/search.php`
- `content-single.php` – Markup included from `templates/single.php`
- `content.php` – Markup included from `templates/index.php`
- `entry-meta.php` – Post entry meta information included from `templates/content-single.php`
- `footer.php` – Footer markup included from `layouts/base.php`
- `head.php` – `&lt;head&gt;` markup included from `layouts/base.php`
- `header.php` – Header markup included from `layouts/base.php`
- `page-header.php` – Page title markup included from most of the files in the `templates/` directory
- `sidebar.php` – Sidebar markup included from `layouts/base.php`

## Extending templates

Even with the [theme wrapper](wrapper.md), the normal [WordPress Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) is still intact. Here’s some examples:

- Copy `index.php` to `author.php` for customizing author archives
- Copy `index.php` to `home.php` for customizing the Home page if you’re showing the latest posts (under Reading Settings) instead of a static front page
- Copy `index.php` to `archive-gallery.php` for customizing the archive page for a custom post type registered as `gallery`
- Copy `page.php` to `front-page.php` for customizing the static front page
- Copy `page.php` to `page-about.php` for customizing a page called About

The [theme wrapper documentation](wrapper.md) goes into depth about creating new `base.php` files, but if you’d like to have a customized `base.php` based on a certain template, just copy it to `templates/layouts/base-<template name>.php`. You can add conditional statements to `base.php` whenever possible and should generally aim to not have multiple theme wrappers in your theme.
