---
date_modified: 2025-10-01 00:00
date_published: 2025-10-01 00:00
description: Use Laravel's Eloquent ORM in WordPress with Acorn. Create models for WordPress posts, users, and custom tables with relationships, scopes, and clean query syntax.
title: Using Eloquent Models in WordPress
authors:
  - ben
---

# Using Eloquent Models in WordPress

Acorn brings Laravel's powerful Eloquent ORM to WordPress, allowing you to interact with WordPress data using clean, expressive syntax. Create models for posts, users, custom tables, and more with relationships, scopes, and all the Eloquent features you love.

We recommend referencing the [Laravel docs on Eloquent](https://laravel.com/docs/12.x/eloquent) for a complete understanding of the ORM.

## Creating your first model

Since Acorn doesn't include the `make:model` command, you'll need to create model files manually. Create a new PHP file in the `app/Models/` directory with the following structure.

## WordPress post model

Here's an example of an Eloquent model for WordPress posts:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'post_title',
        'post_content',
        'post_status',
        'post_type',
        'post_author',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'post_author');
    }

    public function meta()
    {
        return $this->hasMany(PostMeta::class, 'post_id');
    }

    public function scopePublished($query)
    {
        return $query->where('post_status', 'publish');
    }

    public function scopeOfType($query, $type)
    {
        return $query->where('post_type', $type);
    }
}
```

### Key considerations for WordPress models

When creating models for WordPress tables, keep these points in mind:

- **Table names**: WordPress tables don't follow Laravel naming conventions, so explicitly set the `$table` property
- **Primary keys**: WordPress uses `ID` (uppercase) instead of `id`, so set `$primaryKey = 'ID'`
- **Timestamps**: WordPress handles timestamps differently, so set `$timestamps = false` and handle dates manually
- **Table prefixes**: WordPress table prefixes are handled automatically by WordPress's database configuration

## WordPress user model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'user_login',
        'user_email',
        'user_nicename',
        'display_name',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'post_author');
    }

    public function meta()
    {
        return $this->hasMany(UserMeta::class, 'user_id');
    }
}
```

## Post meta model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostMeta extends Model
{
    protected $table = 'postmeta';
    protected $primaryKey = 'meta_id';
    public $timestamps = false;

    protected $fillable = [
        'post_id',
        'meta_key',
        'meta_value',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
```

## Using models in your application

### Basic queries

```php
// Get all published posts
$posts = Post::published()->get();

// Get posts of a specific type
$pages = Post::ofType('page')->published()->get();

// Get a post with its author
$post = Post::with('author')->find(123);

// Create a new post
$post = Post::create([
    'post_title' => 'Hello World',
    'post_content' => 'This is my first post using Eloquent!',
    'post_status' => 'publish',
    'post_type' => 'post',
    'post_author' => get_current_user_id(),
]);
```

### Working with relationships

```php
// Get a post's author
$post = Post::find(123);
$author = $post->author;

// Get an author's posts
$user = User::find(1);
$posts = $user->posts()->published()->get();

// Get post meta
$post = Post::with('meta')->find(123);
foreach ($post->meta as $meta) {
    echo $meta->meta_key . ': ' . $meta->meta_value;
}
```

## Custom tables

You can also create models for custom database tables:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomTable extends Model
{
    protected $table = 'wp_custom_table';

    protected $fillable = [
        'name',
        'value',
        'status',
    ];
}
```