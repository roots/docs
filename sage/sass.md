---
date_modified: 2023-06-06 17:30
date_published: 2023-06-06 17:30
description: Setup support for Sass in Sage by adding @roots/bud-sass and renaming css files to scss
title: Using Sass
authors:
  - ben
  - code23_isaac
  - diomededavid
  - MWDelaney
  - kellymears
  - talss89
---

# Setting up Support for Sass

Add the `@roots/bud-sass` extension:

```shell
yarn add @roots/bud-sass --dev
```

::: warning
**Note:** Verify that all Bud packages and the `@roots/sage` package versions are the same in your `package.json` to prevent build errors.
:::

In the `resources/styles` directory, rename `app.css` to `app.scss` and rename `editor.css` to `editor.scss`.

```plaintext
app.css -> app.scss
editor.css -> editor.scss
```

::: tip
**Note:** [`url()` imports in Sass behave differently than CSS](https://bud.js.org/extensions/bud-sass#url-imports). We recommend prefixing aliases with a tilde (eg. `url('~@images/...')`). We also recommend adding the `fonts` directory to [`bud.assets()`](https://bud.js.org/docs/bud.assets).
:::

## Configure Stylelint (optional)

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

### Maintaining Stylelint config

When bud.js updates you will automatically be upgraded to the latest versions of `stylelint-config-standard` and `stylelint-config-recommended-scss`. This may cause issues if you are now breaking a newly defined or changed rule. You will either want to make changes to your application or add an override to `module.exports.rules`.

**This is normal**. The preset is just supposed to be a base for your own config. There is nothing wrong with overriding rules to suit your preferences or your application's needs.

You could also:

* Not use the `@roots/bud-sass/config/stylelint` preset and maintain your own config entirely. This will give you maximum control over when updates are applied.
* Make an issue with `stylelint-config-standard` or `stylelint-config-recommended-scss` if you disagree with the change.

What you shouldn't do:

* Make an issue in `roots/bud` (We want to override upstream configurations as little as possible so as to provide a predictable starting point for a large number of diverse projects).
