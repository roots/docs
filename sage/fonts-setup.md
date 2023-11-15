---
date_modified: 2023-02-20 11:30
date_published: 2023-02-20 11:30
description: How to setup fonts in Sage 10 for both the front-end and the WordPress editor with `theme.json`.
title: How to Setup Fonts
authors:
  - ben
---

# How to Setup Fonts

Sage 10 includes an empty `resources/fonts/` directory for you to use for any fonts you want to use in your theme.

The Sage extension in bud.js, the build tool used in Sage, also contains a `@fonts` alias that can be used to reference assets in the `fonts/` directory.

## Add your fonts

The first step to setting up a font in Sage is to add the `woff2` file to the `resources/fonts/` directory. Since [woff2 usage](https://caniuse.com/?search=woff2) is so high, you probably don't need to consider any other font file formats.

For this example, we're going to download [Public Sans from the google-webfonts-helper](https://gwfh.mranftl.com/fonts/public-sans?subsets=latin). The [google-webfonts-helper](https://gwfh.mranftl.com/) is a good resource for quickly grabbing font files and their CSS from Google Fonts.

```plaintext
resources
├── fonts
│   └── public-sans-v14-latin-regular.woff2
├── images
├── scripts
├── styles
│   ├── app.css
│   └── editor.css
└── views
```

## Add the CSS

You can place the CSS for your web fonts wherever you'd like. We recommend creating a `styles/common/fonts.css` file and then importing it from `app.css` and `editor.css`:

```css
@import 'common/fonts';
```

Define your `@font-face` in `styles/common/fonts.css`:

```css
@font-face {
  font-display: swap;
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 400;
  src: url('~@fonts/public-sans-v14-latin-regular.woff2') format('woff2'),
}
```

## Add the font to your Tailwind config

Open `tailwind.config.cjs` and add the new font family:

```diff
module.exports = {
  content: ['./index.php', './app/**/*.php', './resources/**/*.{php,vue,js}'],
  theme: {
    extend: {
      colors: {},
+      fontFamily: {
+        sans: 'Public Sans, sans-serif',
+      },
    },
  },
  plugins: [],
};
```

## Configure `theme.json` to use the font

[Bud generates the `theme.json` file in Sage](https://bud.js.org/extensions/sage/theme.json/), and `theme.json` can be configured for the new font:

```javascript
...
    .wpjson
      .setOption('styles', {
        typography: {
          fontFamily: 'var(--wp--preset--font-family--sans)',
        },
      })
      .settings({
...
```
