---
description: What is Blade and how does it work?
---

# Blade Templates

tba

> In the parlance of Laravel, Acorn, and MVC frameworks in general, what WordPress calls a "template" or "template part" is called a "view." In these documents, we'll be using the term "view," except when specifically referring to something that WordPress would load as a template for something it recognizes as part of the template hierarchy, like an archive, single page, etc. These templates are implemented as views through Acorn, so a file like `archive.blade.php` is both a view and a template, whereas something like `partials/author-meta.blade.php` is just a view because it will only be loaded if another view includes it.

[[toc]]

## Composers

Composers are used to compose data before it's passed to a Blade. If you
use [Controllers](https://github.com/soberwp/controller) then you're familiar with a similar concept, although Composers
are somewhat more flexible. One of the major benefits of Composers in a WordPress context is that they allow you to
extract the logic from your views. Here is a trivial example:

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
            <li><a href="{{ $url }}">{{ $title }}</a></li>
        @endforeach
    </ul>
@endif
```
*Using Blade views and Composers.*

This separation of concerns has many benefits, such as allowing for easier collaboration and allowing for easier re-use of components.

### Creating a Composer

Composers need to be included in your script in some way. In Sage, they're autoloaded by Composer, and we recommend using this mechanism to load them if at all possible. Sage is preconfigured to load Composers from the `app/Views` directory in your theme, but you can load them from wherever you like by 

### Attachment to Views

In order for Composers to provide data to views, however, they need to know which view (or views) they are attached to. Acorn provides two ways to do this:

- Autoloading
- The `views` property

#### Autoloading

In short, autoloading determines what Composer to associate with a view by matching their filenames and paths. For instance:

| View | Composer |
|------|----------|
| `page.blade.php` | `Page.php` |
| `single-event.blade.php` | `SingleEvent.php` |
| `partials/author/meta.blade.php` | `Partials/Author/Meta.php` |

The kebab-case naming convention for views is largely just that—convention—but Composers and their paths must be names in accordance with [PSR-4](https://www.php-fig.org/psr/psr-4/), regardless of whether you're using autoloading to match Composers and views or not.

#### The `views` Property
