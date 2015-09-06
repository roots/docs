---
ID: 6144
post_title: WP Cron
author: Ben Word
post_date: 2015-09-03 17:19:51
post_excerpt: ""
layout: doc
permalink: https://roots.io/bedrock/docs/wp-cron/
published: true
docs_project:
  - "18"
publish_to_discourse:
  - "0"
---
Bedrock disables the internal WP Cron via `define('DISABLE_WP_CRON', true);`. If you keep this setting, you'll need to manually set a cron job like the following in your crontab file:

`*/5 * * * * curl http://example.com/wp/wp-cron.php`