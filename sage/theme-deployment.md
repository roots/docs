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
---
To deploy a Sage theme you'll need to make sure two things are covered:

1. Run `composer install` from the theme directory on the remote server
2. Copy over production theme assets

## Generating production ready theme assets

Generate production ready assets with `yarn run build:production`, which will build your assets with versioned filenames.

If you use [Trellis](/trellis/), you can build your assets locally, then copy them to the remote server during deployment. [See the `build-before.yml` example hook](https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml) in Trellis.

### Additional resources

[Build Steps and Deployment](http://austinpray.com/ops/2015/01/15/build-steps-and-deployment.html) by Austin Pray
