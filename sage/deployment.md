---
date_modified: 2024-01-02 16:30
date_published: 2015-09-01 19:29
description: To deploy a Sage theme you'll need to run `composer install` on the remote server, and copy over theme assets built with `yarn build`.
title: Deploying Sage
authors:
  - alwaysblank
  - ben
  - kero
  - Log1x
---

# Deployment

To deploy a Sage theme you'll need to make sure two things are covered:

1. Run `composer install` from the theme directory on the remote server if you have Acorn installed in your theme directory
2. Copy over built theme assets (the `public/` folder)

Generate production ready assets with `yarn build`.

## Server requirements

- WordPress >= 5.9
- PHP >= 8.0
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

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
