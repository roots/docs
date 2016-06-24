---
ID: 6156
post_title: FastCGI Caching
author: Ben Word
post_date: 2015-09-03 18:11:08
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/fastcgi-caching/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}'
---
You can enable caching for your site by changing the cache settings under each site key. Using caching provide substantial speed improvement once the page are cached. The full settings looks like this: 

```yml
cache:
  enabled: false
  duration: 30s
  skip_cache_uri: /wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in
```

The `duration` parameter control how long your pages will stay in the cache. You should generally keep this value low, unless your content doesn't change frequently. Lowering the duration to 1s will make the cache more like a DDOS protection, meaning that if you have a sudden spike of traffic, only one request will hit the back-end per second instead of the full load. The whole setup is "micro-cache" oriented, so there is no means of flushing the cache.

The `skip_cache_uri` is a regex that will be used to tell Nginx to not cache pages matching it. Use it if you have sections of your site that you don't want cached (like shopping carts). Override `skip_cache_uri` in `group_vars/all/main.yml` or the specific environment. The default value is shown above.

The `skip_cache_cookie` is a regex that will disable the cache when a cookie match it. Useful for disabling the cache for certain users.

Already cached content will continue be served if your back-end (PHP-FPM / HHVM) go down.