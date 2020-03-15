# Compatibility

## Adding support for plugins

- WooCommerce support can be added with [roots/sage-woocommerce](https://github.com/roots/sage-woocommerce)

## Known issues with plugins

- [Disqus Comment System](https://github.com/roots/sage/issues/2035#issuecomment-369673419) is not compatible with Sage 9

## Known issues with Internet Explorer

- IE <= 11 does not support the JavaScript `CustomEvent`, which is used by the [`routed` event](compiling-assets.md#listening-for-route-events). This can be resolved by either removing [the code that dispatches events](https://github.com/roots/sage/pull/2080) or by adding a [`CustomEvent` polyfill](https://github.com/kumarharsh/custom-event-polyfill).
