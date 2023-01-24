---
description: Acorn by default has a zero-config setup. You can also use the traditional Laravel-style structure which will publish a `config/` directory.
---

# Directory Structure

## Zero-config setup

Out of the box, Acorn will [use its own configs](https://github.com/roots/acorn/tree/main/config), and it will keep the application cache and logs in the standard WordPress cache directory:

```bash
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
If you've installed Acorn from your Bedrock project root, Acorn's `config/` directory will conflict with Bedrock's. We recommend using [Radicle](/products/radicle/) to avoid this.
<br><br>
There are no conflicts with the `config/` directory if you've installed Acorn from your theme.
:::

```bash
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

You can automatically set up the traditional structure via WP-CLI:

```bash
wp acorn acorn:init storage && wp acorn vendor:publish --tag=acorn
```

Alternatively, you can choose to only copy the config files.

```bash
wp acorn vendor:publish --tag=acorn
```

## Advanced directory modifications

You can modify the path for any Acorn directory by using the `acorn/paths.{$path}` filters, where `$path` is one of the following:

- `base`
- `app`
- `config`
- `storage`
- `resources`
- `public`

The base path may also be set by defining the `ACORN_BASEPATH` constant. This is useful for setting it when filters are unavailable, such as in wp-config.php.
