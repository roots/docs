---
description: Sage uses Laravel Mix to compile and optimize assets, and to provide a simple interface for doing so.
---

# Compiling Assets

These are the primary projects that make up the Sage workflow:

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix/tree/v5.0.4/docs)

Mix is a wrapper for [Webpack](https://webpack.github.io/), and handles compiling stylesheets, checking for JavaScript errors, copying images and fonts, and concatenating and minifying files.
It also provides a fluent API that some find to be easier to interact with than Webpack itself.

In previous versions of Sage, we used Webpack directly, or Grunt/Gulp to accomplish these tasks.

[npm](https://www.npmjs.com/)

npm is a JavaScript package manager. 
Sage uses npm to pull in Bootstrap (or your chosen CSS framework) and any other JavaScript packages you want to use as dependencies.

In previous versions of Sage, we used Bower for a similar purpose.

[Browsersync](http://www.browsersync.io)

Browsersync keeps multiple browsers and devices synchronized while developing, along with injecting updated CSS and JS.
It's run for you by Mix--you shouldn't need to manipulate BrowserSync directly.

<div class="cta-product"><a href="https://roots.io/books/theme-development-with-sage/" class="row text-dark"><div class="book-cover col-sm-6"><img src="https://cdn.roots.io/app/uploads/theme-development-with-sage-third-edition-cover.png" alt="Sage book cover"></div><div class="col-sm-6"><h4 class="mt-sm-3"><span class="badge bg-white mb-2">Get the book</span> <br> Theme Development with Sage</h4>A step-by-step guide to setting up a custom Sage starter theme. Build well organized &amp; easily maintained WordPress themes using a modern web development workflow.<button class="btn btn-primary">Buy the Sage book</button></div></a></div>

## Available build commands

Run these script commands within your theme directory:

- `yarn build` — Compile and optimize the files in your assets directory
- `yarn build:production` — Compile assets for production
- `yarn start` — Compile assets when file changes are made, start Browersync session

::: warning Note
If you are using the Bootstrap navbar and run into issues with missing styles after a production build, see [roots/sage#2017](https://github.com/roots/sage/issues/2017) and the [recommended fix](https://github.com/roots/sage/issues/2017#issuecomment-361054297).
:::

## Theme assets

What files are compiled and how is controlled from the `webpack.mix.js` file in the root of the theme.
In-depth discussion of how to configure Mix can be found in the [Laravel Mix documentation](https://github.com/JeffreyWay/laravel-mix/tree/v5.0.4/docs), but Sage ships with a configuration that should provide a sufficient starting point--and depending on your use case, may not need any additional configuration.

The configuration will generate the following files:

- `app.css` - The primary stylesheet for the theme.
- `editor.css` - Styles used by the editor when creating/editing posts.
- `app.js` - The primary JavaScript file for the theme.
- `customizer.js` - JavaScript for the WordPress Customizer.
- `editor.js` - JavaScript for the admin editor, i.e. custom Gutenberg blocks.

It will also copy any files in the `images` or `fonts` directories under `/resources/assets/` into the `dist` directory with the other compiled files, but does not optimize or compress them.

### Adding new styles or scripts

1) Create the source file under `/resources/assets/scripts/` or `/resources/assets/styles/`, i.e. `/resources/assets/scripts/example.js`.
2) Add the new file to `webpack.mix.js`, i.e.:
    ```javascript
    ...
    mix
     .js('resources/assets/scripts/app.js', 'scripts')
     .js('resources/assets/scripts/customizer.js', 'scripts')
      // Our new file
     .js('resources/assets/scripts/example.js', 'scripts')
     .blocks('resources/assets/scripts/editor.js', 'scripts')
     .extract();
    ...
    ```
   This will generate `/dist/scripts/example.js` when the site is built.
3) Add the new file to `/app/setup.php`:
    ```php
    add_action('wp_enqueue_scripts', function () {
        wp_enqueue_script('sage/vendor.js', asset('scripts/vendor.js')->uri(), ['jquery'], null, true);
        wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), ['sage/vendor.js', 'jquery'], null, true);
        // Our new file
        wp_enqueue_script('sage/example.js', asset('scripts/example.js')->uri(), [], null, true);
        ...
    }, 100);
    ```

Adding a stylesheet is the same, except you would use one of the [stylesheet commands](https://github.com/JeffreyWay/laravel-mix/blob/v5.0.4/docs/css-preprocessors.md) in Mix, and `wp_enqueue_style()` in `setup.php`.

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

## PurgeCSS

[PurgeCSS](https://purgecss.com/) is a very useful tool that can help you reduce the size of your production CSS.
Its documentation provides a more in-depth explanation of how it works, but in short it looks through your CSS at build time and removes any selectors
 (and their associated rules)
 that it can't find in your HTML.

Out of the box, Sage is configured to apply PurgeCSS to *production* builds.
If you find that CSS is missing when you run `yarn build:production` but not when you run `yarn build` or `yarn start`, PurgeCSS maybe the culprit.
By default, it's configured to search your whole theme for files that might contain selectors, but you can modify that by customizing the paths in the array passed to the `content` configuration option.

:::tip
The documentation for Tailwind
(an unrelated but useful CSS library)
has a good article on ["Writing purgeable HTML"](https://tailwindcss.com/docs/controlling-file-size#writing-purgeable-html) for PurgeCSS that's applicable regardless of whether you're using Tailwind or not.
:::

To modify your PurgeCSS settings, look for this section of your `webpack.mix.js`:

```js
.purgeCss({
    extend: { content: [path.join(__dirname, 'index.php')] },
    whitelist: require('purgecss-with-wordpress').whitelist,
    whitelistPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})
```

If don't want to use PurgeCSS at all, just remove this section!

## 3rd party packages

Example of how to add 3rd party packages--and have them included in the theme:

1. From the theme directory, run:

    ```bash
    # @ themes/your-theme-name/
    $ yarn add <package name>

    # Install Slick carousel:
    $ yarn add slick-carousel
    ```

2. Open up `app.js` and `app.scss` to add the entry points for the package. 
If you're using the Slick Carousel then your theme JS and CSS would look like:

    ```js
    // resources/assets/scripts/app.js
    import 'slick-carousel/slick/slick.min';
    ```

    ```scss
    // resources/assets/styles/app.scss
    @import "~slick-carousel/slick/slick.scss";
    @import "~slick-carousel/slick/slick-theme.scss";
    ```

3. Slick Carousel also has some image assets referenced in the scss.
Mix can automatically copy those assets, but you need to remove the following line from your `webpack.mix.js`:

```js
.options({ processCssUrls: false })
```

:::tip
If you want to know what that command does, read the Mix documentation on CSS [url rewriting](https://github.com/JeffreyWay/laravel-mix/blob/v5.0.4/docs/css-preprocessors.md#css-url-rewriting)
:::

4. Run `yarn build` (or `yarn build:production`) and all of your assets will be compiled into `dist`.

### Additional examples

- [Animate.css](https://roots.io/guides/how-to-use-animate-css-in-sage/)
- [Hamburgers](https://roots.io/guides/how-to-use-hamburgers-in-sage/)
- [js-cookie](https://discourse.roots.io/t/how-to-js-cookie-and-sage/11662)
