---
date_modified: 2023-03-12 19:25
date_published: 2023-01-23 19:40
description: How to add ESLint, Prettier, and Stylelint to your Sage 10 theme.
title: Adding ESLint, Prettier, and Stylelint
authors:
  - ben
  - chrillep
---

# Adding ESLint, Prettier, and Stylelint

::: tip We recommend enabling linting
Sage 10 no longer includes linting styles or scripts out of the box. We highly recommend adding and configuring [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [Stylelint](https://stylelint.io/) based on your needs.
:::

Bud has several extensions that can be added to your theme dependencies to help with linting. To add ESLint, Prettier, and Stylelint to your theme, run:

```
yarn add @roots/bud-eslint -D
yarn add @roots/bud-prettier -D 
yarn add @roots/bud-stylelint -D
yarn add @roots/eslint-config -D
```

Add `scripts` to `package.json` for better access to linting your scripts and styles:

```json
...
"scripts": {
  "lint": "yarn lint:js && yarn lint:css",
  "lint:js": "eslint resources/scripts",
  "lint:css": "stylelint \"resources/**/*.{css,scss,vue}\"",
  "test": "yarn lint",
}
...
```

Then create new files for `.eslintrc.cjs`, `.prettierrc`, and `.stylelintrc`.

`.eslintrc.cjs`:

```javascript
module.exports = {
  root: true,
  extends: ['@roots/eslint-config/sage'],
};
```

`.prettierrc`:

```json
{
  "bracketSpacing": false,
  "jsxBracketSameLine": true,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

`.stylelintrc`:

```json
{
  "extends": [
    "@roots/sage/stylelint-config",
    "@roots/bud-tailwindcss/stylelint-config"
  ]
}
```
