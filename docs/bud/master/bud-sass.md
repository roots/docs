---
description: Add sass support to Bud projects using the bud-eslint extension
---

# @roots/bud-sass

## Installation

```sh
yarn add @roots/bud-sass --dev
```

```sh
npm install @roots/bud-sass --save-dev
```

## Usage

First, import the extension into your build

```js
const sass = require('@roots/bud-sass')
```

Then, register it with Bud.

```js
bud.use([sass])
```
