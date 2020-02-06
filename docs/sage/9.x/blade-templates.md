# Blade Templates

Sage uses [Laravel's Blade](https://laravel.com/docs/5.6/blade) templating engine.

## Passing data to templates

Sage includes a `sage/template/{$class}/data` filter that can be used to pass data to templates. This is the most simple way to pass data.

```php
add_filter('sage/template/page/data', function (array $data) {
    $data['header_image'] = get_field('header_image');
    $data['header_content'] = get_field('header_content');
    return $data;
});
```

[Controller](https://github.com/soberwp/controller) can also be used to pass data to templates.

## WP-CLI utility

[`blade-generate`](https://github.com/alwaysblank/blade-generate) is a WP-CLI package that can be used to compile, wipe, and clear Blade templates. Install `blade-generate` by running:

```sh
wp package install git@github.com:alwaysblank/blade-generate.git
```

After installing `blade-generate` you can run the following commands:

- `wp blade compile` 
- `wp blade clear`
- `wp blade wipe`
