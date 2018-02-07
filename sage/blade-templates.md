---
ID: 5332
post_title: Blade Templates
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/blade-templates/
published: true
post_date: 2015-09-01 19:14:17
---
Sage uses [Laravel's Blade](https://laravel.com/docs/5.5/blade) templating engine.

## Passing data to templates

Sage includes a `sage/template/{$class}/data` filter that can be used to pass data to templates. This is the most simple way to pass data.

```php
add_filter('sage/template/page/data', function (array $data) {
    $data['header_image'] = get_field('header_image');
    $data['header_content'] = get_field('header_content');
    return $data;
});