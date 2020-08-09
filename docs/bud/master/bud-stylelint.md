---
description: Add stylelint support to Bud projects using the bud-stylelint extension
---

# @roots/bud-stylelint

## Installation

```sh
yarn add @roots/bud-stylelint --dev
```

```sh
npm install @roots/bud-stylelint --save-dev
```

## Usage

First, import the extension into your build

```js
const {stylelint} = require('@roots/bud-stylelint')
```

Then, register it with Bud.

```js
bud.use([stylelint])
```
