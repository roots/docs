---
ID: 6132
post_title: Theme Installation
author: Ben Word
post_date: 2015-08-29 18:09:28
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-installation/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"17";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
From your WordPress themes directory, clone the [git repo](https://github.com/roots/sage) to a new folder named after your theme:

```
git clone https://github.com/roots/sage.git theme-name
```

At this point it is a good idea to create a new git branch for your project, so you can keep the master branch of the repository clean and later on merge updates from upstream more easy:

```
git checkout -b my_branch_name
```
