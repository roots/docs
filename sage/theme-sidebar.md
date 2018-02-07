---
ID: 6137
post_title: Theme Sidebar
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/theme-sidebar/
published: true
post_date: 2015-09-01 19:27:55
---
## Displaying the sidebar

The `sage/display_sidebar` filter can be used to define which conditions to enable the primary sidebar on.

```php
add_filter('sage/display_sidebar', function ($display) {
    static $display;

    isset($display) || $display = in_array(true, [
      // The sidebar will be displayed if any of the following return true
      is_single(),
      is_404(),
      is_page_template('template-custom.php')
    ]);

    return $display;
});
```
