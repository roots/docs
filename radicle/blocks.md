---
date_modified: 2023-06-04 19:00
date_published: 2023-03-28 07:00
title: Blocks
authors:
  - ben
---

# Blocks

Radicle comes with a the following blocks:

* A basic block example
* A modal block that is rendered with a Blade component and uses Alpine.js

If you are building a block that will be used across multiple projects/sites, we recommend building them as separate packages/plugins. If you are building a block that is specific to your Radicle-based site, then we recommend getting started with the example blocks that are included in Radicle.

While it's usually recommended to build editor functionality separate from your WordPress theme, Radicle blurs the lines of what a WordPress theme is — you will never need to edit anything from the theme directory (`public/content/themes/radicle/`).

## Asset locations

Blocks live in the `resources/scripts/editor/` directory.

They are automatically registered from `radicle/resources/scripts/editor.ts`.

Radicle uses the [`@roots/bud-preset-wordpress` extension from bud.js](https://bud.js.org/extensions/bud-preset-wordpress/editor-integration) for registering blocks.
