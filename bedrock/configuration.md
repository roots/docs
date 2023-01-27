---
description: Bedrock has a main configuration file that contains what wp-config.php usually world. There's also environment specific configuration files.
authors:
  - ben
  - Log1x
  - mZoo
  - swalkinshaw
---

# Configuration

The file to modify for configuration options is `config/application.php`. This is the file that contains what `wp-config.php` usually would.

The root `web/wp-config.php` is required by WordPress and is only used to load the other main configs. Nothing else should be added to it.

Bedrock's base configuration options are production-standard safe settings and used in all environments except where specifically overridden. To override configuration settings based on environments:

- Use an existing environment config in `config/environments` or create a new one. Bedrock will `require` any file in the `config/environments` directory with a filename matching the `WP_ENV` environment variable. This environment variable can be set in a few ways:
  - in the `.env` file as described in our [installation docs](installation.md)
  - via [Trellis config](/trellis/docs/wordpress-sites/) if you're using Trellis
  - or as a last resort, hardcoding it in `config/application.php`

- Bedrock comes with `development.php` and `staging.php` configs included. If you create an additional environment, configure it with a matching PHP file in `config/environments`.

- The [`development.php` file](https://github.com/roots/bedrock/blob/master/config/environments/development.php) sets `WP_DEBUG_DISPLAY` to `true`, so WordPress will display PHP errors in the browser when your `WP_ENV` is `development`.

Bedrock 1.9.0 (2018-09-17) introduced [`roots/wp-config`](https://github.com/roots/wp-config/blob/master/docs/why.md) ([discussion](https://github.com/roots/bedrock/pull/380)).

`Config::define` is a static method that overrides the application options (WP) with environment specific options where they are defined, defaulting to the application options set in `config/application.php`.
