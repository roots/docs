---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Registering Post Types
authors:
  - ben
---

# Registering Post Types

The `config/post-types.php` file is used to register custom post types.

Radicle includes the [Extended CPTs](https://github.com/johnbillion/extended-cpts) library along with a post types service provider to allow for configuring post types from a config.

By default, a `seed` post type is registered. Remove or replace this post type with one that works for your site.

All of the [parameters from Extended CPTs](https://github.com/johnbillion/extended-cpts/wiki/Registering-Post-Types) are supported, and the example post type included in Radicle shows how to override the names used for the `singular`, `plural`, and `slug`.

## Registering multiple post types

In `config/post-types.php` within the `post_types` array, add additional array keys to register multiple post types. In the example below, we are registering two post types: `seed` and `product`.

```php
<?php

return [
    'post_types' => [
        'seed' => [
            'menu_icon' => 'dashicons-star-filled',
            'supports' => ['title', 'editor', 'author', 'revisions', 'thumbnail'],
            'show_in_rest' => true,
            'names' => [
                'singular' => 'Seed',
                'plural' => 'Seeds',
                'slug' => 'seeds',
            ]
        ],
        'product' => [
            'menu_icon' => 'dashicons-cart',
            'supports' => ['title', 'editor', 'author', 'revisions', 'thumbnail'],
            'show_in_rest' => true,
        ],
    ],
];
```
