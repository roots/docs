---
ID: 7782
post_title: Deploying Bedrock
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/deploying-bedrock/
published: true
post_date: 2015-10-15 16:17:33
---
Running `composer install` from the Bedrock folder must be part of your deployment process.

## Supported deployment tools

These tools include supporting deploying Bedrock out of the box:

* [Trellis](https://roots.io/trellis/)<br> Recommended if self-hosting WordPress or [hosting with Kinsta](https://kinsta.com/?kaid=OFDHAJIXUDIV)<br><br>
* [bedrock-capistrano](https://github.com/roots/bedrock-capistrano)<br> Recommended if restricted to a shared webhost ([screencast on deploying WordPress with Capistrano](https://roots.io/screencasts/deploying-wordpress-with-capistrano/))

Other methods need to account for setting the `WP_ENV` [environment variable](https://roots.io/bedrock/docs/environment-variables/) to `production` when your site is in a production environment.

⚠️ **NOTE: Bedrock's [Disallow Indexing mu-plugin](https://github.com/roots/bedrock/blob/master/web/app/mu-plugins/disallow-indexing.php) will prevent indexing of a site when `WP_ENV` is not set to `production`.**

## Supported WordPress hosts

The following is a list of known hosts that support Bedrock:

* [**Kinsta**](https://roots.io/guides/deploying-to-kinsta-with-trellis/) (supports Bedrock and Trellis and  [sponsors us on Patreon](https://patreon.com/rootsdev))
* [fortrabbit](https://help.fortrabbit.com/install-wordpress-4-pro#toc-install)