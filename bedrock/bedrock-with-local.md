---
date_modified: 2023-02-19 12:16
date_published: 2023-02-19 12:16
description: How to configure Local, a local WordPress development tool, for a Bedrock-based WordPress site.
title: Bedrock with Local
authors:
  - ben
---

# Bedrock with Local

[Local](https://localwp.com/), previously known as Local by Flywheel, is one of the many local development tools available for WordPress developers. In this guide you will learn how to configure Local for a Bedrock-based WordPress site.

Bedrock sites are structured in a way that your [entire WordPress site is managed from a git repository](https://roots.io/bedrock/docs/folder-structure/). Local's workflow isn't friendly towards this approach, but it's still possible to configure Local to work with Bedrock sites.

## Create a new site

Create a new site from the Local interface. In this guide, we'll use `bedrock` as the site name.

## Installing Bedrock from the terminal

From your new Local site, click **Open site shell** and navigate up one folder so that you're in the `bedrock/app` folder. On macOS or Linux, you could run the following command:

```shell
# Navigate one folder up
$ cd ..

# or, navigate directly to the app/ folder
$ cd ~/Local\ Sites/bedrock/app
```

Once you are in the `app/` folder for your Local site, either install Bedrock with Composer or clone your existing git repository into this directory:

```shell
$ composer create-project roots/bedrock
```

Your folder structure should now look like this:

```shell
# @ ~/Local Sites/bedrock
.
├── app
│   ├── bedrock
│   ├── public
│   └── sql
├── conf
│   ├── mysql
│   ├── nginx
│   └── php
└── logs
    ├── nginx
    └── php
```

## Configure environment variables

Bedrock requires [environment variables to be configured](https://roots.io/bedrock/docs/installation/#getting-started) in order to get started.

The `.env` file in the `app/bedrock/` directory must be configured with Local's database settings along with your home URL. Update the following values in your `.env` file:

```plaintext
DB_NAME='local'
DB_USER='root'
DB_PASSWORD='root'

WP_HOME='https://bedrock.local'
```

## Set the webroot in Local's site config

Local's site config is located at `~/Local Sites/bedrock/conf/nginx/site.conf.hbs`. Open this file and replace `{{root}}` with the full path to Bedrock's web directory:

```diff
server {
    listen {{port}};
-   root   "{{root}}";
+   root   "/Users/username/Local Sites/bedrock/app/bedrock/web";
```
Or you can do this instead
```diff
-   root   "{{root}}";
+   root "{{root}}/web";
```

This how it should look like in the file ( Apache config - file is located at `~/Local Sites/bedrock/conf/apache/site.conf.hbs`)

```hbs
<VirtualHost *:{{port}}>
	ServerAdmin webmaster@localhost
	DocumentRoot "{{root}}/web"
  [...]
</VirtualHost> 
```
In the example above, the full path is based on a macOS machine and requires the username to be changed to the one you are using. You will need to modify this path for Windows and Linux setups to reflect the full path to the `app/bedrock/web` directory.

You will need to restart your site after making these changes, and then your site will be accessible at `https://bedrock.local`.
