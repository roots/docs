---
date_modified: 2025-07-18 14:30
date_published: 2024-04-26 10:35
description: Known compatibility issues between WordPress plugins and Acorn, including solutions and workarounds for common integration conflicts.
title: WordPress Plugin Compatibility with Acorn
authors:
  - ben
  - dalepgrant
---

# WordPress Plugin Compatibility with Acorn

Acorn is installed via Composer and includes many dependencies, that also include their own dependencies. WordPress plugin authors often include their own dependencies in a way that can conflict with Acorn. 

Compatibility issues that arise in Acorn with other WordPress plugins are most often related to a WordPress plugin that is including an older version of a dependency that exists in the Acorn dependency tree.

**Plugin developers need to wrap their dependencies with their own namespace** in order to prevent conflicts with other plugins and with Acorn. The following tools can be used to handle this:

* [PHP-Scoper](https://github.com/humbug/php-scoper)
* [Imposter Plugin](https://github.com/TypistTech/imposter-plugin) 
* [Mozart](https://github.com/coenjacobs/mozart)

**Acorn has no responsibility to fix compatibility issues that are the result of plugins that don't wrap their dependencies with their own namespace.**

## Known issues with plugins

Composer patches can sometimes be used to work around issues with plugins.

* **Cloudflare** includes an older version of `psr/log`. There is a [pending PR to resolve this issue](https://github.com/cloudflare/Cloudflare-WordPress/pull/541).
* **Gravity Forms** merge tags JS causes an error on the admin notifications page. [@tombroucke provided a workaround in roots/acorn#198](https://github.com/roots/acorn/issues/198#issuecomment-1365942893).
* **Gravity Forms: Entry Automation FTP Extension** includes `league/flysystem` v1.1.4 which is incompatible with Acorn.
* **WooCommerce PayPal Payments** includes an older version of `psr/log`.
* **WooCommerce UPS Shipping** includes an older version of `psr/log`. [Patch available](https://gist.github.com/retlehs/4e76aee9a30cc0d3228cf6146eec64e0).
* **WooCommerce USPS Shipping** includes an older version of `psr/log`. [Patch available](https://gist.github.com/retlehs/4e76aee9a30cc0d3228cf6146eec64e0).

