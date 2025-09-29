---
date_modified: 2025-02-27 13:40
date_published: 2015-09-01 18:19
description: Sage uses Vite for fast asset compilation with HMR support. Includes custom plugin for hot module replacement in WordPress block editor during development.
title: Compiling Assets in Sage with Vite
authors:
  - alwaysblank
  - ben
  - kero
  - Log1x
  - toddsantoro
---

# Compiling Assets in Sage with Vite

[Vite](https://vitejs.dev/) is front-end build tool used in Sage.

Sage also uses the Laravel Vite plugin, along with Laravel's Vite facade for referencing Vite assets in PHP and Blade template files. Because of this, [Laravel's Vite documentation](https://laravel.com/docs/12.x/vite) also applies to Sage.

## Available build commands

- `npm run build` — Build assets
- `npm run dev` — Start dev server (requires updating `vite.config.js` with your local dev URL)

## Theme assets

What files are built and how is controlled from the `vite.config.js` file in the root of the theme.

The configuration will generate the following files:

- `app.css` - The primary stylesheet for the theme.
- `app.js` - The primary JavaScript file for the theme.
- `editor.css` - Styles used by the editor when creating/editing posts.
- `editor.js` - JavaScript for the block editor, i.e. block styles and variants.

It will also copy any files in the `images` or `fonts` directories under `/resources/assets/` into the `public` directory with the other compiled files, but does not optimize or compress them.

### Assets in Blade template files

Use the [`Vite::asset` method](https://laravel.com/docs/12.x/vite#blade-processing-static-assets) to call assets from Blade template files:

```blade
<img src="{{ Vite::asset('resources/images/example.svg') }}">
```

### Assets in CSS

CSS files and images are sibling folders, so you can reference images in CSS:

```css
.background {
  background-image: url("../images/example.svg");
}
```

### Assets in PHP

#### Get the URL of the asset

```php
use Illuminate\Support\Facades\Vite;

$asset = Vite::asset('resources/images/example.svg');
```

#### Get the contents of the asset

```php
use Illuminate\Support\Facades\Vite;

$asset = Vite::content('resources/images/example.svg');
```
