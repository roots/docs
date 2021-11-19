---
description: Acorn is a way to use Laravel components inside of WordPress.
---

# What is Acorn?

Acorn is a way to use Laravel components inside of WordPress.

Conceived as a spiritual successor to [`sage-lib`](https://github.com/roots/sage-lib), Acorn seeks to bring elements of the Laravel ecosystem not just to Sage, but to any plugin or theme.

To put it simply, Acorn provides a way to gracefully load a Laravel application container inside of WordPress while respecting the WordPress lifecycle and template hierarchy.

This means you get access to Laravel's artisan commands through the use of [`wp acorn`](wp-cli.md). You can utilize Blade for [on-the-fly rendering](blade.md) of your Blade views. You gain access to [third-party packages](available-packages.md#user-contributed) built specifically for Acorn. And we provide some first-party components as well, such as [view composers](blade#composers) and [assets management](assets-management.md).
