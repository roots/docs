---
ID: 6138
post_title: Theme Deployment
author: Ben Word
post_date: 2015-09-01 19:29:19
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-deployment/
published: true
docs_project:
  - "17"
publish_to_discourse:
  - "0"
---
## Generating production ready assets

Generate production ready assets with `gulp --production`, which will build your assets without the source maps. 

If you use [Trellis](/trellis/), you can build your assets locally, then copy them to the remote server during deployment. [See the `build-before.yml` example hook](https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml) in Trellis.

### Additional resources

[Build Steps and Deployment](http://austinpray.com/ops/2015/01/15/build-steps-and-deployment.html) by Austin Pray