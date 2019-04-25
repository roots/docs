---
ID: 26346
post_title: Sage Compatibility
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/sage-compatibility/
published: true
post_date: 2018-04-25 13:52:43
---
## Adding support for plugins

* WooCommerce support can be added with [roots/sage-woocommerce](https://github.com/roots/sage-woocommerce)

## Known issues with plugins

* [Disqus Comment System](https://github.com/roots/sage/issues/2035#issuecomment-369673419) is not compatible with Sage 9

## Known issues with Internet Explorer

* IE <= 11 does not support the JavaScript `CustomEvent`, which is used by the [`routed` event](/sage/docs/theme-development-and-building/#listening-for-route-events). This can be resolved by either removing [the code that dispatches events](https://github.com/roots/sage/pull/2080) or by adding a [`CustomEvent` polyfill](https://github.com/kumarharsh/custom-event-polyfill).