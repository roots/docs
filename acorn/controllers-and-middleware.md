---
date_modified: 2025-10-01 00:00
date_published: 2025-10-01 00:00
description: Build robust APIs and handle requests with Laravel controllers and middleware in WordPress using Acorn. Clean separation of concerns with validation, authentication, and response formatting.
title: Controllers and Middleware in WordPress
authors:
  - ben
---

# Controllers and Middleware in WordPress

Acorn brings Laravel's controller and middleware system to WordPress, enabling you to build robust APIs, handle complex request logic, and implement clean separation of concerns. Controllers organize your route logic, while middleware provides a convenient mechanism for filtering HTTP requests.

We recommend referencing the [Laravel docs on Controllers](https://laravel.com/docs/12.x/controllers) and [Middleware](https://laravel.com/docs/12.x/middleware) for a complete understanding.

## Creating controllers

### Generate a controller

To create a new controller, use the `make:controller` Artisan command:

#### Create a basic controller

```bash
$ wp acorn make:controller PostController
```

#### Create an API resource controller

```bash
$ wp acorn make:controller PostController --api
```

#### Create a controller with all CRUD methods

```bash
$ wp acorn make:controller PostController --resource
```

This creates a new controller file in `app/Http/Controllers/`.

### Basic controller example

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Post;

class PostController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = Post::published()
            ->latest('ID')
            ->take(10)
            ->get();

        return response()->json($posts);
    }

    public function show(int $id): JsonResponse
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'status' => 'in:draft,publish'
        ]);

        $post = Post::create([
            'post_title' => $validated['title'],
            'post_content' => $validated['content'],
            'post_status' => $validated['status'] ?? 'draft',
            'post_type' => 'post',
            'post_author' => get_current_user_id() ?: 1,
        ]);

        return response()->json($post, 201);
    }
}
```

### Using controllers in routes

Define your routes in `routes/web.php`:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Individual routes
Route::get('/api/posts', [PostController::class, 'index']);
Route::get('/api/posts/{id}', [PostController::class, 'show']);
Route::post('/api/posts', [PostController::class, 'store']);

// Resource routes (generates all CRUD routes)
Route::resource('/api/posts', PostController::class);

// API resource routes (excludes create/edit forms)
Route::apiResource('/api/posts', PostController::class);
```

## Working with WordPress data

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WordPressController extends Controller
{
    public function createPost(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);

        $post_id = wp_insert_post([
            'post_title' => $validated['title'],
            'post_content' => $validated['content'],
            'post_status' => 'publish',
            'post_type' => 'post',
        ]);

        return response()->json(['id' => $post_id], 201);
    }
}
```

## Creating middleware

### Generate middleware

To create new middleware, use the `make:middleware` Artisan command:

```bash
$ wp acorn make:middleware AuthenticateAdmin
```

This creates a new middleware file in `app/Http/Middleware/`.

### Authentication middleware example

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!is_user_logged_in()) {
            return response()->json([
                'message' => 'Authentication required'
            ], 401);
        }

        if (!current_user_can('manage_options')) {
            return response()->json([
                'message' => 'Admin access required'
            ], 403);
        }

        return $next($request);
    }
}
```


## Applying middleware

Apply middleware to routes:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Middleware\AuthenticateAdmin;

Route::post('/api/posts', [PostController::class, 'store'])
    ->middleware(AuthenticateAdmin::class);
```