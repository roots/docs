---
description: Sage uses Bud to compile and optimize assets, and to provide a simple interface for doing so.
---

# Compiling Assets

These are the primary projects that make up the Sage workflow:

[Bud](https://github.com/roots/bud)

Bud is a wrapper for [Webpack](https://webpack.github.io/), and handles compiling stylesheets, checking for JavaScript errors, copying images and fonts, and concatenating and minifying files.
It also provides a fluent API that some find to be easier to interact with than Webpack itself.

[npm](https://www.npmjs.com/)

npm is a JavaScript package manager. 
Sage uses npm to pull in Tailwind CSS and any other JavaScript packages you want to use as dependencies.

<div class="cta-product"><a href="https://roots.io/books/theme-development-with-sage/" class="row text-dark"><div class="book-cover col-sm-6"><img src="https://cdn.roots.io/app/uploads/theme-development-with-sage-third-edition-cover.png" alt="Sage book cover"></div><div class="col-sm-6"><h4 class="mt-sm-3"><span class="mb-2 bg-white badge">Get the book</span> <br> Theme Development with Sage</h4>A step-by-step guide to setting up a custom Sage starter theme. Build well organized &amp; easily maintained WordPress themes using a modern web development workflow.<button class="btn btn-primary">Buy the Sage book</button></div></a></div>

## Available build commands

Run these script commands within your theme directory:

- `yarn build` — Compile and optimize the files in your assets directory
- `yarn start` — Compile assets when file changes are made, start dev session

## Theme assets

What files are compiled and how is controlled from the `bud.config.js` file in the root of the theme.
In-depth discussion of how to configure Bud can be found in the [Bud documentation](https://bud.js.org/), but Sage ships with a configuration that should provide a sufficient starting point--and depending on your use case, may not need any additional configuration.

The configuration will generate the following files:

- `app.css` - The primary stylesheet for the theme.
- `app.js` - The primary JavaScript file for the theme.
- `editor.css` - Styles used by the editor when creating/editing posts.
- `editor.js` - JavaScript for the block editor, i.e. block styles and variants.

It will also copy any files in the `images` or `fonts` directories under `/resources/assets/` into the `public` directory with the other compiled files, but does not optimize or compress them.

### Images in template files

Use the `@asset` directive to call images from template files:

```php
<img src="@asset('images/example.jpg')">
```

### Images in CSS
CSS files and images are sibling folders, so you can reference images in CSS:
```css
.background {
  background-image: url(../images/image.jpg);
}
```

### Assets in PHP

In your PHP, you can make use of the `\Roots\asset()` function, which is what powers the `@asset` directive.

```php
$asset = \Roots\asset('images/example.jpg');
// The public URI of the asset
echo $asset;
echo $asset->url();

// The server path of the asset
echo $asset->path();

// The contents of the asset 
echo $asset->contents();
```
