---
date_modified: 2023-03-13 11:00
date_published: 2023-03-13 11:00
description: Sage includes Tailwind CSS support, including generating the Tailwind color palette, font families, and sizes for `theme.json` which is used by the block editor.
title: Tailwind CSS
authors:
  - ben
---

# Tailwind CSS

Sage includes support for Tailwind CSS out of the box, along with some helpful functionality for integrating your Tailwind config into the WordPress block editor.

## Content configuration

Sage sets the Tailwind [content configuration](https://tailwindcss.com/docs/content-configuration) to the areas of your project that will contain Tailwind CSS class names. Any of the files in these files and directories that use Tailwind class names will be included in your theme build:

```javascript
content: ['./index.php', './app/**/*.php', './resources/**/*.{php,vue,js}'],
```

By default, this covers all theme template files along with all files in the `app/` directory.

## Generating `theme.json` from Tailwind's config

Sage includes a `theme.json` file for configuring the WordPress editor. It's generated during [asset builds](compiling-assets.md) automatically and accounts for settings from the Tailwind config (`tailwind.config.cjs`).

In Sage's Bud config (`bud.config.js`), there a section for generating `theme.json`. This is where you'll want to make any changes to your `theme.json` file.

### Default color palette

Rather than [manually defining the editor colors](https://developer.wordpress.org/themes/advanced-topics/theme-json/#color) by adding them to `theme.json`, your Tailwind config will be used to generate colors for the WordPress editor.

Tailwind’s [default color palette](https://tailwindcss.com/docs/customizing-colors) is a good starting point for sites that don’t already have color/branding guidelines to follow.

### Sizes and font families

In addition to including Tailwind’s color palette for the WordPress editor, Sage will also configure the editor with Tailwind’s font families and font sizes.

Be sure to take a look at [Bud’s documentation on this feature](https://bud.js.org/extensions/sage/theme.json/) for further information.

## Using Tailwind's colors from the block editor on the front-end

While Sage makes Tailwind's colors available in the block editor, it doesn't include an approach out of the box for dealing with the front-end styling for the editor classes.

You will need to decide how you want to handle the front-end styling for those classes. For example, you might want to add the following to one of your stylesheets:

```css
.has-amber-50-background-color {
  @apply bg-amber-50;
}
```

This CSS would allow Tailwind's `amber-50` background color to work when used from the block editor.

### Automating the front-end classes from the editor

If you wanted to automate adding all of the colors, you could use the following example Tailwind plugin:

```javascript
// Add to the top of your tailwind.config.cjs file
const plugin = require('tailwindcss/plugin');

// Add the following within your tailwind.config.cjs plugins array:
plugins: [
  plugin(function ({addUtilities, theme, variants}) {
    const colors = theme('colors');

    const colorUtilities = Object.keys(colors).reduce((acc, color) => {
      if (typeof colors[color] === 'string') {
        acc[`.has-${color}`] = {
          'color': colors[color],
        };
        acc[`.has-${color}-background-color`] = {
          'background-color': colors[color],
        };
      } else {
        Object.keys(colors[color]).forEach((shade) => {
          acc[`.has-${color}-${shade}-background-color`] = {
            'background-color': colors[color][shade],
          };
        });
      }

      return acc;
    }, {});

    addUtilities(colorUtilities, variants('backgroundColor'));
  }),
],
```

The biggest issue with this approach is that Tailwind has no insight into which classes have been used from the WordPress editor. If you wanted to allow all of the Tailwind CSS colors to be added to your generated CSS for use in the editor, you could use the [`safelist` option](https://tailwindcss.com/docs/content-configuration#safelisting-classes):

```javascript
content: ['./index.php', './app/**/*.php', './resources/**/*.{php,vue,js}'],
// Allow all classes that start with has-
safelist: [
  {
    pattern: /^has-/,
  }
],
```

::: warning Note
Beware of how large your stylesheets will get if you are using all of the Tailwind CSS colors along with this approach
:::

The ideal setup is to remove _all_ classes that you aren't using from Tailwind, and only configure Tailwind with the classes that are required for your project.

In the future, we might an add a more streamlined approach to doing this to Bud's `theme.json` generator. For now, deciding how you want the front-end CSS to work for Tailwind generated classes is up to you.
