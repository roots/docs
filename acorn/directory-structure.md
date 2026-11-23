---
date_modified: 2026-11-23 12:00
date_published: 2021-11-19 11:58
description: Acorn works with zero configuration by default. Optionally publish config files to use Laravel's familiar directory structure in WordPress.
title: Acorn Application Directory Structure
authors:
  - alwaysblank
  - ben
  - rafaucau
  - QWp6t
---

# Acorn Application Directory Structure

## Zero-config setup

Out of the box, Acorn will [use its own configs](https://github.com/roots/acorn/tree/main/config), and it will keep the application cache and logs in the standard WordPress cache directory:

```plaintext
[wp-content]/          # wp-content directory ("app" if you're using Bedrock)
├── cache/
│   └── /acorn/        # Private application storage ("storage" directory)
│       ├── app/       # Files generated or used by the application
│       ├── framework/ # Files generated or used by Acorn (never edit)
│       └── logs/      # Application logs
└── themes/
    └── [theme]/       # Theme directory (e.g., "sage")
        ├── app/       # Core application code
        ├── public/    # Built application assets (never edit)
        ├── resources/ # Uncompiled source assets and views
        │   └── views/ # Application views to be compiled by Blade
        └── vendor/    # Composer packages (never edit)
```

## Traditional setup

Acorn also supports a more traditional Laravel-esque structure. We recommend this approach if you are adding Acorn/Laravel packages and want to have more control over your app.

::: tip
If you've installed Acorn from your Bedrock project root, Acorn's `config/` directory will conflict with Bedrock's. We recommend using [Radicle](/radicle/) to avoid this.
<br><br>
There are no conflicts with the `config/` directory if you've installed Acorn from your theme.
:::

```plaintext
root/              # Base directory for your Acorn application (e.g., "sage")
├── app/           # Core application code
├── config/        # Application configuration
├── public/        # Built application assets (never edit)
├── resources/     # Uncompiled source assets and views
│   └── views/     # Application views to be compiled by Blade
├── storage/       # Private application storage
│   ├── app/       # Files generated or used by the application
│   ├── framework/ # Files generated or used by Acorn (never edit)
│   └── logs/      # Application logs
└── vendor/        # Composer packages (never edit)
```

You can manually create a `config/` directory, or you can automatically set up the traditional structure with WP-CLI (see below).

If you have a `config/` directory, you can drop your desired config files in there. any that are missing (such as `app.php`) will just be pulled from [Acorn's config directory](https://github.com/roots/acorn/tree/main/config).


### WP-CLI commands for setting up the traditional structure

You can automatically set up the traditional structure via WP-CLI by creating the `storage/` directory:

```shell
$ wp acorn acorn:init storage
```

Then publish Acorn's config files:

```shell
$ wp acorn vendor:publish --tag=acorn
```

Alternatively, you can choose to only copy the config files.

```shell
$ wp acorn vendor:publish --tag=acorn
```

## Advanced directory modifications

You can change the path of any Acorn directory with an environment variable or a PHP constant of the same name. Environment variables take precedence over constants.

| Name | Directory |
| --- | --- |
| `ACORN_APP_PATH` | Application code (`app/`) |
| `ACORN_CONFIG_PATH` | Config files (`config/`) |
| `ACORN_STORAGE_PATH` | Private application storage (`storage/`) |
| `ACORN_RESOURCES_PATH` | Resources and views (`resources/`) |
| `ACORN_PUBLIC_PATH` | Built assets (`public/`) |
| `ACORN_LANG_PATH` | Translation files (`lang/`) |
| `ACORN_DATABASE_PATH` | Migrations, seeders and factories (`database/`) |

Environment variable values can be absolute, or relative to the Acorn base directory (your theme directory with Sage, the project root with Radicle). Constant values are used as is, so use absolute paths.

The base directory itself can be set with the `APP_BASE_PATH` environment variable or the `ACORN_BASEPATH` constant.

For example, to keep Acorn's storage outside of the web root in a [Bedrock](/bedrock/) project, add the following to `config/application.php`:

```php
Config::define('ACORN_STORAGE_PATH', $root_dir . '/storage');
```

Add it before the `Config::apply()` call. Create the directory ahead of time, and make sure it's writable by the web server user and by the user that runs `wp acorn` commands. See [Hosting Acorn](/acorn/docs/hosting/) for how to choose a writable path on managed WordPress hosts.

### How Acorn finds the storage directory

Acorn uses the first of these that applies:

1. A `storage` path passed to `Application::configure()->withPaths()`
2. The `ACORN_STORAGE_PATH` environment variable
3. The `ACORN_STORAGE_PATH` constant
4. An existing `storage/` directory in the Acorn base directory or the active theme
5. `[wp-content]/cache/acorn/` (zero-config setup), which Acorn creates if it doesn't exist

### Moving individual caches

Everything Acorn writes lives under the storage directory by default. You can move individual files and directories with these environment variables:

| Environment variable | Default |
| --- | --- |
| `VIEW_COMPILED_PATH` | `[storage]/framework/views` |
| `APP_PACKAGES_CACHE` | `[storage]/framework/cache/packages.php` |
| `APP_SERVICES_CACHE` | `[storage]/framework/cache/services.php` |
| `APP_CONFIG_CACHE` | `[storage]/framework/cache/config.php` |
| `APP_ROUTES_CACHE` | `[storage]/framework/cache/routes-v7.php` |
| `APP_EVENTS_CACHE` | `[storage]/framework/cache/events.php` |

The `APP_*_CACHE` values can be absolute, or relative to the Acorn base directory. `VIEW_COMPILED_PATH` is read by Acorn's default `config/view.php`; if you've published your own `config/view.php`, set the `compiled` option there instead.
