# Replace default Tailwind config with Bootstrap
Sage 10 ships with [Tailwind](https://tailwindcss.com), but many users may wish to use Bootstrap, or another CSS framework. This document outlines how to replace Tailwind with the latest major version of Bootstrap (Bootstrap 5.1 as of this writing). The process should be similar for other popular CSS frameworks.

## Remove Tailwind
Before adding Bootstrap, remove Tailwind to avoid conflicts between CSS frameworks.

### 1) Remove the Tailwind package
In your terminal, in the root directory of your Sage 10-based theme, type the following to remove Roots' Tailwind package:

```sh
yarn remove @roots/bud-tailwindcss
```

### 2) Remove Tailwind linting from from `.stylelintrc`

Open your Sage 10-based theme's `.stylelintrc` file and **delete** the following line:

```json
    "@roots/bud-tailwindcss/stylelint-config"
```

### 3) Remove Tailwind from your CSS entry-point

Open your theme's `resources/styles/app.css` and **delete** the following lines:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

### 4) Delete Tailwind config file

Delete `tailwind.config.js` from your theme.


## Add Bootstrap

Now that Tailwind is completely removed, add Bootstrap 5 to your Sage 10-based theme.

### 1) Install native support for Sass/scss 
In your terminal, in the root directory of your Sage 10-based them, type the following:

```sh
yarn add @roots/bud-sass --dev
```

### 2) Install Boostrap as a dependency

In your terminal, in the root directory of your theme, type the following:
```sh
yarn add bootstrap --dev
```

#### Optional but recommended: Install Popper dependency for Bootstrap

To avoid an ugly error message in Bud about missing dependencies, type the following in the root directory of your theme:

```sh
yarn add @popperjs/core --dev
```

### 3) Import Bootstrap javascript

Open your theme's `resources/scripts/app.js` and add:

```js
// Import Bootstrap
import 'bootstrap';
```

### 4) Import Bootstrap styles

In your theme's `resources/styles` directory rename `app.css` to `app.scss` and rename `editor.css` to `editor.scss`.

Open your theme's newly renamed `resources/styles/app.scss` and add the following lines:

```css
@import "bootstrap";
```

**Note:** You may wish to import only the parts of Bootstrap you plan to use in your theme. You can learn more about importing just the parts you need [here](https://getbootstrap.com/docs/5.1/customize/sass/#importing).
