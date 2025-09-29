---
date_modified: 2023-01-27 13:17
date_published: 2015-10-15 16:17
description: Bedrock deployments require running `composer install` to fetch dependencies. Learn deployment workflows for various hosting platforms and CI/CD tools.
title: Deploying WordPress with Bedrock
authors:
  - alwaysblank
  - ben
  - knowler
  - Log1x
  - noplanman
  - swalkinshaw
---

# Deploying WordPress with Bedrock

Running `composer install` from the Bedrock folder must be part of your deployment process.

## Supported deployment tools

These tools include supporting deploying Bedrock out of the box:

- [Trellis](https://roots.io/trellis/) – Recommended if self-hosting WordPress or [hosting with Kinsta](https://kinsta.com/?kaid=OFDHAJIXUDIV).

Other methods need to account for setting the `WP_ENV` [environment variable](environment-variables.md) to `production` when your site is in a production environment.

::: warning Note
Bedrock's [Disallow Indexing mu-plugin](https://github.com/roots/bedrock-disallow-indexing) will prevent indexing of a site when `WP_ENV` is not set to `production`.
:::
