---
date_modified: 2023-01-27 13:17
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
try {
-    \Roots\bootloader();
+    \Roots\bootloader()->boot();
}
```

You can also remove the theme support added for Sage if you are working on a Sage-based WordPress theme:

```diff
-add_theme_support('sage');
```

Some setups may require one additional change if you run into the following error:

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
