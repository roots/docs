---
description: Add tailwindcss support to Bud projects using the bud-tailwind extension
---

# @roots/bud-tailwind

## Installation

```sh
yarn add @roots/bud-tailwind --dev
```

```sh
npm install @roots/bud-tailwind --save-dev
```

## Usage

First, import the extension into your build

```js
const tailwind = require('@roots/bud-tailwind')
```

Then, register it with Bud.

```js
bud.use([tailwind])
```
