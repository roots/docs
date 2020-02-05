# Compatability

Bedrock has many differences from a default WordPress install. However, all of these changes are done through official and built-in WordPress functionality and settings such as the custom `wp-content` directory.

If a plugin or theme works with a regular WordPress install and *not- with Bedrock, it's almost always a problem with the theme or plugin. This wouldn't just apply to Bedrock-based sites, but also likely any site with WordPress in [its own directory](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory) which is a fairly typical setup.

These incompatibilities are caused by plugin and theme authors not using proper WordPress functions to refer to file paths or URLs usually. Common issues include:

- assuming the content directory is `wp-content`
- assuming WordPress is not in a subdirectory
- [trying to include wp-load.php](http://ottopress.com/2010/dont-include-wp-load-please/)

If you reach a WordPress error page on a non-development environment that says "Sorry, you are not allowed to access this page.", then the plugin or theme could be conflicting with Bedrock's use of enabling `DISALLOW_FILE_MODS`.

If you run into an issue with a specific theme or plugin, please contact their authors first and link them to this page.
