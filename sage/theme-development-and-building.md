---
ID: 5322
post_title: Theme Development and Building
author: Ben Word
post_date: 2015-09-01 18:19:21
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-development-and-building/
published: true
---
<p class="lead">These are the primary projects that make up the Sage workflow:</p>

<ul class="lead">
<li><h4><a href="https://webpack.github.io/">Webpack</a></h4><p><small>is used as a build tool for compiling stylesheets, checking for JavaScript errors, optimizing images, and concatenating and minifying files. In previous versions of the theme we used Grunt and Gulp as our build tools.</small></p></li>
<li><h4><a href="https://www.npmjs.com/">npm</a></h4><p><small>npm is a front-end package manager. Sage uses npm to pull in Bootstrap and jQuery as dependencies.</small></p></li>
<li><h4><a href="http://www.browsersync.io">BrowserSync</a> with Webpack Hot Module Replacement</h4><p><small>BrowserSync with WHR keeps multiple browsers and devices synchronized while developing, along with injecting updated CSS and JS. In previous versions of the theme we used LiveReload for injecting assets.</small></p></li>
</ul>

<div class="cta-product cta-product-sage well well-sage module"><a href="https://roots.io/books/theme-development-with-sage/" class="media"><div class="media-left"><img class="media-object" src="/app/uploads/theme-development-with-sage-cover-800x1035.png" alt="Sage book cover"></div><div class="media-body"><h4><span class="badge bg-white text-sage">Get the book</span> <br> <span class="text-sage">Theme Development with Sage</span></h4><p class="lead">A step-by-step guide to setting up a custom Sage starter theme.</p><p class="visible-md visible-lg">Build well organized &amp; easily maintained WordPress themes using a modern web development workflow.</p><p class="text-right"><button class="btn btn-primary">Buy</button></p></div></a></div>

## Available build commands

Run these script commands within your theme directory:

* `yarn run build` — Compile and optimize the files in your assets directory
* `yarn run build:production` — Compile assets for production
* `yarn run start` — Compile assets when file changes are made, start Browersync session

## Theme assets

The `config.json` file in the `assets` directory controls the different theme assets that get built. By default, Sage builds two JS files and one CSS file:

* `assets/stylesheets/main.scss` — primary theme CSS, barebones partials are imported to help get your styling started
* `assets/scripts/main.js` — primary theme JS
* `assets/scripts/customizer.js` — theme customizer JS, used only in the customizer

Look at `entry` in `assets/config.json` to see how they're built:

```json
"entry": {
  "main": [
    "./scripts/main.js",
    "./styles/main.scss"
  ],
  "customizer": [
    "./scripts/customizer.js"
  ]
}
```

To create additional CSS or JS files, you'll need to:

1. Create the files within the `assets/scripts/` or `assets/styles/` directories

2. Open `assets/config.json` and add the new files to `entry` in a new array. In the example below we've added `scripts/checkout.js`:

    ```json
    "entry": {
      "main": [
        "./scripts/main.js",
        "./styles/main.scss"
      ],
      "customizer": [
        "./scripts/customizer.js"
      ],
      "checkout": [
        "./scripts/checkout.js"
      ]
    }
    ```

3. Enqueue the new file in `src/setup.php` In the example below we've added a conditional to only enqueue `scripts/checkout.js` on the checkout page:

    ```php
    /**
     * Theme assets
     */
    add_action('wp_enqueue_scripts', function () {
        wp_enqueue_style('sage/main.css', asset_path('styles/main.css'), false, null);
        wp_enqueue_script('sage/main.js', asset_path('scripts/main.js'), ['jquery'], null, true);

        if (is_page('checkout')) {
            wp_enqueue_script('sage/checkout.js', asset_path('scripts/checkout.js'), ['jquery'], null, true);
        }
    }, 100);
    ```

4. From the theme directory, run the build script:

    ```sh
    # web/app/themes/your-theme-name/
    $ yarn run build
    ```

### Images in template files

Use the `@asset` directive to call images from template files:

```php
<img src="@asset('images/example.jpg')">
```

## 3rd party packages

Example of how to add 3rd party packages* and have them included in the theme:

1. From the theme directory, run:

    ```shell
    # @ themes/your-theme-name/
    $ yarn add <package name>

    # Install Slick carousel:
    $ yarn add slick-carousel
    ```

2. Open up `main.js` and `main.css` to add the entry points for the package. If you're using the Slick Carousel then your theme JS and CSS would look like:

    ```js
    /* sage/assets/scripts/main.js */
    import $ from 'jquery';
    import Router from './util/router';

    // Import Slick
    import 'slick-carousel/slick/slick.min.js';
    ```

    ```scss
    /* sage/assets/styles/main.scss */
    @import "common/variables";

    // Import Slick from node_modules
    @import "~slick-carousel/slick/slick.scss";
    @import "~slick-carousel/slick/slick-theme.scss";
    ```

3. After running `yarn run build` from the theme directory, your package will be built with your theme assets. The `dist` folder will contain a `_/node_modules/` directory that has any assets referenced from your packages. The compiled CSS and JS will reference these assets without having to manually edit paths. ✨

<small>&lowast;Note: Wordpress Plugins are installed elsewhere or with Composer when using [Bedrock](/bedrock/docs/composer)</small>

### Additional examples

#### Font Awesome

```sh
# @ themes/your-theme-name/
$ yarn add font-awesome
```

```scss
/* sage/assets/styles/main.scss */
@import "common/variables";

// Import Font Awesome from node_modules
@import "~font-awesome/scss/font-awesome.scss";
```
