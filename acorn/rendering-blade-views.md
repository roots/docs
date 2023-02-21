---
date_modified: 2023-02-21 11:30
date_published: 2023-02-21 11:30
description: Learn how to render Blade views from anywhere in your WordPress site.
title: Rendering Blade Views
authors:
  - ben
  - chuckienorton
  - strarsis
  - talss89
---

# Rendering Blade Views

You can use the `view()` helper function from Acorn to render Blade templates anywhere in your WordPress site.

## Rendering blocks with Blade templates

### First-party blocks

In the following example we'll render a `vendor/example` block with `resources/views/blocks/example.blade.php`:

```php
register_block_type('vendor/example', [
    'render_callback' => function ($attributes, $content) {
        echo view('blocks/example', compact('attributes', 'content'));
    },
]);
```

In the following example register an ACF block named `example` and render it with `resources/views/blocks/example.blade.php`:

### ACF blocks with Blade templates

```php
acf_register_block_type([
    'example',
    'render_callback' => function ($block) {
        echo view('blocks/example', ['block' => $block]);
    },
]);
```

### Existing blocks with Blade templates

In the following example we'll render the `core/buttons` block with `resources/views/blocks/button.blade.php`:

```php
add_filter('register_block_type_args', function ($args, $name) {
    if ($name === 'core/buttons') {
        $args['render_callback'] = function ($attributes, $content) {
            echo view('blocks/buttons', compact('attributes', 'content'));
        };
    }

    return $args;
}, 10, 2);
```

## Rendering emails with Blade templates

The following example uses the `resources/views/emails/welcome.blade.php` template file customizing the new WordPress user notification emails:

```php
add_filter('wp_new_user_notification_email', function ($wp_new_user_notification_email, $user, $blogname) {
    $key = get_password_reset_key($user);
    $encoded_user_login = rawurlencode($user->user_login);
    $password_reset_link = network_site_url('wp-login.php?action=rp&key='.$key.'&login='.$encoded_user_login, 'login');

    $message = view('emails/welcome', compact('user', 'blogname', 'password_reset_link'))->render();
    $wp_new_user_notification_email['message'] = $message;
    $wp_new_user_notification_email['headers'] = ['Content-Type: text/html; charset=UTF-8'];

    return $wp_new_user_notification_email;
}, 10, 3);
```
