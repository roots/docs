---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Service Provider Configuration
authors:
  - ben
---

# Service Provider Configuration

Radicle comes with three service providers out of the box:

* `AssetsServiceProvider` — Used for WordPress assets (CSS and JS) registration 
* `PostTypesServiceProvider` — Used for post type and taxonomy registration from a cnfig
* `ThemeServiceProvider` — Used for registering [theme supports](https://developer.wordpress.org/reference/functions/add_theme_support/) and sidebars from a config

These service providers are loaded from the `composer.json` file:

```json
...
    "extra": {
        "acorn": {
            "providers": [
                "App\\Providers\\AssetsServiceProvider",
                "App\\Providers\\ThemeServiceProvider",
                "App\\Providers\\PostTypesServiceProvider"
            ]
        },
...
```

You can add/modify/remove these service providers. If adding or removing providers, we recommend changing the `composer.json` file.

It is also possible to use the `config/app.php` file and modify the `providers` array to manage autoloaded service providers.
