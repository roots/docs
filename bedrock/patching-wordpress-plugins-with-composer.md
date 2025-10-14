---
date_modified: 2025-10-13 12:00
date_published: 2025-10-13 12:00
description: Use Composer patches to modify WordPress plugins without forking. Resolve dependency conflicts and apply fixes to third-party plugins in Bedrock projects.
title: Patching WordPress Plugins with Composer
authors:
  - ben
---

# Patching WordPress Plugins with Composer

When managing WordPress plugins through Composer in Bedrock, you may encounter situations where you need to modify third-party plugin code. Common scenarios include resolving dependency conflicts, fixing bugs before official updates are released, or adapting plugins for your specific environment.

Rather than forking plugins or manually editing vendor code, Composer patches provide a maintainable solution that persists across updates.

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

## Creating a patch file

Patches are standard unified diff files. You can create them using Git or the `diff` command.

### Using Git to create a patch

The easiest method is to make changes to the plugin and generate a diff. First initialize a temporary Git repo for the plugin:

```shell
$ cd web/app/plugins/example-plugin
$ git init
$ git add . && git commit -m "Base plugin"
```

Make your changes to the plugin files, then generate the patch and clean up:

```shell
$ git diff > ../../../../patches/example-plugin-fix.patch
$ rm -rf .git
```

### Example: resolving PSR library conflicts

A common issue in WordPress is multiple plugins bundling the same PSR libraries with different versions, causing conflicts. Here's a real-world example of commenting out conflicting `psr/log` class registrations:

```diff
diff --git a/vendor/composer/jetpack_autoload_classmap.php b/vendor/composer/jetpack_autoload_classmap.php
index 1855b18..d52edf3 100644
--- a/vendor/composer/jetpack_autoload_classmap.php
+++ b/vendor/composer/jetpack_autoload_classmap.php
@@ -194,11 +194,11 @@ return array(
 		'version' => '3.1.3',
 		'path'    => $vendorDir . '/automattic/jetpack-autoloader/src/class-plugins-handler.php'
 	),
-	'Psr\\Log\\LoggerInterface' => array(
-		'version' => '1.1.4.0',
-		'path'    => $vendorDir . '/psr/log/Psr/Log/LoggerInterface.php'
-	),
+	// 'Psr\\Log\\LoggerInterface' => array(
+	// 	'version' => '1.1.4.0',
+	// 	'path'    => $vendorDir . '/psr/log/Psr/Log/LoggerInterface.php'
+	// ),
```

Save this patch file to a `patches/` directory in your project root.

## Configuring patches in `composer.json`

Add your patches to the `extra.patches` section of `composer.json`:

```json
"extra": {
  "patches": {
    "vendor/package-name": {
      "Brief description of patch": "patches/example-plugin-fix.patch"
    }
  }
}
```

## Applying patches

Once configured, patches are automatically applied when you install or update dependencies:

```shell
$ composer install
```

You'll see output confirming patches are being applied:

```plaintext
  - Applying patches for vendor/package-name
    patches/example-plugin-fix.patch (Brief description of patch)
```

## When to use patches

Composer patches are ideal for:

* **Dependency conflicts** - Removing bundled libraries that conflict with your main dependencies
* **Bug fixes** - Applying fixes before official plugin updates are available
* **Environment adjustments** - Modifying plugins for specific hosting requirements
* **Temporary workarounds** - Addressing issues while waiting for upstream fixes

::: tip
Document your patches clearly. Include the reason for each patch in the description and maintain separate patch files for different issues to make future maintenance easier.
:::

## Maintaining patches across updates

When updating plugins, patches are reapplied automatically. If a patch fails to apply (usually because the plugin code changed), Composer will show an error. You'll need to:

1. Review the plugin changes
2. Update or remove the patch as needed
3. Test that your fix is still necessary
