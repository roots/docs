---
ID: 7782
post_title: Deploying Bedrock
author:
  - Ben Word
post_date:
  - 2015-10-15 16:17:33
post_excerpt:
  - ""
layout: doc
permalink:
  - /bedrock/docs/deploying-bedrock/
published: true
docs_project:
  - "18"
publish_to_discourse:
  - "0"
---
There are two methods to deploy Bedrock sites out of the box:

* [Trellis](https://roots.io/trellis/docs/deploys/)
* [bedrock-capistrano](https://github.com/roots/bedrock-capistrano)

Any other deployment method can be used as well with one requirement: 

`composer install` must be run as part of the deploy process.

Although we recommend using [Trellis](https://roots.io/trellis/), it's not required in order to deploy a Bedrock site. 

If you choose to use Capistrano for deployment, we offer a [screencast on deploying WordPress with Capistrano](https://roots.io/screencasts/deploying-wordpress-with-capistrano/) with more information.