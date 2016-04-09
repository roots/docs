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
## Installing the theme

These instructions assume you're using a [Bedrock](https://roots.io/bedrock/)-based WordPress setup. From the command line, run the following commands from the root of your WordPress site (where `composer.json` exists). If you're using Trellis, make sure to run these commands from within the Vagrant box (`vagrant ssh`) at `/srv/www/<site name>/current`. Create a new theme based on Sage by using Composer's [`create-project`](https://getcomposer.org/doc/03-cli.md#create-project):

```shell
# @ example.com/site
$ composer create-project roots/sage web/app/themes/your-theme-name dev-sage-9
```

Then activate the theme via [wp-cli](http://wp-cli.org/commands/theme/activate/):

```shell
# @ example.com/site
$ wp theme activate your-theme-name
```

## Installing project dependencies

Make sure all dependencies have been installed before moving on:

* [PHP](http://php.net/manual/en/install.php) >= 5.5.x
* [Composer](https://getcomposer.org/download/)
* [Node.js](http://nodejs.org/) >= 0.12.x

From the command line on your host machine (not on your Vagrant box), navigate to your theme directory then run `npm install`:

```shell
# @ example.com/site/web/app/themes/your-theme-name
$ npm install
```

You now have all the necessary dependencies to run the [build process](/sage/docs/theme-development-and-building/#available-build-commands).

### Getting ready for BrowserSync

If you later want to use BrowserSync during `npm run watch` you need to update `devUrl` at the bottom of `assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `https://project-name.dev` you would update the file to read:
```json
...
  "devUrl": "https://project-name.dev",
...
```
