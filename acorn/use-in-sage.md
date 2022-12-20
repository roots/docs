---
description: How does the Sage starter theme leverage Acorn?
---

# How is Acorn used in Sage?

[Sage](https://roots.io/sage/) is a WordPress starter theme that provides you with tools for a modern, satisfying development workflow. One of those tools is Acorn. Now that you know [what Acorn is](/acorn/2.x/what-is-acorn), you may be wondering: How does Sage use it?

[[toc]]

## Templating

Through [Blade](https://laravel.com/docs/8.x/blade), Acorn provides a robust templating system that sits on top of and integrates with the WordPress template hierarchy. Sage provides the logic to load top-level template files (those in `resources/views/`) [just as you expect in WordPress](https://developer.wordpress.org/themes/basics/template-hierarchy/), but Acorn opens up the capabilities of Blade—[sections](https://laravel.com/docs/8.x/blade#defining-a-layout), [extends](https://laravel.com/docs/8.x/blade#extending-a-layout), [directives](https://laravel.com/docs/8.x/blade#blade-directives), [components](https://laravel.com/docs/8.x/blade#components), and more. 

One of the simplest but most useful features of blade is the ability to include any other Blade template files and pass scoped variables to them:

```html
<!-- /resources/views/partials/author.blade.php -->
<div><h2>{{ $name }}</h2></div>

<!-- /resources/views/single.blade.php -->
<h1>{{ get_the_title() }}</h1>
@include('partials.author', ['name' => 'George Orwell'])

<!-- Renders as... -->
<h1>1984</h1>
<div><h2>George Orwell</h2></div>
```

> **`get_template_part()`**
>
> The core WordPress function `get_template_part()` has, since 5.5.0, allowed passing a third `$args` parameter, which is made available to included template parts. This is superficially similar to some of Blade's template-including functionality, but Blade's integration with Composers, as well as built-in scoping and variable generation inside of scoped templates, and many other features, make it much more powerful. In other words, if you've liked the new `get_template_part()` you're going to love `@include()`.

For a more in-depth discussion of Blade and what it can offer, see the [Blade](/acorn/2.x/blade) section of these docs.

## View Data Composition

Other popular website frameworks have long separated logic from views, but WordPress templates have always tied the two together, complicating the structure and mental model of theme construction. No longer: With Acorn and Sage you can easily separate your views—Blades—from your logic—Composers. A Composer can be associated with a view (or with several views) and used to provide data to them, allowing you to get, shape, and modify the data however you see fit.

```php
// app/View/Composers/Single.php
namespace App\View\Composers;
use Roots\Acorn\View\Composer;

class Single extends Composer
{
  public function with()
  {
    return [
      'title' => $this->title(),
    ];
  }

  public function title()
  {
    return get_the_title();
  }
}
```

```html
<!-- resources/views/single.php -->
<h1>{{ $title }}</h1>
```

In this case, the Composer is automatically associated with the view because they share a filename and a path. This will work for any view and Composer. The basic rules are:

- The Composer class name and file name should match as per PSR-4
- The Composer class/file name should be a CamelCase version of the view's kebab-case name.
- The Composer file should have the same directory path from its "root" as the view does from its "root". The Composer root is `app/View/Composers/` and the view root is `resources/views/`.

For a more in-depth discussion of Composers and their interaction with Blades, see the [Composers](/sage/docs/composers/) section of these docs.

## Asset Handling

Acorn provides a [system for handling various assets](https://github.com/roots/acorn/tree/main/src/Roots/Acorn/Assets), but in most cases you'll be using it to handle things like CSS, JS, and image files. The asset system integrates with Sage's build process to allow easy access to hashed assets via their original filename. 
