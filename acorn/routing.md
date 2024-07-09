---
date_modified: 2024-07-09 12:00
date_published: 2024-06-03 15:00
description: Acorn allows you to use Laravel's routing functionality on your WordPress sites.
title: Routing
authors:
  - ben
---

# Routing

::: tip
See [Laravel's routing documentation](https://laravel.com/docs/10.x/routing) to better understand how routing works in Acorn
:::

Acorn allows you to use Laravel's routing functionality on your WordPress sites, and will automatically handle Laravel routes defined in the `routes/web.php` file if it exists.

Routes are an easier way to implement virtual pages in WordPress.

## Basic routing example

### Create the route file

Create `routes/web.php` with the following:

```php
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application.
|
*/

Route::view('/welcome/', 'welcome')->name('welcome');
```

### Create the view file

Create `resources/views/welcome.blade.php` with the following:

```blade
@extends('layouts.app')

@section('content')
  <h1>Welcome</h1>
@endsection
```

## Configuring SEO elements

Since registered routes are dynamic, WordPress is not aware of how to handle some SEO elements and functionality:

* Setting the canonical URL
* Setting the `<title>`
* Adding SEO-related meta data
* Adding pages to the sitemap

[Laravel's `Route` facade allows you to access information about the route](https://laravel.com/docs/11.x/routing#accessing-the-current-route), which can be used with hooks to populate this data:

```php
/**
 * Set the page <title> for the welcome route
 */
add_filter('pre_get_document_title', function ($title) {
    $name = Route::currentRouteName();
    if ($name === 'welcome') {
        return 'Welcome Page';
    }

    return $name;
});
```

## Route caching

If you're using routes then you should enable [Laravel's route cache](https://laravel.com/docs/10.x/routing#route-caching) during your deployment process:

```shell
wp acorn route:cache
```
