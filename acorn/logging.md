---
description: Acorn allows you to use Laravel's logging services for logging messages to files, the system error log, and even Slack.
---

# Logging

::: tip
We recommend referencing the [Laravel docs on Logging](https://laravel.com/docs/8.x/logging)
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
