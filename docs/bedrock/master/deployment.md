---
description: Deploy Bedrock with Trellis, bedrock-capistrano, or any other method as long as `composer install` is run as part of the deployment process.
---

# Deployment

Running `composer install` from the Bedrock folder must be part of your deployment process.

## Supported deployment tools

These tools include supporting deploying Bedrock out of the box:

- [Trellis](https://roots.io/trellis/) – Recommended if self-hosting WordPress or [hosting with Kinsta](https://kinsta.com/?kaid=OFDHAJIXUDIV).
- [bedrock-capistrano](https://github.com/roots/bedrock-capistrano) – Recommended if restricted to a shared webhost. ([screencast](https://roots.io/screencasts/deploying-wordpress-with-capistrano/))

Other methods need to account for setting the `WP_ENV` [environment variable](environment-variables.md) to `production` when your site is in a production environment.

::: warning Note
Bedrock's [Disallow Indexing mu-plugin](https://github.com/roots/bedrock-disallow-indexing) will prevent indexing of a site when `WP_ENV` is not set to `production`.
:::

## Supported WordPress hosts

The following is a list of known hosts that support Bedrock:

- [Kinsta](https://roots.io/guides/deploying-to-kinsta-with-trellis/) supports Bedrock and Trellis and [sponsors us on Patreon](https://patreon.com/rootsdev)
- [fortrabbit](https://help.fortrabbit.com/install-wordpress-4-pro#toc-install)
