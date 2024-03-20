---
date_modified: 2024-03-05 16:41
date_published: 2024-03-05 16:41
description: Use Laravel Livewire Components alongside your WordPress theme or plugin using Acorn.
title: Using Livewire with WordPress
authors:
  - Log1x
---

# Using Livewire with WordPress

With the release of Acorn v4 came the final implementations needed for [Livewire](https://livewire.laravel.com/) support alongside your Acorn-powered WordPress themes and plugins.

In this guide, we will walk through installing Livewire and using a component in a [Sage 10](https://roots.io/sage/) theme.

## Installing Livewire

Start by installing Livewire alongside where you installed Acorn:

```bash
$ composer require livewire/livewire
```

Once installed, Livewire requires you have an `APP_KEY` set in your environment. You can generate this using Acorn's CLI:

```bash
$ wp acorn key:generate
```

After the key has been generated, Acorn needs to rediscover packages. You can do this using Acorn's CLI:

```bash
$ wp acorn package:discover
```

## Enqueueing Livewire

Adding the Livewire styles and scripts can be done using the `@livewireStyles` and `@livewireScripts` directives.

This can be done by [manually inserting](https://livewire.laravel.com/docs/installation#manually-including-livewires-frontend-assets) them inside of `app.blade.php` or by rendering them inside of WordPress hooks using the `Blade` facade.

For this example, we will do it using hooks inside of `app/setup.php`:

```php
use Illuminate\Support\Facades\Blade;

add_filter('wp_head', function () {
    echo Blade::render('@livewireStyles');
});

add_filter('wp_footer', function () {
    echo Blade::render('@livewireScripts');
});
```

## Creating a Component

For this example, we will create a simple searchable **Post List** component. Start by generating the component using Acorn's CLI:

```sh
$ wp acorn make:livewire PostList
```

Inside of `app/Livewire/PostList.php`, we can create a `$query` property to hold our search term and perform a simple `get_posts()` with the query if it is not empty:

```php
<?php

namespace App\Livewire;

use Livewire\Attributes\Url;
use Livewire\Component;

class PostList extends Component
{
    /**
     * The search query.
     */
    #[Url]
    public string $query = '';

    /**
     * Render the component.
     *
     * @return \Illuminate\View\View
     */
    public function render()
    {
        $posts = $this->query ? get_posts([
            'post_type' => 'post',
            'post_status' => 'publish',
            's' => $this->query,
        ]) : [];

        $posts = collect($posts);

        return view('livewire.post-list', compact('posts'));
    }
}
```

In `resources/views/livewire/post-list.blade.php`, we can add some simple markup consisting of an `<input>` for the search `$query` and a loop of any found posts:

```php
<div>
  <input
    wire:model.live="query"
    type="text"
    placeholder="Search posts..."
  >

  @if ($query)
    @if ($posts)
      <p>Found {{ $posts->count() }} result(s) for "{{ $query }}"</p>

      <ul>
        @foreach ($posts as $post)
          <li>
            <a href="{{ get_permalink($post->ID) }}">
              {{ $post->post_title }}
            </a>
          </li>
        @endforeach
      </ul>
    @else
      <p>No results found for "{{ $query }}"</p>
    @endif
  @else
    <p>Start typing to search...</p>
  @endif
</div>
```

Once done, you can add the Livewire component into one of your existing Blade views/templates:

```php
<livewire:post-list />
```

To learn more about Livewire, head over to the official [Livewire Documentation](https://livewire.laravel.com/docs/quickstart).
