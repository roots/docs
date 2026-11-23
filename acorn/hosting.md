---
date_modified: 2026-11-23 12:00
date_published: 2026-11-23 12:00
description: Acorn needs a writable storage directory that WP-CLI and web requests share. Configure storage and compiled view paths for managed WordPress hosts.
title: Hosting Acorn on Managed WordPress Hosts
authors:
  - ben
---

# Hosting Acorn on Managed WordPress Hosts

Acorn compiles Blade views and writes caches and logs to its [storage directory](/acorn/docs/directory-structure/) at runtime. Most problems on managed hosts come from one of three things:

- PHP can't write to the storage directory
- WP-CLI and web requests use different storage directories
- Each app server or container has its own disk

With the zero-config setup (Sage's default), the storage directory is `[wp-content]/cache/acorn/`, and Acorn creates it on boot if it's missing. Errors like these mean it isn't writable:

- `file_put_contents(.../framework/views/<hash>.php): Failed to open stream: Permission denied`
- `mkdir(): Read-only file system`
- `The .../framework/cache directory must be present and writable.`

## Choosing a storage path

The storage directory must be writable by PHP-FPM, shared with WP-CLI, and not publicly accessible, since compiled views are PHP files. Set it with the `ACORN_STORAGE_PATH` environment variable or constant. With Bedrock, add it to `config/application.php`:

```php
Config::define('ACORN_STORAGE_PATH', '/path/to/writable/storage');
```

Without Bedrock, `define()` it in `wp-config.php`. To move only compiled views, set `VIEW_COMPILED_PATH` (see [moving individual caches](/acorn/docs/directory-structure/#moving-individual-caches)).

Avoid `wp-content/uploads/` unless it's the only writable location your host offers, since it's publicly accessible.

## Read-only filesystems

If the codebase is read-only after deploy, point `ACORN_STORAGE_PATH` at a writable directory outside the web root, or at `/tmp` if WP-CLI and web requests share it. `/tmp` is usually cleared on restarts and deploys.

You can also precompile views and their loaders with `wp acorn view:cache` during deploy. The `file` cache store and file logs still write at runtime, so point those at a writable path or use another driver. To serve precompiled views from a read-only path, publish Acorn's `config/view.php` and set:

```php
'relative_hash' => true,
'check_cache_timestamps' => false,
```

`relative_hash` names compiled views after their path relative to the Acorn base directory, so views compiled at a different absolute path still match. Views outside the base directory, like a parent theme's when Acorn boots from a child theme, are still tied to their absolute path. `check_cache_timestamps` stops Blade from recompiling when a deploy changes file modification times.

::: warning
On multisite, the default storage directory is shared by every site in the network. If sites use different themes, two views with the same relative path, like `resources/views/index.blade.php`, compile to the same file with `relative_hash` enabled, and `view:cache` clears the whole compiled directory before compiling. Give each site its own `VIEW_COMPILED_PATH` or storage path before precompiling.
:::

## CLI and web see different files

When WP-CLI and PHP-FPM don't share a filesystem, `wp acorn optimize`, `view:clear` and `optimize:clear` report success without affecting what web requests read. Common causes are a private `/tmp` (PHP-FPM sets `PrivateTmp=true` on RHEL-based distributions), WP-CLI running in a separate container, and different users.

To check, clear compiled views from WP-CLI:

```shell
$ wp acorn view:clear
```

Load a page in your browser, then list the compiled views:

```shell
$ wp eval "print_r(glob(config('view.compiled') . '/*.php'));"
```

If the list is empty, WP-CLI and web requests aren't sharing the directory.

## Multiple app servers

Each server or container compiles its own views, and `wp acorn` commands over SSH only affect the server you're connected to. Use [Redis](/acorn/docs/laravel-redis-configuration/) instead of the `file` cache store, and set `LOG_CHANNEL` to `errorlog` or `stderr`.

## Don't deploy your local cache

Never upload your local `[wp-content]/cache/acorn/` or `storage/framework/` directory. Cached manifests and config contain absolute paths from your machine and cause errors like `Target class [sage.view] does not exist`. If you already have, delete them on the server.

## Host notes

Hosts change their platforms often, so check their current documentation too.

- **WP Engine:** web requests [can't always write PHP files](https://wpengine.com/support/wp-engines-security-environment/), and SSH runs in a [separate container](https://wpengine.com/support/ssh-gateway/) where `/tmp` is discarded. Keep storage in your site directory and run `wp acorn view:cache` over SSH after each deploy.
- **Pantheon:** the codebase is [read-only](https://docs.pantheon.io/symlinks-assumed-write-access) on Test and Live. Follow the [`composer install-sage` guide](https://github.com/pantheon-systems/wordpress-composer-managed/blob/default/docs/Installing-Sage.md), which links Acorn's cache to uploads.
- **WordPress VIP:** [web containers are read-only](https://docs.wpvip.com/guidebooks/develop-on-wpvip/wpvip-infrastructure/) and WP-CLI [runs in its own container](https://docs.wpvip.com/vip-cli/wp-cli-with-vip-cli/cli-commands-at-scale/). Set `ACORN_STORAGE_PATH` to a directory under `/tmp`. Each container compiles its own views, and `wp acorn` commands can't clear them.
- **Pressable:** Acorn needs PHP's [filesystem permissions](https://pressable.com/knowledgebase/understanding-php-filesystem-permissions/) set to Read/Write, the default.
- **RHEL, CentOS, AlmaLinux, Rocky Linux and Fedora:** PHP-FPM has a private `/tmp`, so don't put Acorn's storage under `/tmp`.
