---
ID: 6137
post_title: Theme Sidebar
author: Ben Word
post_date: 2015-09-01 19:27:55
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-sidebar/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"17";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
## Displaying the sidebar

Some pages absolutely need a sidebar to function properly, whereas others will have their aesthetic ruined by superfluous asides. The `sage/display_sidebar` filter in `src/filters.php` gives you full control over this behavior.

## Conditional tags

When you first start developing with WordPress you'll quickly become familiar with the common conditional tags such as `is_page()`, `is_single()` and `is_home()` and you'll soon realize there is a conditional tag for almost every possible scenario. Wisely, all these conditionals have been codified and can be found via the WordPress Codex page for [Conditional Tags](http://codex.wordpress.org/Conditional_Tags).

## Filtering the sidebar display

If you open up `src/filters.php` you can find the default [conditional tags](http://codex.wordpress.org/Conditional_Tags) that disable the sidebar:

```php
add_filter('sage/display_sidebar', function ($display) {
    // The sidebar will NOT be displayed if ANY of the following return true
    return $display ? !in_array(true, [
        is_404(),
        is_front_page(),
        is_page_template('templates/template-custom.php')
    ]) : $display;
});
```

As you can see the two conditions we set to **hide** the sidebar are `is_404()` and `is_front_page()`. If we wanted to hide the sidebar from pages, we can just add `is_page()` to the bottom of the array:

```php
add_filter('sage/display_sidebar', function ($display) {
    // The sidebar will NOT be displayed if ANY of the following return true
    return $display ? !in_array(true, [
        is_404(),
        is_front_page(),
        is_page_template('templates/template-custom.php'),
        is_page()
    ]) : $display;
});
```
