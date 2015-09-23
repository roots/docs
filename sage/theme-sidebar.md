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

Some pages absolutely need a sidebar to function properly, whereas others will have their aesthetic ruined by superfluous asides. The `display_sidebar` function in `lib/config.php` gives you full control over this behavior.

## Conditional tags

When you first start developing with WordPress you'll quickly become familiar with the common conditional tags such as `is_page()`, `is_single()` and `is_home()` and you'll soon realize there is a conditional tag for almost every possible scenario. Wisely, all these conditionals have been codified and can be found via the WordPress Codex page for [Conditional Tags](http://codex.wordpress.org/Conditional_Tags).

#### The default config

If you open up `lib/config.php` you can find the default conditional tags checked:

    [
      is_404(),
      is_front_page(),
      is_page_template('template-custom.php'),
    ]

As you can see the two conditions we set to **hide** the sidebar are `is_404()` and `is_front_page()`. If we wanted to hide the sidebar from pages, we can just add `is_page()` to the bottom of the array:

    [
      is_404(),
      is_front_page(),
      is_page_template('template-custom.php'),
      is_page()
    ]

#### Further customization

If you need to use a combination of conditionals to determine whether or not to display the sidebar then you can even write your own function and call that in the first array; just make sure it returns `true` to hide the sidebar or `false` to display. You can also filter the class directly (see **Filtering the Sidebar Class**)

### Filtering the sidebar display

To hide the sidebar you need just one `true` returned from any of your conditional and page template checks. This makes it very easy to hide the sidebar for a large number of pages, or for just one.

Unfortunately it's not so easy to hide the sidebar for a large number of pages, but display it on just one. This is where the filter comes in. Overriding the output of the function means you can force the sidebar to be shown, even when your configured conditional tags would otherwise hide it.

Let's say you wanted the sidebar hidden on every page, so you add `is_page()` to the array. Later in development you suddenly realize that on you need a sidebar on just one of the pages:

```php
add_filter('sage/display_sidebar', __NAMESPACE__ . '\\sage_sidebar_on_special_page');

function sage_sidebar_on_special_page($sidebar) {
  if (is_page('special-page')) {
    return true;
  }
  return $sidebar;
}
```

The first line adds our function to the filter, and the function simply uses the `is_page()` conditional tag to determine if we're on the special page. Is so we force a `true` response, overriding the setting determined by the first two arrays.

Note that at this point the logic has switched, with a return value of `true` displaying the sidebar and `false` being used to hide it. This is because we are not performing an individual check, but instead returning a definitive yes or no to the sidebar.