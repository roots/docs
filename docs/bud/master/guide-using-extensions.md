---
description: Install extensions to meet your unique project needs.
---

# Using extensions

Bud includes support for extending the framework with optional functionality.

Let's get acquainted with how extensions are used by adding sass support to our minimal configuration file.

[[toc]]

## Installing

We're going to add sass support using the [@roots/bud-sass](bud-sass.md) extension. Let's install it.

Using yarn:

```sh
yarn add @roots/bud-sass -D
```

Using npm:

```sh
npm install @roots/bud-sass --save-dev
```

## Require the extension

```js{2}
const bud = require('@roots/bud')
const sass = require('@roots/bud-sass')

bud
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

## Register the extension with Bud

```js{5}
const bud = require('@roots/bud')
const sass = require('@roots/bud-sass')

bud
  .use([sass])
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

Were there need for additional extensions, they could be added to the [bud.use](config-use.md) array alongside `sass`.

```js{3,8}
const bud = require('@roots/bud')
const sass = require('@roots/bud-sass')
const typescript = require('@roots/bud-typescript')

bud
  .use([
    sass,
    typescript,
  ])
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```
