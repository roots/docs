---
ID: 7782
post_title: Deploying Bedrock
author: Ben Word
post_date: 2015-10-15 16:17:33
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/deploying-bedrock/
published: true
---
There are two methods to deploy Bedrock sites out of the box:

* [Trellis](https://roots.io/trellis/docs/deploys/)
* [bedrock-capistrano](https://github.com/roots/bedrock-capistrano)

Any other deployment method can be used as well with one requirement: 

`composer install` must be run as part of the deploy process.

Although we recommend using [Trellis](https://roots.io/trellis/), it's not required in order to deploy a Bedrock site. 

If you choose to use Capistrano for deployment, we offer a [screencast on deploying WordPress with Capistrano](https://roots.io/screencasts/deploying-wordpress-with-capistrano/) with more information.

Whatever method you use to deploy, make sure that it involves setting `WP_ENV` to `production` when your site is in a production environment. Several things in the Roots stack, including the [Disallow Indexing mu-plugin](https://github.com/roots/bedrock/blob/master/web/app/mu-plugins/disallow-indexing.php) and [Soil](https://roots.io/plugins/soil/) rely on `WP_ENV` being set to the correct environment. The Disallow Indexing plugin, for instance, will prevent indexing of a site when `WP_ENV` is not set to `production`. For more details on `WP_ENV`, refer back to the "[Environment Variables](/bedrock/docs/environment-variables/)" section of this document.
