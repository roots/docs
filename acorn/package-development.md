---
date_modified: 2026-03-22 12:00
date_published: 2021-10-21 13:21
title: Developing Packages for Acorn
description: Use the Acorn Example Package as a template for creating custom packages and reusable functionality for WordPress with Laravel architecture.
authors:
  - ben
  - Log1x
---

# Developing Packages for Acorn

We have an [Acorn Example Package](https://github.com/roots/acorn-example-package) repo that can be used as a template for creating your own Acorn packages. It's similar to some of the other Laravel package templates out there, but more specific to Acorn.

Creating Acorn packages is useful for when you want to reuse specific functionality on your Acorn-powered WordPress sites, or open-sourcing functionality that's not tied directly to your site. You can think of Acorn packages similiar to WordPress plugins, or any other dependency.

Packages are installed by Composer, just like Acorn is.

::: tip
We recommend referencing the [Laravel docs on Packages](https://laravel.com/docs/13.x/packages)
:::

## Creating an Acorn package

From the [roots/acorn-example-package](https://github.com/roots/acorn-example-package) repo, click the **Use this template** button to create a new repo with the template.

After cloning your new repo, run the configure script to replace the placeholder names with your own:

```shell
$ php configure.php
```

The script will prompt you for your vendor name, package name, namespace, and other details. You can also run it non-interactively:

```shell
$ php configure.php --no-interaction --author-name="Your Name" --author-email="you@example.com" --vendor-slug="your-vendor" --vendor-namespace="YourVendor" --package-slug="your-package" --class-name="YourPackage" --package-description="Your package description"
```

To preview changes without modifying any files, use `--dry-run`:

```shell
$ php configure.php --dry-run
```

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

Then require the package in your project:

```shell
$ composer require vendor-name/example-package
```

Then run the Acorn WP-CLI command to discover your package: 

```shell
$ wp acorn package:discover
```

```plaintext
  INFO  Discovering packages.

  vendor-name/example-package ...... DONE
  roots/sage ....................... DONE
```

::: tip
If you haven't already, run `php configure.php` from the root of your package to replace the placeholder names
:::
