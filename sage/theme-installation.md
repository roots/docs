---
ID: 6132
post_title: Theme Installation
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-installation/
published: true
post_date: 2015-08-29 18:09:28
---
Make sure all dependencies have been installed before moving on:

* [WordPress](https://wordpress.org/) >= 4.7
* [PHP](http://php.net/manual/en/install.php) >= 7.1.3 (with [`php-mbstring`](http://php.net/manual/en/book.mbstring.php) enabled)
* [Composer](https://getcomposer.org/download/)
* [Node.js](http://nodejs.org/) >= 8.0.0
* [Yarn](https://yarnpkg.com/en/docs/install)

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```shell
# @ app/themes/ or wp-content/themes/
$ composer create-project roots/sage your-theme-name
```

You will have the option to define theme meta information (name, URI, description, version, author) and choose a CSS framework.

⚠️ **If you are running on Windows, you will encounter `TTY mode is not supported on Windows platform` warning and unable to define the theme meta and CSS framework. The [suggested fix](https://discourse.roots.io/t/setting-up-sage-9-with-uikit/11652) would be to navigate to the theme directory then run the following:**

* `vendor\bin\sage meta`
* `vendor\bin\sage config`
* `vendor\bin\sage preset`

From the command line on your host machine (not on your Vagrant box), navigate to the theme directory then run `yarn`:

```shell
# @ themes/your-theme-name/
$ yarn
```

You now have all the necessary dependencies to run the [build process](/sage/docs/theme-development-and-building/#available-build-commands).

### Browsersync configuration

Update `devUrl` at the bottom of `resources/assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `https://project-name.test` you would update the file to read:

```json
...
  "devUrl": "https://project-name.test",
...
```
