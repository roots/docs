---
date_modified: 2026-03-10 17:00
date_published: 2023-02-19 12:16
description: Configure Local for Bedrock WordPress development. Adjust document root to `web/` directory and configure Local for Bedrock's structure.
title: Using Bedrock with Local
authors:
  - ben
  - ethanclevenger91
---

# Using Bedrock with Local

[Local](https://localwp.com/), previously known as Local by Flywheel, is one of the many local development tools available for WordPress developers. In this guide you will learn how to configure Local for a Bedrock-based WordPress site.

Bedrock sites are structured in a way that your [entire WordPress site is managed from a git repository](https://roots.io/bedrock/docs/folder-structure/). Local's workflow isn't friendly towards this approach, but it's still possible to configure Local to work with Bedrock sites.

## Create a new site

Create a new site from the Local interface. In this guide, we'll use `bedrock` as the site name.

## Installing Bedrock from the terminal

From your new Local site, click **Open site shell**. When the terminal opens, you should be under `/Local Sites/bedrock/app/public`. 

First, remove the default WordPress installation that is in the public folder:

```shell
rm -rf *
rm .htaccess
```

This will remove all content of the public folder.

Now install Bedrock with Composer into the public directory or clone your existing git repository into this directory:
```shell
composer create-project roots/bedrock .
```

## Configure environment variables

Bedrock requires environment variables to be configured in order to get started.

First, copy the example environment file:

```shell
cp .env.example .env
```

The `.env` file must be configured with Local's database settings along with your home URL. Update the following values in your `.env` file:

```plaintext
DB_NAME='local'
DB_USER='root'
DB_PASSWORD='root'

WP_HOME='https://bedrock.local'
```

For Local WP these are the default DB credentials. If you changed them manually, then you need to change them here accordingly. The `WP_HOME` should be the website URL we configured in Local - in our case here it's `bedrock.local`.

## Set the webroot in Local's site config

Local's site config is located at `~/Local Sites/bedrock/conf/nginx/site.conf.hbs`. Open this file and append `/web` to the server root:

```diff
server {
    listen {{port}};
-   root   "{{root}}";
+   root   "{{root}}/web";
```

You will need to restart your site after making these changes, and then your site will be accessible at `https://bedrock.local`.
