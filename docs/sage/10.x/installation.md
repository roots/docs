---
description: Installing Sage 10 is as simple as cloning the repo and running `composer install`
---

# Installation

[[toc]]

## Installation

### Server Requirements

Sage 10 has a few system requirements necessary for development as well as production. All of these requirements are satisfied out of the box by [Trellis](https://github.com/roots/trellis), [Laravel Valet](https://github.com/laravel/valet), and most modern WordPress hosting solutions.

If it is unclear to you whether the host you plan to use is compatible with Sage, you will need to ensure their server meets the following requirements:

- WordPress >= 5.9
- PHP >= 7.4
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

### Acorn

Although Sage makes use of Acorn, it doesn't ship with it included. This is to give you the flexibility to include it in a way that works best for your environment.

- **[Bedrock](https://github.com/roots/bedrock)** is the recommended way to manage your WordPress installation, themes, and plugins. If you're using Bedrock, you only need to require Acorn as a composer dependency in your Bedrock `composer.json`:
  ```sh
  $ composer require roots/acorn
  ```
- If Bedrock isn't feasible, then the next best approach is to install Acorn as an **mu-plugin**. This guarantees that it will always be available and someone won't accidentally disable it and break your site. Add the Acorn directory to your `mu-plugins` directory, and make sure you have something to load it automatically, like our [`bedrock-autoloader`](https://github.com/roots/bedrock-autoloader).
- If neither of the preceding options is workable for you, then Acorn can always be installed as a **normal plugin** by putting the Acorn directory in your `plugins` folder. Just remember to activate it!

### Installing Sage

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```sh
# @ app/themes/ or wp-content/themes/
$ composer create-project roots/sage your-theme-name
```

To install the latest development version of Sage, add `dev-main` to the end of the command:

```sh
$ composer create-project roots/sage your-theme-name dev-main
```

Make sure that you have Acorn installed. See the "Acorn" section above for instructions.

## Web Server Configuration

::: tip Using Trellis?
If you are using Trellis to provision your production environment, you can **skip** this section.
:::

### Securing Blade Templates

Due to the nature of WordPress, any file residing in the theme folder is publicly accessible. By default, webservers will return any requests made to a `*.blade.php` template as plain-text.

**This can create an opening for potential security riskes as well as unwanted snooping.**

To prevent this from happening, we will need to add configuration to the web server to deny access to the file extension.

#### Apache

If you are using Apache, add the following to your virtual host configuration or the `.htaccess` file at the root of your web application:

```php
<FilesMatch ".+\.(blade\.php)$">
    # Apache 2.4
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>

    # Apache 2.2
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>
```

#### Nginx

If you are using Nginx, add the following to your site configuration before the final location directive:

```php
location ~* \.(blade\.php)$ {
    deny all;
}
```
