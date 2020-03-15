---
description: If a plugin or theme works with a regular WordPress install and *not* with Bedrock, it's almost always a problem with the theme or plugin.
---

# Compatibility

Bedrock does certain things a bit differently than the default WordPress installation, but it does so by leveraging functionality that WordPress Core provides.

If a plugin or theme works with a vanilla WordPress install and not with Bedrock, the plugin or theme is likely at fault:
In most cases, it is hard-coding assumptions about directory structure or file location and ignoring the systems WordPress has in place to determine those things dynamically.
This type of issue will often arise not only on Bedrock, but also on sites that have installed WordPress in [its own directory](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory).

Common issues include:

- Assuming the content directory is `wp-content`.
- Assuming WordPress is not in a subdirectory.
- [Trying to include wp-load.php](http://ottopress.com/2010/dont-include-wp-load-please/).

If you reach a WordPress error page on a non-development environment that says `"Sorry, you are not allowed to access this page."`, then the plugin or theme could be conflicting with Bedrock's use of `DISALLOW_FILE_MODS`.

If you run into an issue with a specific theme or plugin, please contact their authors first and link them to this page.
