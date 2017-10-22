---
ID: 6156
post_title: FastCGI Caching
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/fastcgi-caching/
published: true
post_date: 2015-09-03 18:11:08
---
You can enable caching for your site by changing the cache settings under each site key. Using caching provides substantial speed improvement once pages are cached. The full settings looks like this: 

```yml
cache:
  enabled: false
  duration: 30s
  skip_cache_uri: /wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in
```

The `duration` parameter control how long your pages will stay in the cache. You should generally keep this value low (the default is 30 seconds), unless your content doesn't change frequently. Lowering the duration to `1s` will make the cache more like a DDOS protection; meaning that if you have a sudden spike of traffic, only one request will hit the back-end per second instead of the full load. The whole setup is "micro-cache" oriented, so there is no means of flushing the cache.

The `skip_cache_uri` is a regex that will be used to tell Nginx **not** cache pages matching it. Use it if you have sections of your site that you don't want cached (like shopping carts). Override the global `nginx_skip_cache_uri` in `group_vars/all/main.yml` or override `skip_cache_uri` under `cache` to vary it per [WordPress site](https://roots.io/trellis/docs/wordpress-sites/). The default value is shown above.

The `skip_cache_cookie` is a regex that will disable the cache when a cookie match it. Useful for disabling the cache for certain users.

Already cached content will continue be served if your back-end (PHP-FPM) go down.