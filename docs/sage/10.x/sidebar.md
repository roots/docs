---
description: Sidebars can be shown using the @section directive.
---

# Sidebar

## Displaying the sidebar

There is a sidebar section defined in `/resources/views/layout/app.blade.php`, so sidebars can be displayed by using that section.
For example:

```html
<!-- /resources/views/page.blade.php -->
@extends('layouts.app')

@section('sidebar')
    Some content for the sidebar!
@endsection
```

For more information on how to use sections, see the [Blade documentation](https://laravel.com/docs/7.x/blade).
