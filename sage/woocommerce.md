---
date_modified: 2025-06-26 11:00
date_published: 2025-06-26 11:00
description: How to Setup WooCommerce with Sage
title: How to Setup WooCommerce
authors:
  - aitor
  - csorrentino
  - ben
  - strarsis
  - YourRightWebsite
---

# How to Setup WooCommerce

[WooCommerce](https://woocommerce.com/) is compatible with Sage's Blade templates with the correct setup.

## Add the sage-woocommerce package

The [`generoi/sage-woocommerce`](https://github.com/generoi/sage-woocommerce) package adds functionality to allow Blade templates to work on Acorn and Sage powered WordPress sites:

```shell
$ composer require generoi/sage-woocommerce
```

### Publish the templates to your theme

Add the required `single-product.blade.php` and `archive-product.blade.php` views to your theme:

```shell
$ wp acorn vendor:publish --tag="woocommerce-template-views"
```

You can now edit these templates from `resources/views/woocommerce/`.

## Update WooCommerce default pages

In WooCommerce 9.x+, the default pages (Shop, Cart, Checkout) are created with block-based content by default. These do not use classic templates.

Remove the default blocks from these pages and replace them with the relevant shortcodes:

* `[woocommerce_cart]`
* `[woocommerce_checkout]`

## Disable "Coming soon mode"

In WooCommerce 9.x+, Coming soon mode is enabled by default for all stores from **Settings > Site visibility**.

Until it’s done, WooCommerce keeps the Shop page in a special unpublished state that behaves differently depending on whether you’re logged in or not:

* Logged-in users see the correct template
* Logged-out users are shown a block-based fallback, ignoring the theme's templates entirely
