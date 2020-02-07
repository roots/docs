# Installation

Make sure all dependencies have been installed before moving on:

- [WordPress](https://wordpress.org/) >= 4.7
- [PHP](http://php.net/manual/en/install.php) >= 7.1.3 (with [`php-mbstring`](http://php.net/manual/en/book.mbstring.php) enabled)
- [Composer](https://getcomposer.org/download/)
- [Node.js](http://nodejs.org/) >= 8.0.0
- [Yarn](https://yarnpkg.com/en/docs/install)

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```bash
# @ app/themes/ or wp-content/themes/
$ composer create-project roots/sage your-theme-name
```

You will have the option to define theme meta information (name, URI, description, version, author) and choose a CSS framework.

From the command line on your host machine (not on your Vagrant box), navigate to the theme directory then run `yarn`:

```bash
# @ themes/your-theme-name/
$ yarn
```

You now have all the necessary dependencies to run the [build process](compiling-assets.md/#available-build-commands).

## Browsersync configuration

Update `devUrl` at the bottom of `resources/assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `https://project-name.test` you would update the file to read:

```json
...
  "devUrl": "https://project-name.test",
...
```

## Server configuration

::: warning Note
:warning: Sage uses [Laravel's Blade](blade-templates.md) templating engine, and since the `.blade.php` files live in a publicly accessible directory on your webserver, we recommend preventing plain-text access to them.
:::

::: warning Note
:warning: Sage uses [composer](https://getcomposer.org/) and [yarn](https://yarnpkg.com) to manage dependencies, and since their files might contain private credentials and expose dependency versions, we recommend blocking them as well.

### Nginx configuration for denying access to Blade, composer and yarn files

Add to your server block before the final location directive:

```
location ~- \.(blade\.php)$ {
  deny all;
}

location ~- composer\.(json|lock)$ {
  deny all;
}
  
location ~- package(-lock)?\.json$ {
  deny all;
}

location ~- yarn\.lock$ {
  deny all;
}
```

### Apache configuration for denying access to Blade files

Add to your `.htaccess` file or virtual host configuration:

```
<FilesMatch ".+\.(blade\.php)$">
    <IfModule mod_authz_core.c>
        # Apache 2.4
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        # Apache 2.2
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>
```
