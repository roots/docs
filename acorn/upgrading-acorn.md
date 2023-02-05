---
date_modified: 2023-02-05 09:38
date_published: 2023-01-13 13:12
description: Acorn v3 introduces some minimal breaking changes that require updates when coming from Acorn v2.
title: Upgrading Acorn
authors:
  - ben
---

# Upgrading Acorn

## Upgrading to v3.x from v2.x

Acorn v3 includes Laravel v9 components, whereas Acorn v2 includes Laravel v8 components.

::: tip
Estimated upgrade time: 15 minutes
:::

### Upgrading dependencies

Acorn v3 requires PHP >= 8.0.2.

Update the `roots/acorn` dependency in your `composer.json` file to `^3.0`:

```shell
composer require roots/acorn ^3.0 -W
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

Reference the [Acorn v3 upgrade pull request on the Sage repo](https://github.com/roots/sage/pull/3097) to see a full diff.

#### Target class [assets.manifest] does not exist

Some setups may require changes if you run into the following error:

```plaintext
Target class [assets.manifest] does not exist
```

This error can be fixed by copying over the latest changes to the [`config/app.php` file](https://github.com/roots/acorn/blob/67cce76e6ca13e28acaced3333d77e2f779b07a3/config/app.php) from Acorn.
