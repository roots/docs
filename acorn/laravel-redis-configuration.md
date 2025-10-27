---
date_modified: 2025-10-27 10:00
date_published: 2025-10-27 10:00
title: Laravel Redis Configuration for Acorn
description: Configure Redis with Laravel and Acorn in WordPress. Enable high-performance caching using PhpRedis or Predis with your WordPress sites.
authors:
  - ben
  - Log1x
---

# Laravel Redis Configuration for Acorn

Acorn provides [Laravel integration with WordPress](/acorn/), which means that Laravel's Redis setup can be configured to work on your WordPress sites.

We recommend referencing the [Laravel docs on Redis](https://laravel.com/docs/12.x/redis) for a complete understanding of the integration.

## Requirements

The [PhpRedis PECL extension](https://github.com/phpredis/phpredis), or the [`predis/predis`](https://github.com/predis/predis) package are required in order to use Redis.

## Configuration

Add the Laravel Redis package as a dependency:

```shell
$ composer require illuminate/redis
```

Update `config/app.php` to add the Redis Service Provider:

```diff
  Roots\Acorn\Providers\AcornServiceProvider::class,
  Roots\Acorn\Providers\RouteServiceProvider::class,
  Roots\Acorn\View\ViewServiceProvider::class,
+ Illuminate\Redis\RedisServiceProvider::class,
```

Update `config/app.php` to add the Redis facade:

```diff
'aliases' => Facade::defaultAliases()->merge([
    // 'ExampleClass' => App\Example\ExampleClass::class,
+   'Redis' => Illuminate\Support\Facades\Redis::class
])->toArray(),
```
