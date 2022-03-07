---
description: Sage uses Bud to compile and optimize assets, and to provide a simple interface for doing so.
---

# Compiling Assets

[Bud](https://github.com/roots/bud) is the primary project responsible for the asset workflow in Sage.

Bud is a wrapper for [Webpack](https://webpack.github.io/), and handles compiling stylesheets, checking for JavaScript errors, copying images and fonts, and concatenating and minifying files.

It also provides a fluent API that some find to be easier to interact with than Webpack itself.

## Available build commands

- `yarn build` — Build assets
- `yarn dev` — Build assets when file changes are made, start dev session

## Theme assets

What files are built and how is controlled from the `bud.config.js` file in the root of the theme.

In-depth discussion of how to configure Bud can be found in the [Bud documentation](https://bud.js.org/), but Sage ships with a configuration that should provide a sufficient starting point—and depending on your use case, may not need any additional configuration.

The configuration will generate the following files:

- `app.css` - The primary stylesheet for the theme.
- `app.js` - The primary JavaScript file for the theme.
- `editor.css` - Styles used by the editor when creating/editing posts.
- `editor.js` - JavaScript for the block editor, i.e. block styles and variants.

It will also copy any files in the `images` or `fonts` directories under `/resources/assets/` into the `public` directory with the other compiled files, but does not optimize or compress them.

### Images in template files

Use the `@asset` directive to call images from template files:

```php
<img src="@asset('images/example.jpg')">
```

### Images in CSS
CSS files and images are sibling folders, so you can reference images in CSS:
```css
.background {
  background-image: url(../images/image.jpg);
}
```

### Assets in PHP

In your PHP, you can make use of the `\Roots\asset()` function, which is what powers the `@asset` directive.

```php
$asset = \Roots\asset('images/example.jpg');
// The public URI of the asset
echo $asset;
echo $asset->url();

// The server path of the asset
echo $asset->path();

// The contents of the asset 
echo $asset->contents();
```

## Linting

::: tip We recommend enabling linting
Sage 10 no longer includes linting styles or scripts out of the box. We highly recommend adding and configuring ESLint, Prettier, and Stylelint based on your needs.
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
  "lint": "npm run lint:js && npm run lint:css",
  "lint:js": "eslint resources/scripts",
  "lint:css": "stylelint \"resources/**/*.{css,scss,vue}\"",
  "test": "npm run lint",
}
...
```

Then create `.eslintrc.js`, `.prettierrc`, and `.stylelintrc`:

:::: tabs

::: tab ".eslintrc.js"

```js
module.exports = {
  root: true,
  extends: ['@roots/eslint-config/sage'],
};
```

:::

::: tab ".prettierrc"

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

:::

::: tab ".stylelintrc"

```json
{
  "extends": [
    "@roots/sage/stylelint-config",
    "@roots/bud-tailwindcss/stylelint-config"
  ]
}
```

:::

::::