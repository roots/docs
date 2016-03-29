---
ID: 7809
post_title: WP Cron
author: Ben Word
post_date: 2015-10-16 10:47:45
post_excerpt: ""
layout: doc
permalink: https://roots.io/bedrock/docs/wp-cron/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"18";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
Bedrock allows you to disable the internal WP Cron via the `DISABLE_WP_CRON` environment variable. If you enable this setting and disable WP Cron, you'll need to manually set a cron job like the following in your crontab file:

`*/5 * * * * curl http://example.com/wp/wp-cron.php`