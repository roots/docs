---
date_modified: 2023-01-30 17:32
date_published: 2023-01-30 17:32
description: Acorn allows you to use Laravel's cache, which can be used as an alternative to the WordPress Transients API.
title: Laravel Cache as an Alternative to WordPress Transients
authors:
  - ben
---

# Laravel Cache as an Alternative to WordPress Transients

Acorn provides [Laravel integration with WordPress](/acorn/), which means that certain Laravel components are able to be used within your WordPress site.

Compared to WordPress transients API, [Laravel Cache](https://laravel.com/docs/9.x/cache) provides a more standardized and developer-friendly approach to caching data. It also has a wider range of cache storage options, compared to the WordPress Transients API, which only supports storing data in the WordPress database.

::: tip
Review the [Laravel Cache docs](https://laravel.com/docs/9.x/cache) to get a more detailed understanding about how it works, along with the various ways that the cache can be configured
:::

## Storing data in the cache

```php
use Illuminate\Support\Facades\Cache;

Cache::put('key', 'value', $minutes);
```

## Retrieving data from the cache

```php
use Illuminate\Support\Facades\Cache;

$value = Cache::get('key');
```

## Removing items from the cache

```php
use Illuminate\Support\Facades\Cache;

Cache::forget('key');
```

You can also use Acorn's WP-CLI integration to interact with the cache:

```shell
wp acorn cache:clear
```
