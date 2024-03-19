---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Adding Routes
authors:
  - ben
---

# Adding Routes

Radicle uses Acorn which allows you to register Laravel routes from the `config/web.php` file.

By default, a route is registered for `/welcome/` which serves the Blade template located at `resources/views/welcome.blade.php`.

See [Laravel's routing documentation](https://laravel.com/docs/10.x/routing) for information on registering routes.

::: tip
Acorn's router support is still considered experimental due to limited support of Laravel's router functionality. Once Acorn supports [modifying the current kernel implementation](https://github.com/roots/acorn/issues/276), Radicle will include the default Laravel HTTP kernel along with an example of implementing a route with middleware support.
:::

Since routes in Radicle are considered "virtual pages", WordPress is not aware of how to handle some functionality such as:

* Setting the canonical URL
* Setting the `<title>`
* Adding SEO-related meta data

Make sure to take this into consideration when adding routes to your site. Acorn's router implementation currently contains a `acorn/router/do_parse_request` filter that can be used as a way to communicate data from a Laravel route to WordPress.

In the example below, we're setting the `is_acorn_route` property of the `$wp_query` object to true for any pages that are Acorn routes:

```php
<?php

add_filter('acorn/router/do_parse_request', function ($do_parse) {
    global $wp_query;
    $wp_query->is_acorn_route = true;

    return $do_parse;
});
```
