---
date_modified: 2023-05-16 10:00
date_published: 2022-02-24 10:25
description: Sage 10 comes with Tailwind CSS out of the box, but can be replaced with Bootstrap or any other CSS framework.
title: Replacing Tailwind CSS with Bootstrap
authors:
  - ben
  - code23_isaac
  - diomededavid
  - MWDelaney
  - kellymears
  - talss89
---

# Replacing Tailwind CSS with Bootstrap

Sage 10 ships with [Tailwind CSS](https://tailwindcss.com), but many users may wish to use Bootstrap, or another CSS framework. 

## Removing Tailwind CSS

### 1. Remove Tailwind dependencies

Remove the `@roots/bud-tailwindcss` extension:

```shell
yarn remove @roots/bud-tailwindcss
```

### 2. Remove Tailwind from your CSS

Open `resources/styles/app.css` and **delete** the following lines:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

### 3. Delete the Tailwind config file

Delete `tailwind.config.js` from your theme.

### 4. Remove the Tailwind `theme.json` generator from the Bud config

Open `bud.config.js` from your theme and remove the following lines:

```diff
-      .useTailwindColors()
-      .useTailwindFontFamily()
-      .useTailwindFontSize()
```

### 5. Remove Tailwind types from `jsconfig.json`

```diff
-      "@roots/bud-tailwindcss",
```

## Adding Bootstrap

### 1. Setup support for Sass

[See the Sass setup guide](/sage/docs/sass/)

### 2. Install Bootstrap

Add Bootstrap as a dependency:

```shell
yarn add bootstrap
```

Add Popper as a dependency:

```shell
yarn add @popperjs/core
```

### 3. Import Bootstrap's Javascript

Open `resources/scripts/app.js` and add:

```javascript
// Import Bootstrap
import 'bootstrap';
```

### 4. Import Bootstrap styles

Open your theme's `resources/styles/app.scss` file add the following lines:

```css
@import 'bootstrap/scss/bootstrap';
```

**Note:** You may wish to import only the parts of Bootstrap you plan to use in your theme. You can learn more about importing just the parts you need [here](https://getbootstrap.com/docs/5.1/customize/sass/#importing).
