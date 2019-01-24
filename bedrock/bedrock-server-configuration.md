---
ID: 31938
post_title: Bedrock Server Configuration
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/bedrock-server-configuration/
published: true
post_date: 2018-12-21 18:24:29
---
Bedrock can run on any webserver that supports Composer and PHP >= 7.1. The document root for your site must be pointed to Bedrock's `web` folder.

## Nginx configuration for Bedrock

If you aren't using a Nginx-based setup that already supports Bedrock, such as [Valet](https://roots.io/guides/wordpress-local-development-on-os-x-with-valet-and-bedrock/) or [Trellis](https://roots.io/trellis/), you'll need to configure Nginx with the following rules:

```plain
server {
  listen 80;
  server_name example.com;

  root /srv/www/example.com/web;
  index index.php index.htm index.html;

  # Prevent PHP scripts from being executed inside the uploads folder.
  location ~* /app/uploads/.*.php$ {
    deny all;
  }

  location / {
    try_files $uri $uri/ /index.php?$args;
  }
}
```

### Nginx multisite config

Multisite installations on Nginx need additional rewrites depending on the type of multisite install.

#### Subdomain multisite rewrites

```plain
rewrite ^/(wp-.*.php)$ /wp/$1 last;
rewrite ^/(wp-(content|admin|includes).*) /wp/$1 last;
```

#### Subfolder multisite rewrites

```raw
if (!-e $request_filename) {
  rewrite /wp-admin$ $scheme://$host$uri/ permanent;
  rewrite ^(/[^/]+)?(/wp-.*) /wp$2 last;
  rewrite ^(/[^/]+)?(/.*.php) /wp$2 last;
}
```

## Apache configuration for Bedrock

Make sure the `DocumentRoot` is set to the `web` folder:

```plain
<VirtualHost *:80>
        DocumentRoot /var/www/html/bedrock/web

        DirectoryIndex index.php index.html index.htm

        <Directory /var/www/html/bedrock/web>
            Options -Indexes

            # .htaccess isn't required if you include this
            <IfModule mod_rewrite.c>
                RewriteEngine On
                RewriteBase /
                RewriteRule ^index.php$ - [L]
                RewriteCond %{REQUEST_FILENAME} !-f
                RewriteCond %{REQUEST_FILENAME} !-d
                RewriteRule . /index.php [L]
            </IfModule>
        </Directory>
</VirtualHost>
```

You can also add the suggested `.htaccess` file from WordPress at `web/.htaccess`:

```plain
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

## Managed WordPress hosts and Bedrock

If you're using a [supported WordPress host](https://roots.io/bedrock/docs/deploying-bedrock/#supported-wordpress-hosts) such as Kinsta, then contact support and ask them to set your document root to the `web` folder.