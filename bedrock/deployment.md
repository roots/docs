---
description: Deploying Bedrock requires that `composer install` is run as part of the deployment process.
authors:
  - alwaysblank
  - ben
  - knowler
  - Log1x
  - noplanman
  - swalkinshaw
---

# Deployment

Running `composer install` from the Bedrock folder must be part of your deployment process.

## Supported deployment tools

These tools include supporting deploying Bedrock out of the box:

- [Trellis](https://roots.io/trellis/) – Recommended if self-hosting WordPress or [hosting with Kinsta](https://kinsta.com/?kaid=OFDHAJIXUDIV).

Other methods need to account for setting the `WP_ENV` [environment variable](environment-variables.md) to `production` when your site is in a production environment.

::: warning Note
Bedrock's [Disallow Indexing mu-plugin](https://github.com/roots/bedrock-disallow-indexing) will prevent indexing of a site when `WP_ENV` is not set to `production`.
:::
