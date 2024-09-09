---
date_modified: 2024-08-09 12:15
date_published: 2024-04-26 10:35
description: Known compatibility issues with any WordPress plugins and Acorn.
title: Compatibility
authors:
  - ben
  - dalepgrant
---

# Compatibility

Acorn is installed via Composer and includes many dependencies, that also include their own dependencies. WordPress plugin authors often include their own dependencies in a way that can conflict with Acorn. 

Compatibility issues that arise in Acorn with other WordPress plugins are most often related to a WordPress plugin that is including an older version of a dependency that exists in the Acorn dependency tree.

**Plugin developers need to wrap their dependencies with their own namespace** in order to prevent conflicts with other plugins and with Acorn. The following tools can be used to handle this:

* [PHP-Scoper](https://github.com/humbug/php-scoper)
* [Imposter Plugin](https://github.com/TypistTech/imposter-plugin) 
* [Mozart](https://github.com/coenjacobs/mozart)

**Acorn has no responsibility to fix compatibility issues that are the result of plugins that don't wrap their dependencies with their own namespace.**

## Known issues with plugins

* **Cloudflare** includes an older version of `psr/log`. This has been [logged in their Github repo](https://github.com/cloudflare/Cloudflare-WordPress/pull/541).
* **Gravity Forms** merge tags JS causes an error on the admin notifications page. [@tombroucke provided a workaround in roots/acorn#198](https://github.com/roots/acorn/issues/198#issuecomment-1365942893).
* **Gravity Forms: Entry Automation FTP Extension** includes `league/flysystem` v1.1.4 which is incompatible with Acorn.
* **Trust Payments Gateway for WooCommerce** includes an older version of `psr/log`. No known workaround as of plugin v1.1.3. 
* **WooCommerce PayPal Payments** includes an older version of `psr/log`. The fatal error can be avoided by installing `psr/log` v2 (`composer require psr/log v2`).
* **WooCommerce USPS Shipping Method** includes an older version of `psr/log`. The fatal error can be avoided by installing `psr/log` v2 (`composer require psr/log v2`).
