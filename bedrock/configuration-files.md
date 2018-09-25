---
ID: 6141
post_title: Configuration Files
author: Ben Word
post_date: 2015-09-03 17:16:50
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/configuration-files/
published: true
---
The root `web/wp-config.php` is required by WordPress and is only used to load the other main configs. Nothing else should be added to it.

The file to modify for configuration options is `config/application.php`. This is the file that contains what `wp-config.php` usually would.

These base configuration options should be production-standard _SAFE SETTINGS_ and will be used in all environments except where specifically overridden.

For environment-specific configuration option **overrides**:

  * Use an existing environment config in `config/environments` or create a new one. Bedrock will `require` any file in the `config/environments` directory with a filename matching the `WP_ENV` environment variable. This environment variable can be set in a few ways:
	* in the `.env` file as described in our [installation docs](https://roots.io/bedrock/docs/installing-bedrock/#installation)
	* via [Trellis config](https://roots.io/trellis/docs/wordpress-sites/) if you're using Trellis
	* or as a last resort, hardcoding it in `config/application.php`


  * Bedrock comes with `development.php` and `staging.php` configs included. If you create an additional environment, configure it with a matching php file in `config/environments`.

 * The [`development.php` file](https://github.com/roots/bedrock/blob/master/config/environments/development.php) configures `'WP_DEBUG_DISPLAY', true`, so `WP_ENV=development`, wordpress will display php errors in the browser.

NOTE: The [previous Bedrock approach](https://github.com/roots/bedrock/commit/4daf7986e34a4e6576a3dcff6d9ae86673f4c0a7) was to require environment configs _before_ the main `application`, and you can read about why we changed it and how it works [here](https://github.com/roots/wp-config/blob/master/docs/why.md) or follow the discussion [here](https://github.com/roots/bedrock/pull/380). 
Briefly, `Config::define` is a static method that overrides the _Application (WP) Options_ with _Environment-Specific Options_ where they are defined, defaulting to the (SAFE, production-standard) Application Options set in `config/application.php`, and **now gives an error** when you try to re-define a php GLOBAL, instead of just silently not doing it.