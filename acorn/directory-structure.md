---
description: Acorn can either be setup with zero-config or with the traditional Laravel-style structure. Use `wp acorn vendor:publish` to set up the traditional structure.
---

# Directory Structure

The directory structure is quite flexible. This document will cover two typical scenarios and guidance on how to change them.

[[toc]]

## Zero-Config

Out of the box, Acorn will use its own configs, and it will keep the application cache and logs in the standard WordPress cache directory.

```bash
[wp-content]/             # → wp-content directory (or "app" if you're using Bedrock)
├── cache/
│   └── /acorn/           # → Private application storage ("storage" directory)
│       ├── app/          # → Files generated or used by the application
│       ├── framework/    # → Files generated or used by Acorn (never edit)
│       └── logs/         # → Application logs
└── themes/
    └── [theme]/          # → Theme directory (e.g., "sage")
        ├── app/          # → Core application code
        ├── public/       # → Built application assets (never edit)
        ├── resources/    # → Uncompiled source assets and views
        │   └── views/    # → Application views to be compiled by Blade
        └── vendor/       # → Composer packages (never edit)
```

## Traditional

Acorn also supports a more traditional Laravel-esque structure.

```bash
root/                     # → Base directory for your Acorn application (e.g., "sage")
├── app/                  # → Core application code
├── config/               # → Application configuration
├── public/               # → Built application assets (never edit)
├── resources/            # → Uncompiled source assets and views
│   └── views/            # → Application views to be compiled by Blade
├── storage/              # → Private application storage
│   ├── app/              # → Files generated or used by the application
│   ├── framework/        # → Files generated or used by Acorn (never edit)
│   └── logs/             # → Application logs
└── vendor/               # → Composer packages (never edit)
```

### WP-CLI Commands

You can automatically set up the traditional structure via wp-cli.

```bash
wp acorn vendor:publish --tag=acorn:init
```

Alternatively, you can choose to only copy the config files.

```bash
wp acorn vendor:publish --tag=acorn:config
```

## Advanced

You can modify the path for any Acorn directory by using the `acorn/paths.{$path}` filters, where `$path` is one of the following:

- `base`
- `app`
- `config`
- `storage`
- `resources`
- `public`

The base path may also be set by defining the `ACORN_BASEPATH` constant. This is useful for setting it when filters are unavailable, such as in wp-config.php.
