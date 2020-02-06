# Theme Sidebar

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
