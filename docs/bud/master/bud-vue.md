---
description: Add vue support to Bud projects using the @roots/bud-vue extension
---

# @roots/bud-vue

## Installation

```sh
yarn add @roots/bud-vue --dev
```

```sh
npm install @roots/bud-vue --save-dev
```

## Usage

First, import the extension into your build

```js
const vue = require('@roots/bud-vue')
```

Then, register it with Bud.

```js
bud.use([vue])
```

Bud is now configured for you to include .vue single file components (SFCs) in your bundles.
