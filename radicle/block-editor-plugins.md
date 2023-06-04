---
date_modified: 2023-06-04 19:00
date_published: 2023-03-28 07:00
title: Block Editor Plugins
authors:
  - ben
---

# Block Editor Plugins

Editor plugins are used for most editor functionality that aren't directly related to a custom block.

::: tip
The Radicle roadmap includes more editor examples for additional blocks and editor plugins
:::

## Asset locations

Block editor plugins live in the `resources/scripts/editor/` directory.

They are automatically registered from `radicle/resources/scripts/editor.ts`.

Radicle uses the [`@roots/bud-preset-wordpress` extension from bud.js](https://bud.js.org/extensions/bud-preset-wordpress/editor-integration) for registering block plugins.

## Default editor plugin

By default, Radicle ships with an example editor plugin (`example.plugin.tsx`) that unregisters all blocks that aren't in the design, text or media categories.
