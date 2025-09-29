---
date_modified: 2023-01-27 16:52
date_published: 2021-10-21 13:21
description: Acorn provides Laravel's logging services for WordPress. Configure multiple channels and send logs to files, syslog, Slack, and custom handlers.
title: Laravel Logging in WordPress
authors:
  - ben
---

# Laravel Logging in WordPress

::: tip
We recommend referencing the [Laravel docs on Logging](https://laravel.com/docs/12.x/logging)
:::

The location of your application logs depends on your [directory structure](/acorn/docs/directory-structure/).

For zero-config setups, logs live at `[wp-content]/cache/acorn/logs/`.

For traditional setups, logs live at `storage/logs/`.

## Basic PHP logging example

```php
use Illuminate\Support\Facades\Log;

Log::debug('👋 Howdy');
```

## Basic Blade logging example

```blade
{{ logger('👋 Howdy') }}
```
