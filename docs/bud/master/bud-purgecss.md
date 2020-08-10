---
description: Add purgecss support to Bud projects using the bud-purgecss extension
---

# @roots/bud-purgecss

## Installation

With yarn:

```sh
yarn add @roots/bud-eslint --dev
```

With npm:

```sh
npm install @roots/bud-eslint --save-dev
```

## Usage

First, import the extension into your build

```js
const {purgecss} = require('@roots/bud-eslint')
```

Then, register it with Bud.

```js
bud.use([eslint])
```

Now, you may call `bud.purgecss` to specify what should be purged and when:

```js
bud.purgecss({
  enabled: bud.inProduction,
  options: {
    // ...purgecss options
  }
})
```

WordPress users can shortcut configuration by importing and using the WordPress preset:

```js
const {purgecss, presets} = require('@roots/bud-purgecss')

bud
  .use([purgecss])
  .purgecss({
    options: {
      ...presets.wordpress,
    },
  })
```
