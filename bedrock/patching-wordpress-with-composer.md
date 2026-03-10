---
date_modified: 2026-03-10 12:00
date_published: 2026-03-10 12:00
description: Apply patches to WordPress core in Bedrock using Composer. Fix bugs or apply upstream changes before official releases without modifying core files directly.
title: Patching WordPress with Composer
authors:
  - ben
---

# Patching WordPress with Composer

Sometimes you need to patch WordPress core — to fix a bug before an official release, suppress noisy deprecation notices, or backport a change from an open pull request. Composer patches let you apply these changes in a maintainable way that persists across installs and deploys.

## Installing the patches plugin

Add the [cweagans/composer-patches](https://github.com/cweagans/composer-patches) package to your project:

```shell
$ composer require cweagans/composer-patches
```

Enable the plugin in your `composer.json`:

```json
"config": {
  "allow-plugins": {
    "cweagans/composer-patches": true
  }
}
```

## Which package to patch

Bedrock's `roots/wordpress` is a metapackage — it doesn't contain any files. The actual WordPress core files are in the `roots/wordpress-no-content` package, which is installed to your `wordpress-install-dir` (typically `web/wp`).

Patches must target `roots/wordpress-no-content`, and patch file paths should be relative to the package root (e.g., `wp-includes/load.php`, not `web/wp/wp-includes/load.php`).

## Creating a patch file

Create a `patches/` directory in your project root. Patches are standard unified diff files with paths relative to the WordPress root.

### Example: suppressing deprecated notices

```diff
--- a/wp-includes/load.php
+++ b/wp-includes/load.php
@@ -607,7 +607,7 @@ function wp_debug_mode() {
 	}

 	if ( WP_DEBUG ) {
-		error_reporting( E_ALL );
+		error_reporting( E_ALL & ~E_DEPRECATED );

 		if ( WP_DEBUG_DISPLAY ) {
 			ini_set( 'display_errors', 1 );
```

Save this as `patches/wordpress.patch`.

## Configuring patches in `composer.json`

Add your patches to the `extra.patches` section of `composer.json`:

```json
"extra": {
  "patches": {
    "roots/wordpress-no-content": [
      {
        "description": "Suppress E_DEPRECATED notices",
        "url": "patches/wordpress.patch"
      }
    ]
  }
}
```

## Applying patches

Patches are automatically applied when you install or update dependencies:

```shell
$ composer install
```

You'll see output confirming patches are being applied:

```plaintext
  - Patching roots/wordpress-no-content
      - Applying patch patches/wordpress.patch (Suppress E_DEPRECATED notices)
```

To force patches to reapply, reinstall the package:

```shell
$ composer reinstall roots/wordpress-no-content
```

## Maintaining patches across updates

When WordPress is updated, patches are reapplied automatically. If a patch fails to apply (usually because the patched code changed in the new version), Composer will show an error. You'll need to:

1. Review the WordPress changes
2. Update or remove the patch as needed
3. Test that your fix is still necessary — the issue may have been resolved upstream

::: warning
WordPress core patches are version-specific. After updating WordPress, always verify that your patches still apply cleanly and are still needed.
:::
