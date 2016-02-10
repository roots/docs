---
ID: 5332
post_title: Theme Wrapper
author: Ben Word
post_date: 2015-09-01 19:14:17
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-wrapper/
published: true
docs_project:
  - "17"
publish_to_discourse:
  - "0"
---
After reading through this guide, you will:

* Understand the Sage Wrapper and recognize how it extends and complements the WordPress template hierarchy.
* Know what is meant by the DRY Principle, why being DRY bests being WET, and see how most WordPress themes are WET.
* Be able to filter the Sage Wrapper and create a new base template for a Custom Post Type.

## Template Hierarchy

WordPress is pretty smart. Every time you load up a request it will search for the most relevant template available in your theme and load it. This is the [Template Hierarchy](http://codex.wordpress.org/Template_Hierarchy) in action and it enables us to easily customize the appearance of our sites. 

Want to customize a specific page named "About"? Just copy `page.php`, to `page-about.php` and edit away to your heart's content. You only need to look at the success of WordPress to realize that this system works because of its simplicity and accessibility. But it doesn't work perfectly. 

To prevent each new template from having a duplicate header, footer and sidebar, WordPress encourages you to separate that code into other templates and include them with the `get_header()`, `get_footer()` and `get_sidebar()` functions (all of which are based on [`get_template_part`](http://codex.wordpress.org/Function_Reference/get_template_part)). Whilst this makes your code more manageable, with only one edit needed to implement a change across all templates, it still duplicates code that simply doesn't need to be duplicated; the code which calls each of those templates.

## Wrapperless templates

In your typical wrapperless theme, every page template will look something like the following:

```html
<?php get_header(); ?>
  <div class="wrap">
    <div class="content">
      <?php // Our page specific markup and loop goes here ?>
    </div>
    <?php get_sidebar(); ?>
  </div>
<?php get_footer(); ?>
```

Even though we know that every template will take this base format and render the header, footer, sidebar calls each time, we still need to continuously repeat the code to keep WordPress happy; it's laborious and unnecessary.

## Enter DRY

**DRY** simply means **D**on't **R**epeat **Y**ourself and conforming to the **DRY Principle** means:

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. <sup>[[1]](#rf1)</sup>

So whilst we have a base format for our pages, this "knowledge" is written countless times, spread across numerous files and has no authoritative representation. This is the opposite of **DRY** code and it's usually described as being **WET**, meaning that you **W**rite **E**verything **T**wice. 

As you can see from the wrapperless template, WordPress goes beyond writing everything just twice, which is why we prefer the term **CRY** or **C**ontinously **R**epeating **Y**ourself <sup>[[2]](#rf2)</sup>. Whatever you want to call it, it wastes your time when creating the code, when reading the code and when editing the code; it's a lose-lose-lose situation (plus repetition is only fun in rhetoric) but it's easy enough to avoid.

## Wrap up and stay DRY

The goal of a theme wrapper <sup>[[3]](#rf3)</sup> is to remove any repeated markup from individual templates and put it into a single file. This file, `base.php` becomes the single, unambiguous, authoritative representation of knowledge (i.e. the base format code). By doing this we can put the focus entirely on the page specific markup and loop, simplifying our templates to look like this:

```
<?php // Our page specific markup and loop goes here ?>
```

It's neat. It's tidy. You never need to make calls to `get_header()`, `get_footer()` or `get_sidebar()` again. You can also refactor the base format of your site by editing `base.php`. But best of all, it takes less than 50 lines of code to do so.

### Step 1: WordPress figures out which template to use

This is done using the standard WordPress Template Hierarchy, which, as mentioned before, selects the most relevant template as our starting point. Once this template has been chosen, but before it's loaded, WordPress runs the `template_include($template)` filter. 

We use this filter to run our `wrap` function that saves the `$main_template` path and `$base` as static variables in our `SageWrapping` class found in `lib/wrapper.php`:

```php
<?php
  class SageWrapping {
    // Stores the full path to the main template file
    static $main_template;

    // Stores the base name of the template file; e.g. 'page' for 'page.php' etc.
    static $base;

    static function wrap($main) {
      self::$main_template = $main;
      self::$base = basename(self::$main_template, '.php');

      if (self::$base === 'index') {
        self::$base = false;
      }

      return new SageWrapping();
    }
  }
  add_filter('template_include', array('SageWrapping', 'wrap'), 99);
?>
```

The `wrap` function also checks to see if the `$base` is `index` (in which case we know to use the default `base.php`) and finally returns a new instance of `SageWrapping`.

### Step 2: The theme wrapper selects which base to use

During the construction of our new `SageWrapping` instance, we set a variable for the `$slug` (which defaults to base) and create a new `$templates` array with the fallback template `base.php` as the first item. 

We then check to see if the `$base` exists (i.e. confirming we're not starting on `index.php`) and shift a more specific template to the front of the `$templates` array:

```php
<?php
  public function __construct($template = 'base.php') {
    $this->slug = basename($template, '.php');
    $this->templates = array($template);

    if (self::$base) {
      $str = substr($template, 0, -4);
      array_unshift($this->templates, sprintf($str . '-%s.php', self::$base));
    }
  }
?>
```

We then use the magic `__toString()` function to apply a filter to our final $templates array, before returning the full path to the most specific existing base template via the inbuilt WordPress function `locate_template`.

```php
<?php
  public function __toString() {
    $this->templates = apply_filters('sage/wrap_' . $this->slug, $this->templates);
    return locate_template($this->templates);
  }
?>
```

All this is done before any content is served; so at this point WordPress has given us a starting point, which we've changed to a base file, thus extending the template hierarchy by one step. We also fire off a filter, so that the `SageWrapper` can be easily overridden or added to.

### Step 3: The `base-*.php` file serves the content

Once the theme wrapper has used `locate_template` to select the appropriate base file, it will then start serving the base markup (grabbing the header, footer and sidebar code as it goes along). The content from the WordPress starting point i.e. `$main_template` will be loaded by the line:

```php
<?php include sage_template_path(); ?>
```

This is a helper function that returns and loads the `$main_template` we saved earlier. You could also manually include the template from the `base-*.php` or just have all the code in that one file alone. See the footnotes for caveats <sup>[[4]](#rf4)</sup>.

### Wrapping things up

Effectively we've started and ended with the standard WordPress Template Hierarchy, but grabbed the base format from the appropriate base file in between. The markup of our content is wrapped between our base markup, the cycle completes and the theme wrapper's job is now done. In fact, because the theme wrapper starts and ends with the output from the standard Template Hierarchy, the vast majority of issues can be resolved just by looking through and understanding the Template Hierarchy Codex Page.

## Filtering the wrapper: custom post types

Let's say you wanted your base markup to change depending on what CPT WordPress was using. With the Sage Wrapper you just need to add the following to your `lib/extras.php` file (or anywhere else more appropriate):

```php
<?php
  add_filter('sage/wrap_base', __NAMESPACE__ . '\\sage_wrap_base_cpts'); // Add our function to the sage/wrap_base filter

  function sage_wrap_base_cpts($templates) {
    $cpt = get_post_type(); // Get the current post type
    if ($cpt) {
       array_unshift($templates, 'base-' . $cpt . '.php'); // Shift the template to the front of the array
    }
    return $templates; // Return our modified array with base-$cpt.php at the front of the queue
  }
?>
```

Now when the base markup is loaded via `return locate_template($this->templates);` it will load our CPT template if it exists. When a CPT doesn't have its own template WordPress will simply revert to using our standard `base.php` file.

<div class="cta-plugin well well-sage module clearfix">
<a href="https://roots.io/plugins/roots-wrapper-override/">Get the Roots Wrapper Override plugin to override templates from the WordPress dashboard
<p class="text-center"><img style="max-width: 250px;" src="https://roots.io/app/uploads/roots-wrapper-override-admin.png" alt="Roots Wrapper Override admin" /></p>
</a>
</div>

* * *

1. <sup>[[1]](#fn1): Coined in [The Pragmatic Programmer](http://pragprog.com/the-pragmatic-programmer) by Andy Hunt and Dave Thomas.</sup>
2. <sup>[[2]](#fn2): Cry => Tears => Wet. Coined by Nick Fox, in this article, it won't catch on, but sometimes it's nice to be a footnote.</sup>
3. <sup>[[3]](#fn3): The Sage Wrapper is based on [this post](http://scribu.net/wordpress/theme-wrappers.html) by Scribu. Scribu's code is in the public domain but credit where it's due. The SageWrapping class has been modified and is MIT licensed.</sup>
4. <sup>[[4]](#fn4): Please do not put all your code in a `base-*.php` unless you're certain you're being clever; if you only think you're being clever then it's not yet clever enough.</sup>
