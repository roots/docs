---
date_modified: 2025-02-27 15:48
date_published: 2015-09-06 07:42
description: Trellis offers built-in FastCGI caching with Nginx microcaching. No WordPress plugin required, with configurable cache skipping for eCommerce pages.
title: FastCGI Caching
authors:
  - ben
  - catgofire
  - Log1x
  - swalkinshaw
  - vdrnn
---

# FastCGI Caching

You can enable caching for your site by changing the cache settings under each site key. Using caching provides substantial speed improvement once pages are cached. The full settings looks like this:

```yaml
cache:
  enabled: false
  duration: 30s
  skip_cache_uri: /wp-admin/|/wp-json/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in
```

The `duration` parameter control how long your pages will stay in the cache. You should generally keep this value low (the default is 30 seconds), unless your content doesn't change frequently. Lowering the duration to `1s` will make the cache more like a DDOS protection; meaning that if you have a sudden spike of traffic, only one request will hit the back-end per second instead of the full load. The whole setup is "micro-cache" oriented, so there is no means of flushing the cache.

The `skip_cache_uri` is a regex that will be used to tell Nginx **not** cache pages matching it. **Use it if you have sections of your site that you don't want cached (like shopping carts)**. Override the global `nginx_skip_cache_uri` in `group_vars/all/main.yml` or override `skip_cache_uri` under `cache` to vary it per [WordPress site](wordpress-sites.md). The default value is shown above.

The `skip_cache_cookie` is a regex that will disable the cache when a cookie match it. Useful for disabling the cache for certain users.

Already cached content will continue being served if your back-end (PHP-FPM) goes down.

## Cache-Control Headers

As of [Trellis v1.24.0](https://github.com/roots/trellis/releases/tag/v1.24.0), Nginx now respects Cache-Control headers sent by WordPress and plugins. This means applications can control their own caching behavior by setting appropriate Cache-Control headers in their HTTP responses.

For e-commerce sites using WooCommerce, Easy Digital Downloads, or similar plugins that properly set Cache-Control headers on dynamic pages (like cart, checkout, and account pages), this can simplify cache configuration by reducing the need for extensive `skip_cache_uri` and `skip_cache_cookie` settings.

## Example cache configurations

### WooCommerce

Disable the cache for `/store/`, `/cart/`, `/my-account/`, `/checkout/`, `/addons/`, and when items are in the cart:

```yaml
cache:
  enabled: true
  skip_cache_uri: /wp-admin/|/wp-json/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml|/store.*|/cart.*|/my-account.*|/checkout.*|/addons.*
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in|woocommerce_cart_hash|woocommerce_items_in_cart|wp_woocommerce_session_
```

Alternatively, if you're using a recent version of WooCommerce that sets appropriate Cache-Control headers, you may be able to simplify this configuration by relying on those headers instead of extensive URI and cookie patterns.

### Easy Digital Downloads

Disable the cache for `/checkout/` and when items are in the cart:

```yaml
cache:
  enabled: true
  skip_cache_uri: /wp-admin/|/wp-json/|/checkout/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in|edd_items_in_cart
```

Like with WooCommerce, if your version of Easy Digital Downloads sets Cache-Control headers correctly, you may be able to simplify this configuration.
