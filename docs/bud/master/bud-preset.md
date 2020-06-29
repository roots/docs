---
description: Installing Bud requires node 12 and yarn.
---

# bud preset

Bud is designed to enable composing with generators so that projects don't end up amassing stores of unused boilerplate and irrelevant bodge. But, the most anticipated use-case for Bud (and its initial reason-for-being) is actually rather specific: quickly scaffolding block editor extensions for WordPress.

And so, Bud makes it possible to rapidly scaffold pre-configured sets of generators using the `bud preset` command.

::: tip Bud is extensible by design
Bud only ships with one preset, `wp-plugin`, and a handful of generators. But, [teams and package authors are greatly encouraged to write and share their own extensions.](extending-bud)
:::

## Usage

The preset command, without any arguments, will present you with a list of presets to choose from. As mentioned, out of the box you will only find one: `wp-plugin`.

```sh
yarn bud preset
```

You can also call this preset (or any other presets) directly:

```sh
yarn bud preset wp-plugin
```
