---
date_modified: 2024-06-03 15:00
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

::: warning
Since registered routes are dynamic, WordPress is not aware of how to handle some functionality such as setting the canonical URL, setting the `<title>`, and adding SEO-related meta data. Make sure to take this into consideration when adding routes to your site.
:::

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

Route::get('/welcome/', function () {
    return view('welcome');
});
```

### Create the view file

Create `resources/views/welcome.blade.php` with the following:

```blade
@extends('layouts.app')

@section('content')
  <h1>Welcome</h1>
@endsection
```

