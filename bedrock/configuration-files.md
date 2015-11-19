---
ID: 6141
post_title: Configuration Files
author: Ben Word
post_date: 2015-09-03 17:16:50
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/configuration-files/
published: true
docs_project:
  - "18"
publish_to_discourse:
  - "0"
---
The root `web/wp-config.php` is required by WordPress and is only used to load the other main configs. Nothing else should be added to it.

`config/application.php` is the main config file that contains what `wp-config.php` usually would. Base options should be set in there.

For environment specific configuration, use the files under `config/environments`. By default there are `development`, `staging`, and `production` but these can be whatever you require.

The environment configs are required **before** the main `application` config so anything in an environment config takes precedence over `application`.

Note: You can't re-define constants in PHP. So if you have a base setting in `application.php` and want to override it in `production.php` for example, you have a few options:

* Remove the base option and be sure to define it in every environment it's needed
* Only define the constant in `application.php` if it isn't already defined.