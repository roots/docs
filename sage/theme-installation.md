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
publish_to_discourse:
  - "0"
---
From your WordPress themes directory, clone the [git repo](https://github.com/roots/sage) to a new folder named after your theme:

```
git clone https://github.com/roots/sage.git theme-name
```

If you don't use [Bedrock](https://roots.io/bedrock/), you'll want to add the following to your `wp-config.php` on your development installation:

```php
define('WP_ENV', 'development');
```