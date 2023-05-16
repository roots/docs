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

### 1. Install native support for Sass

Add the `@roots/bud-sass` extension:

```shell
yarn add @roots/bud-sass --dev
```
**Note:** Verify that all Bud packages and the `@roots/sage` package versions are the same in your `package.json` to prevent build errors.

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

In the `resources/styles` directory, rename `app.css` to `app.scss` and rename `editor.css` to `editor.scss`.

Open your theme's newly renamed `resources/styles/app.scss` and add the following lines:

```css
@import 'bootstrap/scss/bootstrap';
```

**Note:** You may wish to import only the parts of Bootstrap you plan to use in your theme. You can learn more about importing just the parts you need [here](https://getbootstrap.com/docs/5.1/customize/sass/#importing).

### 5. Configure Stylelint (optional)

Install `@roots/bud-stylelint`:

```shell
yarn add @roots/bud-stylelint --dev
```

Create a Stylelint config file at `.stylelintrc.cjs`:

```javascript
module.exports = {
  extends: ['@roots/bud-sass/config/stylelint'],
  rules: {
    'import-notation': null,
    'no-empty-source': null,
  },
};
```

#### Maintaining Stylelint config

When bud.js updates you will automatically be upgraded to the latest versions of `stylelint-config-standard` and `stylelint-config-recommended-scss`. This may cause issues if you are now breaking a newly defined or changed rule. You will either want to make changes to your application or add an override to `module.exports.rules`.

**This is normal**. The preset is just supposed to be a base for your own config. There is nothing wrong with overriding rules to suit your preferences or your application's needs.

You could also:

* Not use the `@roots/bud-sass/config/stylelint` preset and maintain your own config entirely. This will give you maximum control over when updates are applied.
* Make an issue with `stylelint-config-standard` or `stylelint-config-recommended-scss` if you disagree with the change.

What you shouldn't do:

* Make an issue in `roots/bud` (We want to override upstream configurations as little as possible so as to provide a predictable starting point for a large number of diverse projects).
