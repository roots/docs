---
description: Add eslint support to Bud projects using the bud-eslint extension
---

# @roots/bud-eslint

## Installation

```sh
yarn add @roots/bud-eslint --dev
```

```sh
npm install @roots/bud-eslint --save-dev
```

## Usage

First, import the extension into your build

```js
const {eslint} = require('@roots/bud-eslint')
```

Then, register it with Bud.

```js
bud.use([eslint])
```
