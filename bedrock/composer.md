---
ID: 6140
post_title: Composer
author: Ben Word
post_date: 2015-09-03 17:15:57
post_excerpt: ""
layout: doc
permalink: https://roots.io/bedrock/docs/composer/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"18";}'
saved_flag:
  - 'a:1:{i:0;s:18:"a:1:{i:0;s:1:"1";}";}'
publish_to_discourse:
  - 'a:1:{i:0;s:54:"a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}";}'
---
[Composer](http://getcomposer.org) is used to manage dependencies. Bedrock considers any 3rd party library as a dependency including WordPress itself and any plugins.

See these two blogs for more extensive documentation:

* [Using Composer with WordPress](https://roots.io/using-composer-with-wordpress/)
* [WordPress Plugins with Composer](https://roots.io/wordpress-plugins-with-composer/)

Screencast ($): [Using Composer With WordPress](https://roots.io/screencasts/using-composer-with-wordpress/)

## Plugins

[WordPress Packagist](http://wpackagist.org/) is already registered in the `composer.json` file so any plugins from the [WordPress Plugin Directory](http://wordpress.org/plugins/) can easily be required.

To add a plugin, add it under the `require` directive or use `composer require <namespace>/<packagename>` from the command line. If it's from WordPress Packagist then the namespace is always `wpackagist-plugin`.

Example: `"wpackagist-plugin/akismet": "dev-trunk"`

Whenever you add a new plugin or update the WP version, run `composer update` to install your new packages.

`plugins`, and `mu-plugins` are Git ignored by default since Composer manages them. If you want to add something to those folders that *isn't* managed by Composer, you need to update `.gitignore` to whitelist them:

`!web/app/plugins/plugin-name`

Note: Some plugins may create files or folders outside of their given scope, or even make modifications to `wp-config.php` and other files in the `app` directory. These files should be added to your `.gitignore` file as they are managed by the plugins themselves, which are managed via Composer. Any modifications to `wp-config.php` that are needed should be moved into `config/application.php`.

## Updating WP and plugin versions

Updating your WordPress version (or any plugin) is just a matter of changing the version number in the `composer.json` file.

Then running `composer update` will pull down the new version.

## Themes

Themes can also be managed by Composer but should only be done so under two conditions:

1. You're using a parent theme that won't be modified at all
2. You want to separate out your main theme and use that as a standalone package

Under most circumstances we recommend NOT doing #2 and instead keeping your main theme as part of your app's repository.

Just like plugins, WPackagist maintains a Composer mirror of the WP theme directory. To require a theme, just use the `wpackagist-theme` namespace.