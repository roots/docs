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
From the command line, run the following commands from the root of your WordPress site (where `composer.json` exists). These instructions assume you're using a [Bedrock](https://roots.io/bedrock/)-based WordPress setup. If you're using Vagrant, make sure to run these commands from the Vagrant box (`vagrant ssh`). Create a new theme based on Sage by using Composer's [`create-project`](https://getcomposer.org/doc/03-cli.md#create-project):

```shell
# @ example.com/site
$ composer create-project roots/sage web/app/themes/your-theme-name dev-sage-9
```

Then activate the theme via [wp-cli](http://wp-cli.org/commands/theme/activate/):

```shell
# @ example.com/site
$ wp theme activate your-theme-name
```
