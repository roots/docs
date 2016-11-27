---
ID: 6145
post_title: Vagrantfile
author: Ben Word
post_date: 2015-09-03 17:37:40
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/vagrantfile/
published: true
---
The example `Vagrantfile` in this project can be kept in this folder, or moved anywhere else such as a project/site folder. Generally if you want to have multiple sites on 1 Vagrant VM, you should keep the `Vagrantfile` where it is (in the trellis dir). If you want to have 1 Vagrant VM *PER* project/site, you should make copies of the `Vagrantfile` and put them into each project's dir. You'd then run `vagrant up` from the project specific directory.