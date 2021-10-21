---
description: Installing Sage 10 is as simple as cloning the repo and running `composer install`
---

# Installation

[[toc]]

## Installation

### Server Requirements

Sage 10 has a few system requirements necessary for development as well as production. All of these requirements are satisfied out of the box by [Trellis](https://github.com/roots/trellis), [Laravel Valet](https://github.com/laravel/valet), and most modern WordPress hosting solutions.

If it is unclear to you whether the host you plan to use is compatible with Sage, you will need to ensure their server meets the following requirements:

- WordPress >= 5.4
- PHP >= 7.3
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

### Installing Sage

Sage utilizies [Composer](https://getcomposer.org/) for managing theme packages and dependencies.

Before moving on, ensure that Composer is [installed](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos) on the current machine.

#### Sage Installer

::: warning
This feature isn't quite ready yet!
:::

#### Cloning The Repository

Alternatively, you may also install Sage by simply cloning down the repository and running `composer install`:

```sh
# app/themes or wp-content/themes
$ git clone git@github.com:roots/sage.git your-theme-name
$ cd your-theme-name
$ composer install
```

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
