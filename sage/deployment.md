---
date_modified: 2024-01-18 13:30
date_published: 2015-09-01 19:29
description: Compile your assets, install your dependencies, and copy your Sage-based theme to your server. Remember that PHP versions must match between environments.
title: Deploying Sage
authors:
  - alwaysblank
  - ben
  - kero
  - Log1x
  - MWDelaney
---

# Deployment

## (Remote) system requirements

- WordPress >= 5.9
- PHP >= 8.1
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

## Deploying Sage

::: warning PHP versions must match
Make sure the PHP version of your development environment matches the PHP version of your production environment, or your composer dependencies may not work correctly.

### 1. Build Assets

Compile your CSS, Javascript, image, and font assets for production:
  
```shell
yarn build
```

### 2. Install Composer dependencies

Install Composer dependencies:

```shell
composer install
```

### 3. Copy files to your server

Copy all files and folders in your theme except the `node_modules` directory to your server.

## Server configuration

::: tip Using Trellis or Radicle?
If you are using [Trellis](/trellis/) to provision your production environment, or you are using [Radicle](/radicle/), you can **skip** this section.
:::

### Securing Blade templates

Due to the nature of WordPress, any file residing in the theme folder is publicly accessible. By default, webservers will return any requests made to a `*.blade.php` template as plain-text.

**This can create an opening for potential security risks as well as unwanted snooping.**

To prevent this from happening, we will need to add configuration to the web server to deny access to the file extension.

#### Nginx

If you are using Nginx, add the following to your site configuration before the final location directive:

```nginx
location ~* \.(blade\.php)$ {
    deny all;
}
```

#### Apache

If you are using Apache, add the following to your virtual host configuration or the `.htaccess` file at the root of your web application:

```apache
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

## Deploying Sage with Trellis

If you use [Trellis](https://roots.io/trellis/), you can build your assets locally (or on a CI server), then copy them to the remote server during deployment. 
[See the `build-before.yml` example hook](https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml) in Trellis.

## Deploying Sage on Kinsta

[Kinsta supports Bedrock and Trellis](https://kinsta.com/blog/bedrock-trellis/?kaid=OFDHAJIXUDIV), so deploying Sage with Trellis on [Kinsta](https://kinsta.com/?kaid=OFDHAJIXUDIV) is possible by following a few extra steps.

## Deploying Sage on WP Engine

See the instructions from [`wpengine/example-sage-theme`](https://github.com/wpengine/example-sage-theme).

## Deploying Sage via FTP

If you don't have permission to run `composer` on the production server and/or are using a shared hosting service, you may want to deploy Sage with FTP. 
To do so, [compile your assets for production](compiling-assets.md) and run `composer install --no-dev` in your theme directory. 
Upload all files and folders in your theme except the `node_modules` directory to your host.
