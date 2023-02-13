---
date_modified: 2023-02-13 12:38
date_published: 2021-10-21 13:21
title: Package Development
description: Use the Acorn Example Package as a template for creating your own Acorn packages.
authors:
  - ben
  - Log1x
---

# Package Development

We have an [Acorn Example Package](https://github.com/roots/acorn-example-package) repo that can be used as a template for creating your own Acorn packages. It's similar to some of the other Laravel package templates out there, but more specific to Acorn.

Creating Acorn packages is useful for when you want to reuse specific functionality on your Acorn-powered WordPress sites, or open-sourcing functionality that's not tied directly to your site. You can think of Acorn packages similiar to WordPress plugins, or any other dependency.

Packages are installed by Composer, just like Acorn is.

::: tip
We recommend referencing the [Laravel docs on Packages](https://laravel.com/docs/9.x/packages)
:::

## Creating an Acorn package

From the [roots/acorn-example-package](https://github.com/roots/acorn-example-package) repo, click the **Use this template** button to create a new repo with the template.

## Developing an Acorn package

Once your package is created, clone your new git repo somewhere on your machine that's accessible from a WordPress site with Acorn installed. To work on a package locally, you can require it by defining a new local repository from the `composer.json` file used for your site/theme:

```json
  "repositories": [
    {
      "type": "path",
      "url": "./packages/vendor-name/example-package"
    }
  ],
```

Replace `./packages/vendor-name/example-package` above with the path to your local package, along with the correct names.

Then run the Acorn WP-CLI command to discover your package: 

```shell
$ wp acorn package:discover

  INFO  Discovering packages.

  vendor-name/example-package ...... DONE
  roots/sage ....................... DONE
```

::: warning
We have plans to [automate replacing the placeholders in the example package](https://github.com/roots/acorn/issues/271) in the future
:::
