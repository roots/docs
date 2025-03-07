---
date_modified: 2025-03-07 09:00
date_published: 2021-11-19 11:58
description: Install Acorn by running `composer require roots/acorn` in the root of your Composer-based WordPress project.
title: Installing Acorn
authors:
  - alwaysblank
  - ben
  - csorrentino
  - QWp6t
---

# Installation

## What is Acorn?

Acorn is a way to use [Laravel components inside of WordPress](https://roots.io/acorn/).

### Why use Acorn?

Acorn brings elements of the Laravel ecosystem to any WordPress plugin or theme.

To put it simply, Acorn provides a way to gracefully load a Laravel application container inside of WordPress while respecting the WordPress lifecycle and template hierarchy.

This means you get access to Laravel's artisan commands through the use of [`wp acorn`](wp-cli.md). You can utilize [Blade templates](blade.md). You gain access to [third-party packages](available-packages.md#user-contributed) built specifically for Acorn. And we provide some first-party components as well, such as [view composers](/acorn/docs/blade#composers) and [assets management](assets-management.md).

## Installing Acorn with Composer

Install Acorn with Composer:

```shell
$ composer require roots/acorn
```


## Booting Acorn

Acorn must be booted in order to use it. [Sage](https://roots.io/sage/) and [Radicle](https://roots.io/radicle/) already handle booting Acorn.

<details>
<summary>Boot Acorn in your own theme or plugin</summary>

Add the following in your theme's `functions.php` file, or in your main plugin file:

```php
<?php

use Roots\Acorn\Application;

if (! class_exists(\Roots\Acorn\Application::class)) {
    wp_die(
        __('You need to install Acorn to use this site.', 'domain'),
        '',
        [
            'link_url' => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'domain'),
        ]
    );
}

add_action('after_setup_theme', function () {
    Application::configure()
        ->withProviders([
            App\Providers\ThemeServiceProvider::class,
        ])
        ->boot();
}, 0);
```

</details>

### Advanced booting

Acorn provides several additional configuration methods that can be chained before booting. Here's a comprehensive example with explanations:

```php
add_action('after_setup_theme', function () {
    Application::configure()
        ->withProviders([
            // Register your service providers
            App\Providers\ThemeServiceProvider::class,
        ])
        ->withMiddleware(function (Middleware $middleware) {
            // Configure HTTP middleware for WordPress requests
            $middleware->wordpress([
                Illuminate\Cookie\Middleware\EncryptCookies::class,
                Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
                Illuminate\Session\Middleware\StartSession::class,
                Illuminate\View\Middleware\ShareErrorsFromSession::class,
                Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
                Illuminate\Routing\Middleware\SubstituteBindings::class,
            ]);

            // You can also configure middleware for web and API routes
            // $middleware->web([...]);
            // $middleware->api([...]);
        })
        ->withExceptions(function (Exceptions $exceptions) {
            // Configure exception handling
            // $exceptions->reportable(function (\Throwable $e) {
            //     Log::error($e->getMessage());
            // });
        })
        ->withRouting(
            // Configure routing with named parameters
            web: base_path('routes/web.php'),    // Laravel-style web routes
            api: base_path('routes/api.php'),    // API routes
            wordpress: true,                     // Enable WordPress request handling
        )
        ->boot();
}, 0);
```

## Add the autoload dump script

Acorn has a function that should be added to the `scripts` section of your `composer.json` file for the `post-autoload-dump` event. To automatically configure this script, run the following command:

```shell
$ wp acorn acorn:install
```

Select **Yes** when prompted to install the Acorn autoload dump script.

::: warning
`wp acorn` commands won't work if your theme/plugin that boots Acorn hasn't been activated and will result in the following message:

**Error: 'acorn' is not a registered wp command.**
:::

<details>
<summary>Manually adding Acorn's post autoload dump function</summary>

Open `composer.json` and add Acorn's `postAutoloadDump` function to Composer's `post-autoload-dump` event in the `scripts`:

```json
"scripts": {
  //...
  "post-autoload-dump": [
    "Roots\\Acorn\\ComposerScripts::postAutoloadDump"
  ]
}
```

</details>

## Server requirements

Acorn's server requirements are minimal, and mostly come from WordPress and [Laravel 10's requirements](https://laravel.com/docs/10.x/deployment#server-requirements).

- PHP >=8.2 with extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, Tokenizer, XML
- WordPress >= 5.4
- [WP-CLI](https://wp-cli.org/)
