# Compiling Assets

These are the primary projects that make up the Sage workflow:

[Webpack](https://webpack.github.io/)

Webpack is used as a build tool for compiling stylesheets, checking for JavaScript errors, optimizing images, and concatenating and minifying files. In previous versions of the theme we used Grunt and Gulp as our build tools.

[npm](https://www.npmjs.com/)

npm is a front-end package manager. Sage uses npm to pull in Bootstrap (or your chosen CSS framework) as dependencies. In previous versions of the theme we used Bower as our front-end package manager.

[Browsersync](http://www.browsersync.io)

Browsersync keeps multiple browsers and devices synchronized while developing, along with injecting updated CSS and JS.

<div class="cta-product"><a href="https://roots.io/books/theme-development-with-sage/" class="row text-dark"><div class="book-cover col-sm-6"><img src="http://cdn.roots.io/app/uploads/theme-development-with-sage-third-edition-cover.png" alt="Sage book cover"></div><div class="col-sm-6"><h4 class="mt-sm-3"><span class="badge bg-white mb-2">Get the book</span> <br> Theme Development with Sage</h4>A step-by-step guide to setting up a custom Sage starter theme. Build well organized &amp; easily maintained WordPress themes using a modern web development workflow.<button class="btn btn-primary">Buy the Sage book</button></div></a></div>

## Available build commands

Run these script commands within your theme directory:

- `yarn build` — Compile and optimize the files in your assets directory
- `yarn build:production` — Compile assets for production
- `yarn start` — Compile assets when file changes are made, start Browersync session

::: warning Note
:warning: If you are using the Bootstrap navbar and run into issues with missing styles after a production build, see [roots/sage#2017](https://github.com/roots/sage/issues/2017) and the [recommended fix](https://github.com/roots/sage/issues/2017#issuecomment-361054297).
:::

### Asset generation with `yarn build` vs. `yarn start`

When running `yarn start`, Sage uses [webpack-dev-middleware](https://webpack.github.io/docs/webpack-dev-middleware.html) to generate and insert assets (i.e. CSS, JS) directly into the DOM from memory, without first writing them to disk. The benefit of this technique is that changes you make are reflected very quicky in your BrowserSync session, and they are reflected *without reloading the page- (especially useful when styling things like form submission response templates). The unfortunate downside is that because these files are not written to disk, browsers will return a 404 error for your main stylesheet. Styles will still load: you'll just see an error in your browser console. This is a [known issue](https://github.com/roots/sage/issues/1989) that does not generally affect development. Amelioration of this downside is on the roadmap for future version of Sage.

## Theme assets

The `config.json` file in the `assets` directory controls the different theme assets that get built. By default, Sage builds two JS files and one CSS file:

- `assets/stylesheets/main.scss` — primary theme CSS, barebones partials are imported to help get your styling started
- `assets/scripts/main.js` — primary theme JS
- `assets/scripts/customizer.js` — theme customizer JS, used only in the customizer

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

3. Enqueue the new file in `app/setup.php` In the example below we've added a conditional to only enqueue `scripts/checkout.js` on the checkout page:

    ```php
    /**
     - Theme assets
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

    ```bash
    # web/app/themes/your-theme-name/
    $ yarn build
    ```

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

## JavaScript DOM-based routing

Sage provides DOM-based routing for your JavaScript, enabling you to run specific scripts on specific pages. Routes (and the scripts they include) run when the route name matches a class on the `body` element of the current page.

### How it works

Routes are configured in `assets/scripts/main.js`:

```js
// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import aboutUs from './routes/about';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Home page
  home,
  // About Us page, note the change from about-us to aboutUs.
  aboutUs
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());
```

Out of the box, it comes with three routes:

- common, which fires on all pages
- home, which fires on the home page (when the body has the class `home`)
- aboutUs, which would fire on a page named "About Us" (when the page has the body class `about-us`)

::: tip Note
Note the syntax change from `about-us` (the HTML body class) to `aboutUs` (the JS route name)
:::

::: tip Note
Note also that the route's file name (`about`) doesn't have to match the body class. What's important is that the name used for the import that is registered with the router (`aboutUs`) matches.
:::

Every route is defined in its own file in `assets/scripts/routes/`.

Each route includes two methods: `init()` and `finalize()`:

```js
export default {
  init() {
    // scripts here run on the DOM load event
  },
  finalize() {
    // scripts here fire after init() runs
  }
};
```

The order of execution for routes is:

1.  The `init` scripts in the `common` route (after the browser's DOM load event)
2.  For each route matching the loaded page (e.g., `home`), the `init` scripts and then the `finalize` scripts
3.  The `finalize` scripts in the `common` route

More than one page-specific route might can a given page. For example, if you register both a route matching all single posts (`singlePost`) and a route for single posts with the video post format (`singleFormatVideo`), both would fire when a video post is viewed.

To add scripts to an existing route, add the desired JavaScript within the route's `init()` or `finalize()` methods. For example, the `init()` method on the `common` route might contain the code needed to toggle your site's menu when its icon is clicked.

Because all routes run after the browser has fired the DOM load event, you do not need to wrap the code in your routes within an event handler that watches for that event (e.g., `jQuery(document).ready()`).

### Adding a new route

As an example, let's add a route that runs when a page with the default template is viewed. The class for this page is `page-template-default`, so our route will be named `pageTemplateDefault`.

1.  Create the file `assets/scripts/routes/pageTemplateDefault.js` with the following contents:

    ```js
    export default {
      init() {
        // scripts here run on the DOM load event
        console.log('This is a page with the default template.');
      },
      finalize() {
        // scripts here fire after init() runs
      }
    };
    ```

2.  Import your new route in `main.js`:

    ```js
    // import local dependencies
    import Router from './util/Router';
    import common from './routes/common';
    import home from './routes/home';
    import aboutUs from './routes/about';
    import pageTemplateDefault from './routes/pageTemplateDefault';
    ```

3.  Also in `main.js`, register your route:

    ```js
    /** Populate Router instance with DOM routes */
    const routes = new Router({
      // All pages
      common,
      // Home page
      home,
      // About Us page, note the change from about-us to aboutUs.
      aboutUs,
      // default page template
      pageTemplateDefault
    });
    ```

After rebuilding your site's assets (`yarn build`), when you load a page with the default template, your new route should run and you should see 'This is a page with the default template.' printed in your browser's console.

### Listening for route events

Every time Sage fires a route, it dispatches a `routed` event. You can react to routes by listening for this event.

```js
document.addEventListener('routed', e => {
  // the name of the route that fired (e.g., 'home')
  const routeName = e.detail.route;
  // the event that fired on the route (e.g., 'init')
  const routeEvent = e.detail.fn;

  console.log(routeName, routeEvent);
});
```

IE <= 11 does not support this. [See the note under Sage Compatibility](compatibility.md) for more information.

## 3rd party packages

Example of how to add 3rd party packages- and have them included in the theme:

1. From the theme directory, run:

    ```bash
    # @ themes/your-theme-name/
    $ yarn add <package name>

    # Install Slick carousel:
    $ yarn add slick-carousel
    ```

2. Open up `main.js` and `main.scss` to add the entry points for the package. If you're using the Slick Carousel then your theme JS and CSS would look like:

    ```js
    /** import external dependencies */
    import 'jquery';
    import 'bootstrap/dist/js/bootstrap';

    // Import Slick
    import 'slick-carousel/slick/slick.min';
    ```

    ```scss
    /* sage/assets/styles/main.scss */
    @import "common/variables";

    // Import npm dependencies
    @import "~bootstrap/scss/bootstrap";
    @import "~font-awesome/scss/font-awesome";
    // Import Slick
    @import "~slick-carousel/slick/slick.scss";
    @import "~slick-carousel/slick/slick-theme.scss";
    ```

3. After running `yarn build` from the theme directory, your package will be built with your theme assets. The `dist` folder will contain a `_/node_modules/` directory that has any assets referenced from your packages. The compiled CSS and JS will reference these assets without having to manually edit paths. ✨

4. Running `yarn build:production` will fail if 3rd party package's relative paths are not configured before imported. For example, to load Slick Carousel's paths add the following line in your common/_variables.scss file:

    ```scss
    /* sage/assets/styles/common/_variables.scss */
    // Slick Carousel font path
    $slick-font-path: "~slick-carousel/slick/fonts/";

    // Slick Carousel ajax-loader.gif path
    $slick-loader-path: "~slick-carousel/slick/";
    ```

### Additional examples

- [Animate.css](https://roots.io/guides/how-to-use-animate-css-in-sage/)
- [Hamburgers](https://roots.io/guides/how-to-use-hamburgers-in-sage/)
- [js-cookie](https://discourse.roots.io/t/how-to-js-cookie-and-sage/11662)
