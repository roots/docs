---
---
Bedrock allows you to disable the internal WP Cron via the `DISABLE_WP_CRON` environment variable. If you enable this setting and disable WP Cron, you'll need to manually set a cron job like the following in your crontab file:

`*/5 * * * * curl http://example.com/wp/wp-cron.php`