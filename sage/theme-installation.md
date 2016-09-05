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
  - "17"
saved_flag:
  - 'a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"1";}";}";}'
publish_to_discourse:
  - "0"
---
Install Sage by copying the project into a new folder within your WordPress themes directory.

Make sure [Composer](https://getcomposer.org/download/) has been installed before moving on.

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```shell
# @ example.com/site/web/app/themes/
$ composer create-project roots/sage your-theme-name 8.4.2
```