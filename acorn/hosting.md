---
date_modified: 2026-11-23 12:00
date_published: 2026-11-23 12:00
description: Acorn needs a writable storage directory that WP-CLI and web requests share. Configure storage and compiled view paths for managed WordPress hosts.
title: Hosting Acorn on Managed WordPress Hosts
authors:
  - ben
---

# Hosting Acorn on Managed WordPress Hosts

Acorn compiles Blade views and writes caches and logs to disk at runtime. Most problems running Acorn or Sage on managed WordPress hosting come from one of three things:

- PHP can't write to Acorn's [storage directory](/acorn/docs/directory-structure/)
- WP-CLI and web requests read and write different storage directories
- Each app server or container has its own local disk

## What Acorn writes to disk

| What | When it's written | Default location |
| --- | --- | --- |
| Compiled Blade views | First render of each view, or `wp acorn view:cache` | `[storage]/framework/views/` |
| View loaders (`*-loader.php`) | At request time, when a view is handed to WordPress as a template file (for example `comments_template`) | `[storage]/framework/views/` |
| Package and service manifests | First request after the manifest is missing, or `wp acorn package:discover` | `[storage]/framework/cache/` |
| Config, route and event caches | `wp acorn optimize` | `[storage]/framework/cache/` |
| Cache store (`file` driver) | Whenever your code uses the `Cache` facade | `[storage]/framework/cache/data/` |
| Sessions (`file` driver) | Only if you enable sessions | `[storage]/framework/sessions/` |
| Logs (`single` channel) | Whenever something is logged | `[storage]/logs/` |

With the zero-config setup (Sage's default), `[storage]` is `[wp-content]/cache/acorn/`. Acorn creates that directory on boot if it's missing, so if `wp-content` isn't writable, every request will fail.

Typical errors when the storage directory isn't writable:

- `file_put_contents(.../framework/views/<hash>.php): Failed to open stream: Permission denied`
- `mkdir(): Read-only file system`
- `The .../framework/cache directory must be present and writable.`
- `File does not exist at path .../framework/views/<hash>.php`, or a blank page after a deploy

## Choosing a storage path

Acorn's storage directory must be:

1. Writable by the PHP process that serves web requests
2. The same directory WP-CLI uses when you run `wp acorn` commands
3. Not publicly accessible over HTTP, since compiled views are PHP files

Set it with the `ACORN_STORAGE_PATH` environment variable or constant. With Bedrock, add it to `config/application.php`:

```php
Config::define('ACORN_STORAGE_PATH', '/path/to/writable/storage');
```

Without Bedrock, add it to `wp-config.php`:

```php
define('ACORN_STORAGE_PATH', '/path/to/writable/storage');
```

You can also pass it when booting Acorn in your theme's `functions.php`. Prefer the constant or environment variable on read-only filesystems, because Acorn still tries to create the zero-config `[wp-content]/cache/acorn/` directory before `withPaths()` is applied:

```php
Application::configure()
    ->withPaths(storage: '/path/to/writable/storage')
    ->withProviders([
        App\Providers\ThemeServiceProvider::class,
    ])
    ->boot();
```

If only compiled views are the problem, you can move them on their own with the `VIEW_COMPILED_PATH` environment variable. See [moving individual caches](/acorn/docs/directory-structure/#moving-individual-caches) for the full list.

::: warning
Avoid putting Acorn's storage inside `wp-content/uploads/` unless it's the only writable location your host offers. Compiled views are PHP files, and the uploads directory is publicly accessible.
:::

## Read-only filesystems

Some hosts make the codebase read-only after deploy, and only allow PHP to write to the uploads directory and `/tmp`. On these hosts the zero-config `[wp-content]/cache/acorn/` and any `storage/` directory in your theme can't be written to.

Your options, roughly in order of preference:

1. **Point storage at a writable directory outside the web root** if your host provides one.
2. **Point storage at `/tmp`** if your host's WP-CLI and web requests share the same `/tmp` (see below). `/tmp` is usually cleared on restarts and deploys, so treat everything in it as disposable.
3. **Precompile views on deploy** with `wp acorn view:cache`, run somewhere with a working WordPress install, and ship or write them to a path web requests can read. Code that writes at runtime (view loaders, the `file` cache store, file logs) still needs a writable path, so combine this with one of the options above.

When serving precompiled views from a read-only path, publish Acorn's `config/view.php` and adjust two options:

```php
'relative_hash' => true,
'check_cache_timestamps' => false,
```

`relative_hash` makes compiled filenames a hash of each view's path relative to the Acorn base directory, so views compiled at a different absolute path still match. `check_cache_timestamps` stops Blade from trying to recompile a view when its source file is newer than the compiled copy, which can happen when a deploy changes file modification times.

## CLI and web see different files

WP-CLI and PHP-FPM don't always share a filesystem. When they don't, `wp acorn optimize`, `view:cache`, `view:clear` and `optimize:clear` act on files that web requests never read, and they still report success.

Common causes:

- **Private `/tmp`:** on RHEL-based distributions, PHP-FPM's systemd service sets `PrivateTmp=true`, which gives it its own `/tmp` that SSH sessions and WP-CLI can't see. A storage or compiled view path under `/tmp` will differ between the two.
- **Separate containers:** some hosts run SSH and WP-CLI in a different container than the web server.
- **Different users:** files written by WP-CLI as your SSH user may not be writable by the PHP-FPM user, and the other way around.
- **Different absolute paths:** `config:cache` stores absolute paths, so caching config where the codebase lives at a different path than production will break asset and view paths.

The path can look identical from both sides and still point at different directories, which is what happens with a private `/tmp`. To check, clear compiled views from WP-CLI:

```shell
$ wp acorn view:clear
```

Load a page on the site in your browser, then list the compiled views from WP-CLI:

```shell
$ wp eval "print_r(glob(config('view.compiled') . '/*.php'));"
```

If the list is empty, WP-CLI and web requests aren't sharing the directory. Move storage to a path inside your project that both users can write to.

## Multiple app servers

Hosts that run more than one web server or container per site don't share local disk between them. Each server compiles its own views, and running `wp acorn optimize` or `view:clear` over SSH only affects the server you're connected to.

- Use an object cache like [Redis](/acorn/docs/laravel-redis-configuration/) for the `Cache` facade instead of the `file` store
- Send logs to `errorlog` or `stderr` instead of files with the `LOG_CHANNEL` environment variable
- Don't rely on `wp acorn` commands to clear caches on every server; deploys that replace the storage directory, or a storage path under `/tmp` that's cleared on deploy, avoid stale caches

## Don't deploy your local cache

Never upload your local `[wp-content]/cache/acorn/` or `storage/framework/` directory to a server. The cached manifests and config contain absolute paths from your local machine, and they'll cause errors like `Target class [sage.view] does not exist` or missing service providers. Exclude these directories from SFTP and Git deploys. If you've already uploaded them, delete them on the server.

## Hosts without WP-CLI

Acorn doesn't require WP-CLI at runtime. Without it, views compile on first request and the package manifest is built on first boot, as long as the storage directory is writable. You won't be able to run `wp acorn optimize`, so don't commit cached config or routes from another environment.

`wp acorn` commands also need a working WordPress install with the theme or plugin that boots Acorn activated. They will fail on a first deploy before WordPress is installed.

## Host notes

These notes cover what's known to affect Acorn on popular managed hosts. Hosts change their platforms often, so check their current documentation too.

### WP Engine

WP Engine [limits which processes can write to disk](https://wpengine.com/support/wp-engines-security-environment/), and web requests can't always write PHP files, including compiled Blade views. SSH and WP-CLI run in a [separate container](https://wpengine.com/support/ssh-gateway/) where only your site directory persists, and anything written to `/tmp` is discarded.

- Keep storage at a path inside your site directory, and run `wp acorn view:cache` over SSH after every deploy so views are compiled before visitors request them
- Views compiled at request time, such as view loaders, can still fail. If they do, move storage to a temp directory that web requests can write to, and don't rely on `wp acorn` commands over SSH to clear it

### Pantheon

On Test and Live, [the codebase is read-only](https://docs.pantheon.io/symlinks-assumed-write-access) and only `wp-content/uploads` is writable. `/tmp` is [not shared across application containers](https://docs.pantheon.io/guides/filesystem/tmp), and WP-CLI is only available through Terminus.

Pantheon's [Composer-managed WordPress upstream](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/docs/Installing-Sage.md) includes a `composer install-sage` command that symlinks `web/app/cache` to a directory in uploads so Acorn can write to it. Follow that guide rather than configuring paths by hand.

### WordPress VIP

[Web containers are read-only](https://docs.wpvip.com/guidebooks/develop-on-wpvip/wpvip-infrastructure/), and the uploads directory is a remote file service that can't hold Acorn's storage. `/tmp` is writable, but [only reliable for the current request](https://docs.wpvip.com/vip-file-system/local-file-operations/) since containers come and go. WP-CLI [runs in its own container](https://docs.wpvip.com/vip-cli/wp-cli-with-vip-cli/cli-commands-at-scale/).

- Set `ACORN_STORAGE_PATH` to a directory under `/tmp`. Views will be compiled again by each new container
- The `file` cache store is local to each container, so don't rely on it for anything that must persist
- `wp acorn` commands can't warm or clear caches for web containers

### Pressable

Pressable lets you [set PHP's filesystem permissions](https://pressable.com/knowledgebase/understanding-php-filesystem-permissions/) to Read/Write, Read Only, or Only When Logged In. Acorn needs the default Read/Write mode unless you've moved storage somewhere PHP can always write.

### Kinsta

Kinsta provides SSH and WP-CLI access on all plans, and no storage path issues have been reported. Older Acorn versions could hit `open_basedir restriction in effect` errors on Kinsta; upgrade Acorn if you see them.

### Hosts running RHEL, CentOS, AlmaLinux, Rocky Linux or Fedora

The `php-fpm` systemd unit on these distributions sets `PrivateTmp=true`, so PHP-FPM's `/tmp` is not the `/tmp` you see over SSH. Don't put Acorn's storage or compiled views under `/tmp` on these servers.
