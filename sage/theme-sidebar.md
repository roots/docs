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
  - "17"
publish_to_discourse:
  - "0"
---
## Displaying the sidebar

Some pages absolutely need a sidebar to function properly, whereas others will have their aesthetic ruined by superfluous asides. Fortunately the `ConditionalTagCheck` class used by the `display_sidebar` function in `lib/config.php` gives you full control over this behavior.

## Using the ConditionalTagCheck class

When you first start developing with WordPress you'll quickly become familiar with the common conditional tags such as `is_page`, `is_single` and `is_home` and you'll soon realize there is a conditional tag for almost every possible scenario. Wisely, all these conditionals have been codified and can be found via the WordPress Codex page for [Conditional Tags](http://codex.wordpress.org/Conditional_Tags). 

What all the conditional tags share in common is their boolean nature; they check criteria and return either `true` or `false`. Likewise the `ConditionalTagCheck` class needs a boolean response to figure out whether or not to display the sidebar. When you create a new ConditionalTagCheck instance, you pass in an array of conditional tags to check (and optionally any argument they need). The class then runs/calls all the conditional tag functions you supplied and if any of them return `true`, the class returns `false` and the sidebar won't be displayed. This means that you only need to add conditional tags for the circumstances you **do not want** the sidebar shown.

#### The default config

If you open up `lib/config.php` you can find the default conditional tags checked:

    [
      'is_404',
      'is_front_page'
    ]

As you can see the two conditions we set to **hide** the sidebar are `is_404` and `is_front_page`. If we wanted to hide the sidebar from pages, we can just add `is_page` to the bottom of the array:

    [
      'is_404',
      'is_front_page',
      'is_page'
    ]

#### Passing arguments

If you only wanted to exclude one page from displaying the sidebar, you'll need to use an array to pass in the function name and arguments, namely the page id or the slug. To do this you need to pass the conditional and argument together as an array. The following would exclude a page with id of 42:

    [
      'is_404',
      'is_front_page',
      ['is_page', 42]
    ],

You could also pass the page slug with `'page-slug'` or `'Page Title'` (note the single brackets) should you need to. Or combine everything together by passing the arguments as an array:

    [
      'is_404',
      'is_front_page',
      ['is_page', [42, 'page-slug', 'Page Title']
    ]

#### Further customization

If you need to use a combination of conditionals to determine whether or not to display the sidebar then you can even write your own function and call that in the first array; just make sure it returns `true` to hide the sidebar or `false` to display. You can also filter the class directly (see **Filtering the Sidebar Class**)

### Page templates

Displaying the sidebar will often depend on the page template that you are using. Checking for a specific page template is no different than the above tags, but we'll show some specific examples on their own.

```php
[
  'is_404',
  'is_front_page',
  ['is_page_template', 'template-custom.php'],
  ['is_page_template', 'page-contact.php'],
  ['is_page_template', 'page-42.php']
]
```

Just remember that this only checks against the main page template, i.e. the page template selected by the WordPress template hierarchy, via the `template_redirect` action or the `template_include` filter; it will not check every file included via `include` or `get_template_part`.

### Filtering the Sidebar Class

To hide the sidebar you need just one `true` returned from any of your conditional and page template checks. This makes it very easy to hide the sidebar for a large number of pages, or for just one. 

Unfortunately it's not so easy to hide the sidebar for a large number of pages, but display it on just one. This is where the filter comes in. Overriding the output of the `ConditionalTagCheck` means you can force the sidebar to be shown, even when your conditional and template checks would otherwise hide it. 

Let's say you wanted the sidebar hidden on every page, so you add `is_page` to the first array. Later in development you suddenly realize that on you need a sidebar on just one of the pages:

```php
add_filter('sage/display_sidebar', __NAMESPACE__ . '\sage_sidebar_on_special_page');

function sage_sidebar_on_special_page($sidebar) {
  if (is_page('special-page')) {
    return true;
  }
  return $sidebar;
}
```

The first line adds our function to the filter, and the function simply uses the `is_page` conditional tag to determine if we're on the special page. Is so we force a `true` response, overriding the setting determined by the first two arrays. 

Note that at this point the logic has switched, with a return value of `true` displaying the sidebar and `false` being used to hide it. This is because we are not performing an individual check, but instead returning a definitive yes or no to the sidebar.