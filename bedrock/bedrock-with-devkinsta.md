---
date_modified: 2023-02-19 12:16
date_published: 2023-02-19 12:16
description: How to configure DevKinsta, a local WordPress development tool, for a Bedrock-based WordPress site.
title: Bedrock with DevKinsta
authors:
  - ben
---

# Bedrock with DevKinsta

[DevKinsta](https://kinsta.com/devkinsta/?kaid=OFDHAJIXUDIV) is a local WordPress development environment. In this guide you will learn how to setup a Bedrock-based WordPress site with DevKinsta.

## Create a new site

1. Create a new site from the DevKinsta interface using the **Custom site** option
2. Select the **Empty site** option

In this guide, we'll use `example` as the site name.

## Installing Bedrock from the terminal

Navigate to the site path for your DevKinsta site:

```shell
$ cd ~/DevKinsta/public/example
```

Once you are in the `example/` folder for your DevKinsta site, either install Bedrock with Composer or clone your existing git repository into this directory:

```shell
$ composer create-project roots/bedrock
```

Your folder structure should now look like this:

```shell
# @ ~/DevKinsta/
.
├── kinsta
├── logs
├── nginx_sites
├── private
├── public
│   └── example
│       ├── bedrock
│       └── index.html
├── ssl
└── wp
```

## Configure environment variables

Bedrock requires [environment variables to be configured](https://roots.io/bedrock/docs/installation/#getting-started) in order to get started.

The `.env` file in the `app/bedrock/` directory must be configured with Local's database settings along with your home URL. Update the following values in your `.env` file:

```plaintext
DB_NAME='example'
DB_USER='root'
DB_PASSWORD='password'
DB_HOST='devkinsta_db'

WP_HOME='http://example.local'
```

Make sure to populate the `DB_PASSWORD` based on the provided password in the DevKinsta interface for your site.

## Set the webroot in DevKinsta's site config

DevKinsta's site config is located at `~/DevKinsta/nginx_sites/example.conf`. Open this file and modify the`root` path:

```diff
-root /www/kinsta/public/example;
+root /www/kinsta/public/example/bedrock/web;
```

You will need to restart your site after making these changes, and then your site will be accessible at `http://example.local`.
