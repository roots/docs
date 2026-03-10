---
date_modified: 2023-01-27 13:17
date_published: 2015-09-06 07:42
description: Disable WordPress's unreliable internal cron with `DISABLE_WP_CRON` in Bedrock and set up proper system cron jobs for scheduled tasks.
title: Managing WP Cron in Bedrock
authors:
  - ben
  - Log1x
  - swalkinshaw
---

# Managing WP Cron in Bedrock

Bedrock allows you to disable the internal WP Cron via the `DISABLE_WP_CRON` environment variable. If you enable this setting and disable WP Cron, you'll need to manually set a cron job like the following in your crontab file:

```plaintext
*/5 * * * * curl https://example.com/wp/wp-cron.php
```
