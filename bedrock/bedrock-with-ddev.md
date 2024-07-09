---
date_modified: 2024-07-09 18:30
date_published: 2023-02-19 12:16
description: How to configure DDEV, a local PHP development tool, for a Bedrock-based WordPress site.
title: Bedrock with DDEV
authors:
  - ben
---

# Bedrock with DDEV

[DDEV](https://ddev.readthedocs.io/en/stable/) is a local PHP development environment. In this guide you will learn how to setup a Bedrock-based WordPress site with DDEV.

## Setting up a Bedrock site

```shell
$ ddev config --project-type=wordpress --docroot=web --create-docroot
$ ddev composer create roots/bedrock
```

## Configure environment variables

Bedrock requires [environment variables to be configured](https://roots.io/bedrock/docs/installation/#getting-started) in order to get started.

The `.env` file must be configured with DDEV's database settings along with your home URL. Update the following values in your `.env` file:

```plaintext
DB_NAME='db'
DB_USER='db'
DB_PASSWORD='db'
DB_HOST='db'

WP_HOME="${DDEV_PRIMARY_URL}"
WP_SITEURL="${DDEV_PRIMARY_URL}/wp"
```

After configuring the environment variables, run `ddev start`. Your site will be accessible at `https://ddevtest.ddev.site/`.
