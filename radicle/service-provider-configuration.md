---
date_modified: 2023-06-04 19:00
date_published: 2023-03-28 07:00
title: Service Provider Configuration
authors:
  - ben
---

# Service Provider Configuration

Radicle uses service providers for configuring and bootstraping various services.

::: warning
**Unfamiliar with service providers?** We suggest [reading the Laravel documentation on service providers](https://laravel.com/docs/10.x/providers)
:::

Radicle comes with the following service providers out of the box:

* `AssetsServiceProvider` — Used for WordPress assets (CSS and JS) registration 
* `BlockServiceProvider` — Used for block related filters
* `PostTypesServiceProvider` — Used for post type and taxonomy registration from a config
* `ThemeServiceProvider` — Used for registering [theme supports](https://developer.wordpress.org/reference/functions/add_theme_support/) and sidebars from a config

These service providers are loaded from the `composer.json` file:

```json
...
    "extra": {
        "acorn": {
            "providers": [
                "App\\Providers\\AssetsServiceProvider",
                "App\\Providers\\BlocksServiceProvider",
                "App\\Providers\\ThemeServiceProvider",
                "App\\Providers\\PostTypesServiceProvider"
            ]
        },
...
```

You can add/modify/remove these service providers. If adding or removing providers, we recommend changing the `composer.json` file.

Acorn's CLI supports creating a new service provider class:

```shell
$ wp acorn make:provider ExampleProvider
```

After creating a new provider class, make sure to add it to the `providers` array in `composer.json`.

It is also possible to use the `config/app.php` file and modify the `providers` array to manage autoloaded service providers.
