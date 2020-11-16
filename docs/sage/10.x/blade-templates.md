---
description: Want to use Laravel's Blade templating engine in a WordPress theme? Sage's theme templates use Blade, allowing for DRY templates.
---

# Blade Templates

Sage uses [Laravel's Blade](https://laravel.com/docs/7.x/blade) templating engine.

## Passing data to templates

The best way to handle passing data to templates is to use [Composers](composers.md), which allow you to separate data handling and manipulation from the view where that data is used.
With Composers, you can bind data to _any_ Blade template file.

You can also pass data directly to Blade templates when `@include`ing them by passing a keyed array as the second argument to the `@include()` directive.
The key names will become the variable names that their values are assigned to.

```html
@include('partials.example-partial', ['variableName' => 'Variable Value']

<!-- /resources/views/partials/example-partial.blade.php -->

<h1>{{ $variableName }}</h1>
<!-- <h1>Variable Value</h1> -->
```

## WP-CLI utility

If you need to clear or compile Blade templates, you can do so with WP-CLI:

```shell script
# compile all Blade templates
$ wp acorn view:cache

# clear all Blade templates
$ wp acorn view:clear
```
