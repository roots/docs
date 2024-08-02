---
date_modified: 2024-08-02 13:45
date_published: 2023-01-13 13:12
description: Acorn v4 introduces some minimal breaking changes that may require updates when coming from Acorn v3.
title: Upgrading Acorn
authors:
  - ben
  - joshf
---

# Upgrading Acorn

## Upgrading to v4.x from v3.x

Acorn v4 includes Laravel v10 components, whereas Acorn v3 includes Laravel v9 components.

### Upgrading dependencies

Acorn v4 requires PHP >= 8.1.

Update the `roots/acorn` dependency in your `composer.json` file to `^4.0`:

```shell
$ composer require roots/acorn ^4.0 -W
```

The `-W` flag is required to upgrade the included Laravel dependencies.

::: warning
If any packages/dependencies have conflicts while updating, try removing and then re-requiring them after Acorn is bumped to 4.x.
:::

### Config changes

If you previously published Acorn's config(s), you will need to update them based on the configs in the [Acorn repo](https://github.com/roots/acorn/tree/main/config) ([history](https://github.com/roots/acorn/commits/main/config?since=2023-11-01&until=2024-01-31)). You mainly need the [new provider changes](https://github.com/roots/acorn/blob/v4.0.0/config/app.php#L160-L169) if you published `config/app.php`.

```diff
+ use Roots\Acorn\ServiceProvider;

-    'timezone' => get_option('timezone_string', 'UTC'),
+    'timezone' => get_option('timezone_string') ?: 'UTC',

-    'providers' => [
+    'providers' => ServiceProvider::defaultProviders()->merge([
-
-        /*
-         * Framework Service Providers...
-         */
-        Illuminate\Auth\AuthServiceProvider::class,
-        Illuminate\Broadcasting\BroadcastServiceProvider::class,
-        Illuminate\Bus\BusServiceProvider::class,
-        // ...
-        Roots\Acorn\Providers\AcornServiceProvider::class,
-        Roots\Acorn\Providers\RouteServiceProvider::class,
-        Roots\Acorn\View\ViewServiceProvider::class,


         /*
          * Package Service Providers...
          */

         /*
          * Application Service Providers...
          */
         // App\Providers\ThemeServiceProvider::class,

-    ],
+    ])->toArray(),
```

### Breaking changes

The breaking changes this time are minimal and should not impact most users.

Service providers should now extend Illuminate:

```diff
- use Roots\Acorn\ServiceProvider;
+ use Illuminate\Support\ServiceProvider;
```

View Composer `Arrayable` trait uses property [`Composer::$except`](https://github.com/roots/acorn/blob/70d179955cddc61f0c6101717af2fdf88cf38831/src/Roots/Acorn/View/Composer.php#L35-L54) instead of `Arrayable::$ignore`.

```diff
 class Alert extends Composer
 {
     use Arrayable;

-    $ignore = ['token'];
+    $except = ['token'];
 }
```

Asset Contract adds [`relativePath()` method](https://github.com/roots/acorn/blob/70d179955cddc61f0c6101717af2fdf88cf38831/src/Roots/Acorn/Assets/Contracts/Asset.php#L38). So if you're implementing this contract, you'll need to update it. (Most users will not be impacted by this.)

```diff
 class MyAsset implements Asset
 {
+    relativePath(string $base_path): string
+    {
+        // ...
+    }
 }
```

## Upgrading to v3.x from v2.x

Acorn v3 includes Laravel v9 components, whereas Acorn v2 includes Laravel v8 components.

### Upgrading dependencies

Acorn v3 requires PHP >= 8.0.2.

Update the `roots/acorn` dependency in your `composer.json` file to `^3.0`:

```shell
$ composer require roots/acorn ^3.0 -W
```

The `-W` flag is required to upgrade the included Laravel dependencies.

### Theme/application

Acorn v2 is typically booted in your WordPress theme's `functions.php` file. Look for the line that includes `\Roots\bootloader()`, and replace it with `\Roots\bootloader()->boot()`.

```diff
-\Roots\bootloader();
+\Roots\bootloader()->boot();
```

We highly recommend removing the exception from bootloader to prevent service providers from silently skipping on local dev, a change that was introduced in Acorn v3.1.0 ([PR #266](https://github.com/roots/acorn/pull/266)) and Sage v10.5.1 ([PR #3121](https://github.com/roots/sage/pull/3121/files)). Replace the original bootloader method:

```php
try {
    \Roots\bootloader()->boot();
} catch (Throwable $e) {
    wp_die('You need to install Acorn to use this theme.'),
    ...
}
```

With the new one:

```php
if (! function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url' => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}

\Roots\bootloader()->boot();
```

You can also remove the theme support added for Sage if you are working on a Sage-based WordPress theme:

```diff
-add_theme_support('sage');
```

#### Target class [sage.view] does not exist

Some setups may require changes if you run into the following error:

```plaintext
Target class [sage.view] does not exist
```

In this case, edit the `ThemeServiceProvider` and make sure it extends `SageServiceProvider` and has `parent::` calls to `register()` and `boot()` if they are present:

```diff
# app/Providers/ThemeServiceProvider.php

namespace App\Providers;

-use Roots\Acorn\ServiceProvider;
+use Roots\Acorn\Sage\SageServiceProvider;

-class ThemeServiceProvider extends ServiceProvider
+class ThemeServiceProvider extends SageServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
-        //
+        parent::register();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
-        //
+        parent::boot();
    }
}
```

After doing so, you may need to delete [Acorn's application cache directory](https://roots.io/acorn/docs/directory-structure/). By default, this is located in `[wp-content|app]/cache/acorn/`. 

Reference the [Acorn v3 upgrade pull request on the Sage repo](https://github.com/roots/sage/pull/3097) to see a full diff.

#### Target class [assets.manifest] does not exist

Some setups may require changes if you run into the following error:

```plaintext
Target class [assets.manifest] does not exist
```

This error can be fixed by copying over the latest changes to the [`config/app.php` file](https://github.com/roots/acorn/blob/67cce76e6ca13e28acaced3333d77e2f779b07a3/config/app.php) from Acorn.
