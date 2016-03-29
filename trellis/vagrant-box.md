---
ID: 6146
post_title: Vagrant Box
author: Ben Word
post_date: 2015-09-03 17:38:19
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/vagrant-box/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"19";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
By default, the example `Vagrantfile` now uses the `ubuntu/trusty64` box. Formerly, it used a custom `roots/bedrock` box, which was the regular `ubuntu/trusty64` base box pre-provisioned with this playbook (except for the `wordpress-sites` role) in order to speed the provisioning process. The rationale for switching back to the regular `ubuntu/trusty64` box is documented in [#260](https://github.com/roots/trellis/pull/260).