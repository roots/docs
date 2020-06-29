---
description: Installing Bud requires node 12 and yarn.
---

# Using a preset

Bud is designed to enable composing with generators so that projects don't end up amassing stores of unused boilerplate and irrelevant bodge. But, the most anticipated use-case for Bud (and its initial reason-for-being) is quickly scaffolding block editor extensions for WordPress.

And so, Bud makes it possible to rapidly scaffold pre-configured projects using the `bud preset` command.

::: tip Bud is extensible by design
Bud only ships with one preset, `wp-block-plugin`, and a handful of generators. But, [teams and package authors are greatly encouraged to write and share their own extensions.](extending-bud)
:::

## `wp-block-plugin`

To initialize the `wp-block-plugin` preset run:

`npx @roots/bud preset wp-block-plugin`
