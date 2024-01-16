---
date_modified: 2023-01-27 13:17
date_published: 2018-02-07 09:46
description: Blade is a templating engine from Laravel that's included in Acorn. It allows for template inheritance, sharing data across multiple views, and much more.
title: Blade Templates
authors:
  - alwaysblank
  - ben
  - Log1x
---

# Blade Templates

Sage uses [Laravel's Blade](https://laravel.com/docs/10.x/blade) templating engine.

::: tip
The Blade templating language is described in much more depth in the [Laravel docs](https://laravel.com/docs/10.x/blade), which we recommend you read for a full understanding of how it works. Nearly everything described there should work in Sage.
:::

The following are some of the Blade features you're likely to find yourself using regularly.

## Including

One of the primary features of Blade is the `@include` directive (which also has a few useful variants). `@include` allows you to use a Blade file in any other Blade file, and creates a new scope for each included file.

Variables define in a given view will cascade down to views that it `@includes`, but you can also pass data directly to Blade templates by passing a keyed array as the second argument to the `@include()` directive.
The key names will become the variable names that their values are assigned to.

```blade
@include('partials.example-partial', ['variableName' => 'Variable Value']

<!-- /resources/views/partials/example-partial.blade.php -->

<h1>{{ $variableName }}</h1>
<!-- <h1>Variable Value</h1> -->
```

## Layouts

A layout is a special kind of template that can be extended. It's useful when you have a lot of HTML content surrounding something you want to be dynamic—for instance the header and footer of a site.

```blade
<!-- resources/views/layouts/app.blade.php -->
<html>
  <body>
    <header>
    @section('header')
      @include('partials.nav.primary')
    @show
    </header>
    <main>
      @yield('content')
    </main>
  </body>
</html>

<!-- resources/views/page.blade.php -->
@extends('layouts.app')
@section('header')
  @parent
  @include('partials.nav.page')
@endsection

@section('content')
  <h1>{{ $title }}</h1>
  <div>{!! $content !!}}</div>
@endsection
```

The extending view (`page.blade.php` in this case) can then "insert" its content into these sections to be rendered.

## Passing data to templates

The best way to handle passing data to templates is to use [Composers](composers.md), which allow you to separate data handling and manipulation from the view where that data is used.
With Composers, you can bind data to _any_ Blade template file.

You can also pass data directly to Blade templates when `@include`ing them by passing a keyed array as the second argument to the `@include()` directive.
The key names will become the variable names that their values are assigned to.

```blade
@include('partials.example-partial', ['variableName' => 'Variable Value'])

<!-- /resources/views/partials/example-partial.blade.php -->

<h1>{{ $variableName }}</h1>
<!-- <h1>Variable Value</h1> -->
```

## WP-CLI utility

If you need to clear or compile Blade templates, you can do so with WP-CLI:

```shell
# Compile all Blade templates
$ wp acorn view:cache

# Clear all Blade templates
$ wp acorn view:clear
```

## Additional resources

* [Rendering Blade views for blocks, emails, and more](/acorn/docs/rendering-blade-views/)
