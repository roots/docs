---
description: Installing Bud requires node 12 and yarn.
---

# Installing manually

First, install Bud as a development dependency:

`yarn add -D @roots/bud`

Then, generate the Bud project config files:

`yarn bud generate bud-config`

Once installed, the Bud command will be accessible from within the project:

`yarn bud [command] [args]`.

::: tip Add a generator skeleton (optional)
After installing you can generate a barebones generator using `yarn bud generate bud-generator`.

This is done automatically when using the `bud init` command.
:::
