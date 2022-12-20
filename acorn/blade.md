---
description: What is Blade and how does it work?
---

# Blade Templates

Sage uses [Laravel's Blade](https://laravel.com/docs/8.x/blade) templating engine. This gives you access to the Blade templating language, which includes a number of useful features.


:::tip Terminology
In the parlance of Laravel, Acorn, and MVC frameworks in general, what WordPress calls a "template" or "template part" is called a "view." In these documents, we'll be using the term "view," except when specifically referring to something that WordPress would load as a template for something it recognizes as part of the template hierarchy, like an archive, single page, etc. These templates are implemented as views through Acorn, so a file like `archive.blade.php` is both a view and a template, whereas something like `partials/author-meta.blade.php` is just a view because it will only be loaded if another view includes it.
:::

[[toc]]

## Templating Language

The Blade templating language is described in much more depth in the [Laravel docs](https://laravel.com/docs/8.x/blade), which we recommend you read for a full understanding of how it works. Nearly everything described there should work in Acorn.

The following are some of the Blade features you're liking to find yourself using regularly.

### Including

One of the primary features of Blade is the `@include` directive (which also has a few useful variants). `@include` allows you to us a Blade file in any other Blade file, and creates a new scope for each included file.

Variables define in a given view will cascade down to views that it `@includes`, but you can also pass data directly to Blade templates by passing a keyed array as the second argument to the `@include()` directive.
The key names will become the variable names that their values are assigned to.

```html
@include('partials.example-partial', ['variableName' => 'Variable Value']

<!-- /resources/views/partials/example-partial.blade.php -->

<h1>{{ $variableName }}</h1>
<!-- <h1>Variable Value</h1> -->
```

### Layouts

A layout is a special kind of template that can be extended. It's useful when you have a lot of HTML content surrounding something you want to be dynamic—for instance the header and footer of a site.

```html
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

## Composers

Composers are used to compose data before it's passed to a Blade. If you
use [Controllers](https://github.com/soberwp/controller) then you're familiar with a similar concept, although Composers
are somewhat more flexible. One of the major benefits of Composers in a WordPress context is that they allow you to
extract the logic from your views. As with many other Acorn features, it's worth reading through the documentation for
the Laravel feature they're built on: [View Composers](https://laravel.com/docs/8.x/views#view-composers).

Here is a trivial example:

```php
<?php
// page.php
$title = get_the_title();
if ($post->post_parent > 0) {
    $title = sprintf(
        "%s > %s", 
        get_the_title($post->post_parent), get_the_title()
        );
}?>
<h1><?php echo  $title ?></h1>
<div><?php the_content() ?></div>
<?php 
$children = get_posts([
    'post_type' => 'page',
    'post_parent' => get_the_ID(),
]);
if (count($children) > 0) :
echo '<ul>';
foreach ($children => $child) : ?>
    <li><a href="<?php echo get_permalink($child) ?>">
        <?php echo get_the_title($child) ?>
    </a></li>
<?php endforeach;
echo '</ul>';
endif; ?>
```

*Using normal WordPress templates.*

```php
<?php
// app/View/Composers/Page.php
namespace App\View\Composers;
use Roots\Acorn\View\Composer;

class Page extends Composer
{
    public function with(): array
    {
        return [
            'title' => $this->title(),
            'children' => $this->children(),
        ]
    }
    
    public function title(): string
    {
        $post = get_post();
        $title = get_the_title($post->ID);
        if ($post->post_parent > 0) {
            $title = sprintf(
                "%s > %s", 
                get_the_title($post->post_parent), $title
            );
        }
        
        return $title;
    }
    
    public function children(): ?array
    {
        $children = get_posts([
            'post_type' => 'page',
            'post_parent' => get_the_ID(),
        ]); 
        
        if (count($children) === 0) {
            return null;
        }
        
        return array_map(function($child) {
            return [
                'url' => get_permalink($child),
                'title' => get_the_title($child),
            ];
        }, $children);
    }
}
```

```html
<!-- views/page.blade.php -->
<h1>{{ $title }}</h1>
<div>@php the_content() @endphp</div>
@if($children)
<ul>
  @foreach($children as ['url' => $url, 'title' => $title])
  <li><a href='{{ $url }}'>{{ $title }}</a></li>
  @endforeach
</ul>
@endif
```

*Using Blade views and Composers.*

This separation of concerns has many benefits, such as allowing for easier collaboration and allowing for easier re-use
of components.

### Creating a Composer

Composers need to be included in your script in some way. In Sage, they're autoloaded by Composer, and we recommend
using this mechanism to load them if at all possible. Sage is preconfigured to load Composers from
the `app/Views/Composers/` directory in your theme, but you can load them from wherever you like by specifying the
appropriate mapping in `composer.json`:

```json
"autoload": {
"psr-4": {
"App\\": "some/other/directory/"
}
}
```

You'd then create your Composers in `some/other/directory/Views/Composers/`.

Say you want to create a composer for your generic page template. You would create a php file called `Page.php` and add
the following:

```php
// The namespace must align with the directory and file structure.
namespace App\View\Composers;
// This is the base Composer class provided by Acorn that we will extend.
use Roots\Acorn\View\Composer;
// Here we create the actual Composer, although for the moment it does nothing.
class Page extends Composer {}
```

This Composer will now be loaded by Acorn, but it won't actually do anything.

### Attachment to Views

In order for Composers to provide data to views, they need to know which view (or views) they are attached to. Acorn
provides two ways to do this:

- Autoloading
- The `views` property

#### Autoloading

In short, autoloading determines what Composer to associate with a view by matching their filenames and paths. For
instance:

| View | Composer |
|------|----------|
| `page.blade.php` | `Page.php` |
| `single-event.blade.php` | `SingleEvent.php` |
| `partials/author/meta.blade.php` | `Partials/Author/Meta.php` |

> The kebab-case naming convention for views is largely just that—convention—but Composers and their paths must be names in accordance with [PSR-4](https://www.php-fig.org/psr/psr-4/).

Autoloading is the simplest and easiest way to associate Composers and views, and it requires the least boilerplate, but
it does have one major weakness: It can only be used to associate a Composer with a single view.

#### The `views` Property

The `views` property on a Composer allows for a much more declarative system of association: You tell Acorn which
specific files to associate with, rather than relying on an interpolated assumption.

```php
class ExcitingStuff extends Composer {
    protected static $views = [
        // views/partials/content-modal.blade.php
        'partials.content-modal',
        // views/page.blade.php
        'page',
        // Any views in views/partials/ beginning with 'content-'
        'partials.content-*',
        // All views
        '*',
    ]
}
```

The data in the Composer will be passed to all the views identified by this array. In this example, many of these views are redundant: `partials.content-*` will include `partials.content-modal` and `*` will include all the other files.

This can be used interchangeably with the Autoloading technique. Usually, Autoloading is quicker and simpler, but this can be useful—and in some cases necessary, as when you need to load a Composer for a view that has a name that would be illegal as a class, such as `404.blade.php`.

### Passing Data

Data moves through Composers and views in Acorn like a waterfall. Or a set of nesting dolls. Or boxes within boxes within boxes. Pick whichever metaphor appeals to you, but the basic idea is this:

- Each view establishes its own scope
- Each view inherits data from any views "above" it (that is, views that use it via `@include` or a similar mechanism)
- Data from a view cannot move "up" (i.e. to views that use it)
- ...It can only move "down" (i.e. to views that _it_ uses)

You can think of each view as a PHP function: It can receive data (function arguments) and it can create its own internal variables, which it can pass to other functions it calls, but anything outside that function cannot access its internal variables.

Composers aren't necessary for any of these: Blade itself establishes this scope and data flow. A composer allows you to modify this flow in two important ways:

- Modify data that the view is receiving
- Pass new data to the view

Inside a Composer you send data to the view with one of two methods:

- `with()`
- `override()`

They work in exactly the same way: The method returns a keyed array, and each key in the array will be passed to the view as a variable of the same name, with its value as the contents of the variable. 

```php
// app/View/Composer/Partials/Litany.php
public function with() {
    return [
        'fear' => 'the mind-killer',
    ];
}

// resources/views/partials/litany.blade.php
{{ $fear }} // the mind-killer
```

The only difference is when this data is added:

- `with()` is added _before_ inherited data is merged in, meaning that data passed in from another view will override data with the same key.
- `override()` is added _after_ inherited data is merged in, meaning that it will override data passed in with the same key.

To use the above example:

```html
<!-- Composer using with() -->
@include('partials.litany', [
  'fear' => 'the little death that brings total obliteration'
])
<!-- the little death that brings total obliteration -->


<!-- Composer using override() -->
@include('partials.litany', [
  'fear' => 'the little death that brings total obliteration'
])
<!-- the mind-killer -->
```
#### WordPress

Composers are executed in a context where WordPress functions like `get_the_ID()` and `the_post()` will return expected values, so you can retrieve data from WordPress much like you normally would.

#### Accessing Inherited Data

The data passed down to a view is also available inside the Composer for you to view and manipulate. To do, this access the `data` property of the Composer instance:

```php
public function with() {
    return [
        'power_type' => $this->powerType(),
    ];
}

public function powerType()
{
    $planet = $this->data->get('planet');
    if ($planet === 'caladan') {
        return 'sea and air';
    } elseif ($planet === 'arrakis') {
        return 'desert';
    }
}
```

## Components

We suggested thinking of views as, metaphorically, functions, to illustrate how scoping and data flow works, but Components take that metaphor even further, creating a construct that behaves even more like function-ized version of a template. Like Composers, Components are built on a [Laravel feature of the same name](https://laravel.com/docs/8.x/blade#components).

To illustrate, here is an example:


```php
namespace App\View\Components;
use Roots\Acorn\View\Component;
class Heighliner extends Component
{
    public $navigators;
    public $captain;
    
    public function __construct($navigators, $captain)
    {
        $this->navigators = (int) $navigators;
        $this->captain = get_post($captain)->post_content;
    }
    
    public function render()
    {
        return $this->view('components.heighliner');
    }
}
```
*Component class*

```html
<div {{ $attributes->merge([ 'class' => 'border-2' ]) }}>
  <h1>{{ $captain }}</h1>
  <div>Number of Navigators: {{ $navigators }}</div>
  <h2>Content</h2>
  <div>{{ $content }}</div>
</div>
```
*Component Blade view*

```html
<x-heighliner navigators="4" :captain="$id" class="padding-md margin-md">
  <ul>
      <li>10 Frigates</li>
      <li>20 Lighters</li>
      <li>3 Legions of Sardaukar</li>
  </ul>
</x-heighliner>
```
*Component usage in view*

```html
<div class="border-2 padding-md margin-md">
  <h1>Xerxes</h1>
  <div>Number of Navigators: 4</div>
  <h2>Content</h2>
  <div>
    <ul>
      <li>10 Frigates</li>
      <li>20 Lighters</li>
      <li>3 Legions of Sardaukar</li>
    </ul> 
  </div>
</div>
```
*Output*

A component is represented in a Blade template as a custom HTML element, the tag name of which is prefixed with `x-`. Attributes on the element when it is used in a template are passed to the Component's class, which receives them as arguments to its `__construct()` method. Prefixing an attribute with `:` allows you to pass variables and PHP expressions to it. Any public properties on the class are available to the Component's view as variables.

In the Component tag, you use attributes to pass data to your component, but you can also add other, arbitrary attributes as well.
These attributes will be put in an "attribute bag" which you can then access in your Component view with the special `$attributes` variable.
If you echo the variable it will print out each attribute and its value, which can be very useful if you want to dynamically set particular HTML attributes on the rendered Component. You can also use the `merge()` method on the `$attributes` variable to set some values that will be merged with any that are passed in—as demonstrated above with `class`.

:::warning Note
Because attributes prefixed with `:` will be evaluated a PHP, you _don't_ want to pass a simple string to them, or PHP will try and evaluate it:
```html
<x-example-component :title="Uh oh"/>
```
This will throw an error when it tries to evaluate `Uh oh` as PHP.
:::


### Components vs Composers

You may have noticed that a Component just seems like a fancy Composers, and you'd be correct: At the end of the day, there's not really anything a Component does that you couldn't do with some creative use of a Composers (except maybe the way you call them like they're HTML elements). But in addition to the syntactic sugar Components provide, the also offer a useful metal model to look at reusable parts of your views. They're easy to re-use, and their interface makes a lot of sense in the context of certain re-usable view elements. A particularly good use-case for Components is for re-usable partials that get or generate content internally, but have sections where you want to provide rich-tech content:

```html
<x-post-preview :post-id="$latest_post">
  <p>Checkout out the <b>latest post</b> from our blog.</p>
  <a href="{{ $blog_url }}">Read More</a>
</x-post-preview>
```
