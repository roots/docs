---
date_modified: 2023-06-04 16:40
date_published: 2023-02-19 12:16
description: How to configure Lando, a local development tool, for a Bedrock-based WordPress site.
title: Bedrock with Lando
authors:
  - ben
  - james0r
---

# Bedrock with Lando

[Lando](https://lando.dev/) is a local development environment. In this guide you will learn how to setup a Bedrock-based WordPress site with Lando.

## Configuring a Lando recipe for Bedrock

After [installing Bedrock](/bedrock/docs/installation/), you can either use `lando init` to create the receipe, or you can just drop in the contents of the receipe file that you will find below within a file called `.lando.yml`.

To use the CLI, run `lando init --recipe wordpress` and answer the following prompts:

* From where should we get your app's codebase? **current working directory**
* Where is your webroot relative to the init destination? **web**
* What do you want to call this app? **bedrock**

Or, just drop in the following `.lando.yml` file in the root of your Bedrock directory:

```yaml
# .lando.yml
name: bedrock
recipe: wordpress
config:
  webroot: web
services:
  appserver:
    type: php:8.2 # Bedrock requires PHP >= 8.0
```

## Configure environment variables

Bedrock requires [environment variables to be configured](https://roots.io/bedrock/docs/installation/#getting-started) in order to get started.

The `.env` file must be configured with Lando's database settings along with your home URL. Update the following values in your `.env` file:

```plaintext
DB_NAME='wordpress'
DB_USER='wordpress'
DB_PASSWORD='wordpress'
DB_HOST='database'

WP_HOME='https://bedrock.lndo.site'
```

## Setup trusted certificates

Make sure to follow the instructions in the Lando docs for [Trusting the CA](https://docs.lando.dev/core/v3/security.html#trusting-the-ca) to avoid warnings on your browser when visiting your site.

## Start your Lando site

Run `lando start`, and then your site will be accessible from `https://bedrock.lndo.site/`.
