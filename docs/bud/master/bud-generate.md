---
description: Installing Bud requires node 12 and yarn.
---

# bud generate

<div style="background: #525DDC; padding: 2rem;">
<img src="/docs/bud/bud-generate.png" style="display: block; width: 300px; max-width: 100%; margin-left: auto; margin-right: auto;">
</div>

The generate command is the primary means by which project authors are intended to interface with Bud.

Some generators may prompt you for values to use in their templates, while others will just run straight away. Generator answers are saved in the project `.bud/bud.config.json` file with the intent of minimizing the amount of time project authors have to spend answering repeat questions.

Out of the box, you will find generators for:

- WordPress blocks
- WordPress editor components
- WordPress plugins
- WordPress editor extensions

::: tip Bud is extensible by design
Bud only ships with one preset and a handful of generators. But, [teams and package authors are greatly encouraged to write and share their own extensions.](/docs/bud/master/extending-bud/#writing-a-generator)
:::

## Usage

The generate command, without any arguments, will conveniently present you with a list of generators to choose from. Use the arrow keys to move between options and enter to make your selection.

```sh
yarn bud generate
```

You may also call generators directly:

```sh
yarn bud generate wp-editor-extension
```
