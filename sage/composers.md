---
description: Composers allow you to pass scoped data to views of any kind--templates, partials, etc.
---

# Composers

Composers, also sometimes called View Composers, are essentially identical to the [Laravel system of the same name](https://laravel.com/docs/7.x/views#view-composers).
They allow you to pass data to views (blade templates), scoping that data to that view (and any views it subsequently includes).
If you're familiar with [Sage 9's data filters](https://roots.io/sage/docs/blade-templates/#passing-data-to-templates), or the [Controller package](https://github.com/soberwp/controller) often used with Sage 9, then Composers are a similar concept, but much more powerful: 
Instead of only allowing data binding to top-level WordPress templates, Composers allow you target _any_ view.

## Construction

::: warning Note
Composers are autoloaded, which means their naming needs to conform to the [PSR-4 standard](https://www.php-fig.org/psr/psr-4/).
:::

If you're using WP-CLI, you can create composers from the command line:

```shell script
wp acorn make:composer ExampleComposer
```

This would create a Composer called `ExampleComposer` in `app/View/Composers/`.

If you're not using WP-CLI, the most basic Composer looks like this:

```php
// app/View/Composers/ExampleComposer.php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class ExampleComposer extends Composer
{}
```

This composer doesn't do anything yet, though, so let's give it some functionality.

```php
class ExampleComposer extends Composer
{
    /**
     * This tells the Composer that it should bind data to the 'example'
     * partial.
     */
    protected static $views = [
        'partials.example',
    ];
    
    /**
     * This will make the variable `$roots` available in the 'example' partial
     * with the value described here.
     */
    public function with()
    {
        return [
            'roots' => "Tools for modern WordPress development",
        ];
    }
}
```

Because that variable is scoped to `example.blade.php`, we'll also see the following behavior:

```html
<!-- resources/views/content.blade.php -->
{{ $roots }}
<!-- Throws an error because the variable is not defined -->

@include('partials.example')
```

```html
<!-- resources/views/partials/example.blade.php -->
<h1>{{ $roots }}</h1>
<!-- <h1>Tools for modern WordPress development</h1> -->

@include('partials.example2')
```

```html
<!-- resources/views/partials/example2.blade.php -->
<div>{{ $roots }}</div>
<!-- <div>Tools for modern WordPress development</div> -->
<!-- Variable is defined in this context because it inherits 
    it from example.blade.php -->
```

## Data sources

We've seen how data can be bound to views, but we only returned a hard-coded string.
Usually you'll want something more involved than that.

### WordPress

Composers are executed in a context where WordPress functions like `get_the_ID()` and `the_post()` will return expected values, so you can retrieve data from WordPress much like you normally would. 

### Inherited data

Inside of a Composer, you can easily access data that has been passed to or inherited by the view through the `data` property:

```php
class Example2 extends Composer 
{
    ...
    public function with()
    {
        return [
            'better_roots' => str_replace(
                'modern', 
                '*awesome*', 
                $this->data->get('roots')
            ),
        ];
    }
}
```

```html
<!-- resources/views/partials/example2.blade.php -->
<div>{{ $better_roots }}</div>
<!-- <div>Resources for *awesome* WordPress development</div> -->
```

### "Automatic" view selection

You can always define what view a Composer will be bound to using the `$views` property to list the name(s) of the views.
However, if your Composer will target only a single view, you can save yourself a few lines of code.
Sage will attempt to match Composers to views based on some simple file path logic:
If your view and Composer share the same path segments and name, they'll be automatically bound together.

For example, if your view is a partial at `/resources/views/partials/page-header.blade.php`, a Composer at `/app/View/Composers/PageHeader.php` will be automatically bound to it.
In other words:
- Match paths below `/resources/views` and `/app/View`.
- Convert the `kebab-case` of view file names to the `PascalCase` of Composers.

### `with()` vs `override()`

You've seen `with()` used above to pass data to views, but it has a more aggressive sibling calling `override()` which does the same thing--except that it will replace data inherited by, or passed to, the view while `with()` will not.

```html
<!-- /resources/views/page.blade.php -->
@include('partials.example', ['roots' => "Resources for modern WordPress development"])

<!-- /resources/views/partials/example.blade.php -->
<h1>{{ $roots }}</h1>
<!-- <h1>Resources for modern WordPress development</h1> -->
```

Using `with()`:
```php
class Example extends Composer
{
    public function with()
    {
        return [
            'roots' => "An amazing stack!",
        ];
    }
}
```
```html
<!-- /resources/views/partials/example.blade.php -->
<h1>{{ $roots }}</h1>
<!-- <h1>Resources for modern WordPress development</h1> -->
<!-- The same output! -->
```

Using `override()`:
```php

class Example extends Composer
{
    public function override()
    {
        return [
            'roots' => "An amazing stack!",
        ];
    }
}
```
```html
<!-- /resources/views/partials/example.blade.php -->
<h1>{{ $roots }}</h1>
<!-- <h1>An amazing stack!</h1> -->
```
