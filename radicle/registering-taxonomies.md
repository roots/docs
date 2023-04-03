---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Registering Taxonomies
authors:
  - ben
---

# Registering Taxonomies

Similar to [registering post types](/radicle/docs/registering-post-types/), Radicle uses the [Extended CPTs](https://github.com/johnbillion/extended-cpts) library along with a post types service provider to allow for configuring taxonomies from a config.

By default, a `seed_category` taxonomy is registered and associated with the `seed` post type. Remove or replace this taxonomy with one that works for your site.

All of the [parameters from Extended CPTs](https://github.com/johnbillion/extended-cpts/wiki/Registering-taxonomies) are supported.
