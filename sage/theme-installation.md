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

From the command line on your host machine (not on your Vagrant box), navigate to the theme directory then run `yarn`:

```shell
# @ themes/your-theme-name/
$ yarn
```

You now have all the necessary dependencies to run the [build process](/sage/docs/theme-development-and-building/#available-build-commands).

## Browsersync configuration

Update `devUrl` at the bottom of `resources/assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `https://project-name.test` you would update the file to read:

```json
...
  "devUrl": "https://project-name.test",
...
```

## Server configuration

⚠️ Sage uses [Laravel's Blade](/sage/docs/blade-templates/) templating engine, and since the `.blade.php` files live in a publicly accessible directory on your webserver, we recommend preventing plain-text access to them.

### Nginx configuration for denying access to Blade files

Add to your server block before the final location directive:

```plain
location ~* \.(blade\.php)$ {
  deny all;
}
```

### Apache configuration for denying access to Blade files

Add to your `.htaccess` file or virtual host configuration:

```plain
<IfModule mod_authz_core.c>
    <FilesMatch "\.blade\.php$">
        Require all denied
    </FilesMatch>
</IfModule>
```
