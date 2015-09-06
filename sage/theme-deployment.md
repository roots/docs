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

If you use [Trellis](/trellis/), you can copy the `project_pre_build_commands_local` [example](https://github.com/roots/roots-example-project.com/blob/master/ansible/group_vars/production#L11-L17) from the Roots Example Project to build your local assets, then copy them to the remote server during deployment.

### Additional resources

[Build Steps and Deployment](http://austinpray.com/ops/2015/01/15/build-steps-and-deployment.html) by Austin Pray