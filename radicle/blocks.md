---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Blocks
authors:
  - ben
---

# Blocks

Radicle comes with a basic block example to demonstrate where to register blocks on your site.

::: tip
The Radicle roadmap includes more editor examples for both blocks and editor plugins
:::

If you are building a block that will be used across multiple projects/sites, we recommend building them as separate packages/plugins. If you are building a block that is specific to your Radicle-based site, then we recommend getting started with the example block that's included in Radicle.

While it's usually recommended to build editor functionality separate from your WordPress theme, Radicle blurs the lines of what a WordPress theme is — you will never need to edit anything from the theme directory (`public/content/themes/radicle/`).

## Asset locations

Blocks live in the `resources/scripts/editor/` directory.

They are automatically registered from `radicle/resources/scripts/editor.ts`.

Radicle uses the [`@roots/bud-preset-wordpress` extension from bud.js](https://bud.js.org/extensions/bud-preset-wordpress/editor-integration) for registering blocks.
