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
docs_project:
  - 'a:1:{i:0;s:2:"17";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
<p class="lead">These are the primary projects that make up the Sage workflow:</p>

<ul class="lead">
<li><h4><a href="http://gulpjs.com">gulp</a></h4><p><small>gulp is a streaming build tool. In previous versions of the theme we used Grunt for our build tool.</small></p></li>
<li><h4><a href="http://bower.io/">Bower</a></h4><p><small>Bower is a front-end package manager. Out of the box we pull in Bootstrap and Modernizr.</small></p></li>
<li><h4><a href="http://www.browsersync.io">BrowserSync</a></h4><p><small>BrowserSync keeps multiple browsers and devices synchronized while developing, along with injecting updated CSS and JS. In previous versions of the theme we used LiveReload for injecting assets.</small></p></li>
<li><h4><a href="https://github.com/austinpray/asset-builder">asset-builder</a></h4><p><small>asset-builder is the manifest file format that's used to collect all assets and put them in order.</small></p></li>
<li><h4><a href="https://github.com/taptapship/wiredep">wiredep</a></h4><p><small>wiredep is used to inject Sass and Less dependencies from Bower into the main theme stylesheet.</small></p></li>
</ul>

<div class="cta-product cta-product-sage well well-sage module"><a href="https://roots.io/books/theme-development-with-sage/" class="media"><div class="media-left"><img class="media-object" src="/app/uploads/theme-development-with-sage-cover-800x1035.png" alt="Sage book cover"></div><div class="media-body"><h4><span class="badge bg-white text-sage">Get the book</span> <br> <span class="text-sage">Theme Development with Sage</span></h4><p class="lead">A step-by-step guide to setting up a custom Sage starter theme.</p><p class="visible-md visible-lg">Build well organized &amp; easily maintained WordPress themes using a modern web development workflow.</p><p class="text-right"><button class="btn btn-primary">Buy</button></p></div></a></div>

## Installing project dependencies

Your development machine must meet the following two requirements to get started:

* Node >= 0.12.x
* npm >=2.1.5

After installing [Node.js](http://nodejs.org/download/), we recommend that you update to the latest version of npm:

```
npm install -g npm@latest
```

From the command line:

* Install gulp and Bower globally with `npm install -g gulp bower`
* Navigate to the theme directory, then run `npm install`
* Run `bower install`

You now have all the necessary dependencies to run the build process.

## Available gulp commands

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made
* `gulp --production` — Compile assets for production (no source maps)

To use BrowserSync during `gulp watch` you need to update `devUrl` at the bottom of `assets/manifest.json` to reflect your local development hostname.

## Adding front-end packages with Bower

Install Bower packages with `bower install --save package-name`. Using the `--save` flag will add the package into your project's `bower.json` dependencies. asset-builder uses [main-bower-files](https://github.com/ck86/main-bower-files) to read your `bower.json` and automatically collect CSS and JS from files defined in the `main` property from your included Bower packages. You can override the behavior if you add an overrides property to your own `bower.json`. You can see overrides in action by opening `bower.json`.

## The asset pipeline

The `manifest.json` file in the `assets/` directory is used by asset-builder to build out the CSS and JS files that are used by the theme.

<div class="well well-sage module">
<p>The <a href="https://github.com/austinpray/asset-builder#help">asset-builder documentation</a> has examples, troubleshooting tips, and the manifest file specification.</p>
</div>

### Theme stylesheets

Sage includes one primary stylesheet: `dist/styles/main.css`. `main.css` is built from `assets/styles/main.scss`. 

In `main.scss`:

*  wiredep is used to inject Sass dependencies from Bower
*  Barebones partials are imported to help get your styling started

Any `main` CSS dependencies from Bower packages are also included in the primary stylesheet. 

The editor stylesheet, which is used by TinyMCE in the WordPress visual editor, is generated from your primary theme stylesheet.

<div class="well well-sage module">
<p><b>Tip:</b> You can use the <code>manifest.json</code> file to include CSS from WordPress plugins in your theme's primary stylesheet by defining the path to the vendor CSS file with the <code>vendor</code> property. See the <a href="https://github.com/austinpray/asset-builder#help">asset-builder documentation</a> for examples, troubleshooting tips, and the manifest file specification.</p>
</div>

### Theme scripts

Sage includes one primary JavaScript file: `dist/scripts/main.js`. `main.js` is built from `assets/scripts/main.js`. 

Any `main` JS dependencies from Bower packages are also included in the primary JavaScript file. 

Sage also loads jQuery and Modernizr before the primary JavaScript file.

<div class="well well-sage module">
<p><b>Tip:</b> You can use the <code>manifest.json</code> file to include JS from WordPress plugins in your theme's primary JavaScript file by defining the path to the vendor JS file with the <code>vendor</code> property. See the <a href="https://github.com/austinpray/asset-builder#help">asset-builder documentation</a> for examples, troubleshooting tips, and the manifest file specification.</p>
</div>