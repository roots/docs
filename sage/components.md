---
date_modified: 2023-01-27 13:17
date_published: 2021-10-21 13:21
description: Components provide an alternative mental model for handling views and data that is especially conducive to the development of views that are frequently reused.
title: Components
authors:
  - alwaysblank
  - bbuilds
  - ben
  - code23_isaac
  - Log1x
---

# Components

Fundamentally, Components don't do anything you couldn't also accomplish with [partials](blade-templates.md) and [Composers](composers.md), but they provide system of interaction and a mental model that can be more intuitive.
Like Composers and Blade templates, Components are an extension of the Laravel feature, so the [Laravel documentation](https://laravel.com/docs/7.x/blade#components) applies.

Generally a Component consists of: 

1) A Blade template in `/resources/views/components/`.
2) A Composer-like class in `/app/View/Components/`.

The easiest way to create a component is with WP-CLI:

```shell
$ wp acorn make:component ExampleComponent
```

Sage also ships with some examples.

::: tip
You can also create [inline](https://laravel.com/docs/7.x/blade#inline-component-views) and [anonymous](https://laravel.com/docs/7.x/blade#anonymous-components) components, which forgo the template or class respectively.
These would need to be created manually
(the WP-CLI command only creates "traditional" components).
:::

## Usage

A Component in action in a Blade template will look something like this:

```blade
<x-example-component title="Example Component" :image-id="$image"/>
```

The template for that Component might look like this:

```blade
<div {{ $attributes }}>
    <h3>{!! $title !!}</h3>
    @if($imageElement)
        <figure>{!! $imageElement !!}</figure>
    @endif
</div>
```

In turn, the class might look like this:

```php
namespace App\View\Components;

use Roots\Acorn\View\Component;

class ExampleComponent extends Component
{
    public $title;
    public $imageElement;

    protected $imageId;

    public function __construct($title, $imageId = null) {
        $this->title = $title;
        $this->imageId = $imageId;
        $this->imageElement = $this->getImage();
    }

    protected function getImage()
    {
        if (!is_numeric($this->imageId)) {
            return false;
        }
        
        return wp_get_attachment_image($this->imageId, 'medium_large');
    }
}
```

## Argument and attribute names

The names of the arguments in the definition of your Component's `__construct()` method must match the names of the attributes you use to pass data to your Component tag.

::: warning Note
Component constructor arguments should be specified using `camelCase`, while `kebab-case` should be used when referencing the argument names in your HTML attributes. [Laravel documentation](https://laravel.com/docs/9.x/blade#casing)
:::


In the above example

```blade
<x-example-component title="A Component"/>
```

will work, but

```blade
<x-example-component theTitle="A Component"/>
```
will throw an error.

The attributes used to pass data to your Component tag can be in any order, so long as the names are correct:

```blade
<x-example-component title="The Title" :image-id="$image"/>
<x-example-component :image-id="$image" title="The Title"/>
```

These are equivalent.

## Passing data

By default, anything passed to an attribute on a Component tag will be treated as a string.
So if you do this:

```blade
<x-example-component title="$variable"/>
```

Your component will treat that as a string containing `$variable`, _not_ whatever the contents of `$variable` is.

If you need to pass non-string data, just prefix your attribute with a colon, and its value will be evaluated as PHP:

```blade
<x-example-component :title="$variable"/>
<x-example-component :title="get_my_title()"/>
<x-example-component :title="TITLE_CONSTANT"/>
```

::: warning Note
Because your argument is now evaluated as PHP, you _don't_ want to pass a simple string, or PHP will try and evaluate it:

```blade
<x-example-component :title="Uh oh"/>
```
This will throw an error when it tries to evaluate `Uh oh` as PHP.
:::

## Data in views

The view for your Component
(in the above example, `/resources/views/components/example-component.blade.php`)
does _not_ receive the arguments you pass to the Component tag;
The data it has access to is limited to any `public` properties you've set on your class.

So remember to set those properties, or your view won't have the data you need!

## Other attributes

In the Component tag, you use attributes to pass data to your component, but you can also add other, arbitrary attributes as well.
These attributes will be put in an "attribute bag" which you can then access in your Component view with the special `$attributes` variable.
If you echo the variable it will print out each attribute and its value, which is very useful for things like passing CSS selectors to your Components:

```blade
<x-example-component title="Styled Component" 
    class="bg-color-red text-color-white"/>
<!-- yields... -->
<div class="bg-color-red text-color-white">
...
```

You can do many other things with attributes that are described in the [Laravel documentation](https://laravel.com/docs/7.x/blade#managing-attributes).
