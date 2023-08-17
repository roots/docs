---
date_modified: 2023-08-16 12:45
date_published: 2015-09-06 07:42
description: Composer is used to manage dependencies. Bedrock considers any 3rd party library as a dependency including WordPress itself and any plugins.
title: WordPress Dependencies with Composer
authors:
  - ben
  - Log1x
  - swalkinshaw
  - TangRufus
  - EHLOVader
---

# WordPress Dependencies with Composer

Bedrock uses [Composer](http://getcomposer.org) to manage dependencies. Any 3rd party library is considered a dependency, including WordPress itself and any plugins.

## Adding WordPress plugins with Composer

[WordPress Packagist](http://wpackagist.org/) is already registered in the `composer.json` file so any plugins from the [WordPress Plugin Directory](http://wordpress.org/plugins/) can easily be required.

To add a plugin, add it under the `require` directive or use `composer require <namespace>/<packagename>` from the command line. If the plugin is from WordPress.org, then the namespace is always `wpackagist-plugin`:

```shell
$ composer require wpackagist-plugin/akismet
```

`plugins` and `mu-plugins` are ignored in Git by default since Composer manages them. If you want to add something to those folders that *isn't* managed by Composer, you need to update `.gitignore` to allow them to be added to your repository:

`!web/app/plugins/plugin-name`

### Force a plugin to be a mu-plugin

To force a regular `wordpress-plugin` to be treated as a `wordpress-muplugin`, you can update the `installer-paths` config to tell Bedrock to install it in the `mu-plugins` directory.

In the following example, Akismet will be installed in the `mu-plugins` directory:

```yaml
...
  "extra": {
    "installer-paths": {
      "web/app/mu-plugins/{$name}/": ["type:wordpress-muplugin", "wpackagist-plugin/akismet"],
      "web/app/plugins/{$name}/": ["type:wordpress-plugin"],
      "web/app/themes/{$name}/": ["type:wordpress-theme"]
    },
    "wordpress-install-dir": "web/wp"
  },
...
```

#### Configuring multiple mu-plugins

To configure more than one regular plugin to be installed to `mu-plugins`, add additional strings to the same array value for the `web/app/mu-plugins/{$name}/` JSON key, for example:

```yaml
...
      "web/app/mu-plugins/{$name}/": [
        "type:wordpress-muplugin", 
        "wpackagist-plugin/akismet",
        "wpackagist-plugin/turn-comments-off"
      ],
...
```

## Updating WordPress and WordPress plugin versions with Composer

Updating your WordPress version, or the version of any plugin, is best achieved by re-requiring the dependencies to install the latest versions or specific versions:

```shell
$ composer require roots/wordpress -W
$ composer require wpackagist-plugin/akismet
$ composer require roots/wordpress:6.1 -W
```

### Automating WordPress updates

Tools like [Dependabot](https://dependabot.com/) and [Renovate](https://www.mend.io/free-developer-tools/renovate/) can be used to automate updates of your Composer dependencies in Bedrock, including WordPress itself.

The Bedrock repo [uses Renovate to bump WordPress versions](https://github.com/roots/bedrock/blob/e14658bbae2c64df9605168a9c7932e5e10a9dd8/.github/renovate.json) when new versions become available.

## Adding WordPress themes with Composer

Themes can also be managed by Composer but should only be done so under two conditions:

1. You're using a parent theme that won't be modified at all
2. You want to separate out your main theme and use that as a standalone package

Under most circumstances, we recommend keeping your main theme as part of your repository.

Just like plugins, WPackagist maintains a Composer mirror of the WP theme directory. To require a theme, just use the `wpackagist-theme` namespace:

```shell
$ composer require wpackagist-theme/twentytwentythree
```

## Recommended resources

[WordPress with Composer resources](https://roots.io/composer-wordpress-resources/) for more extensive documentation and background information:

- [📝 Composer in WordPress from Rarst](https://composer.rarst.net/)
- [📝 `roots/wordpress` Composer Package](https://roots.io/announcing-the-roots-wordpress-composer-package/)
- [📝 Using Composer with WordPress](https://roots.io/using-composer-with-wordpress/)
- [📝 WordPress Plugins with Composer](https://roots.io/wordpress-plugins-with-composer/)
- [🎥 Using Composer With WordPress screencast](https://www.youtube.com/watch?v=2cFRQA1_GY0) (2013)
- [📝 Private or Commercial WordPress Plugins as Composer Dependencies](https://roots.io/bedrock/docs/private-or-commercial-wordpress-plugins-as-composer-dependencies/)
