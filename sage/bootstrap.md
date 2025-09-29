---
date_modified: 2025-02-27 14:30
date_published: 2022-02-24 10:25
description: Add Bootstrap CSS framework to Sage themes. Install Bootstrap via npm and integrate Bootstrap styles, grid system, and components into WordPress theme development.
title: How to Use Bootstrap
authors:
  - ben
  - code23_isaac
  - diomededavid
  - MWDelaney
  - kellymears
  - talss89
  - taylorgorman
---

# How to Use Bootstrap with Sage

::: warning Setup Sass first
See [how to use Sass](./sass.md) before you follow this guide
:::

## Install Bootstrap

Add Bootstrap as a dependency:

```shell
$ npm install --save bootstrap @popperjs/core
```

Add Bootstrap to `resources/css/app.scss`:

```scss
@import "bootstrap/scss/bootstrap";
```

::: tip Bootstrap's Vite docs
See [Bootstrap's Vite docs](https://getbootstrap.com/docs/5.2/getting-started/vite/) for more information.
:::
