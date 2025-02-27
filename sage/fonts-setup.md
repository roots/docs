---
date_modified: 2025-02-27 14:30
date_published: 2023-02-20 11:30
description: How to setup fonts in Sage for both the front-end and the WordPress editor with `theme.json`.
title: How to Setup Fonts
authors:
  - ben
---

# How to Setup Fonts

Sage includes an empty `resources/fonts/` directory for you to use for any fonts you want to use in your theme.

## Add your fonts

The first step to setting up a font in Sage is to add the `woff2` file to the `resources/fonts/` directory. Since [woff2 usage](https://caniuse.com/?search=woff2) is so high, you probably don't need to consider any other font file formats.

For this example, we're going to download [Public Sans from the google-webfonts-helper](https://gwfh.mranftl.com/fonts/public-sans?subsets=latin). The [google-webfonts-helper](https://gwfh.mranftl.com/) is a good resource for quickly grabbing font files and their CSS from Google Fonts.

```plaintext
resources
├── css
│   ├── app.css
│   └── editor.css
├── fonts
│   └── public-sans-v14-latin-regular.woff2
├── images
├── js
└── views
```

## Add the CSS

You can place the CSS for your web fonts wherever you'd like. We recommend creating a `css/fonts.css` file and then importing it from `app.css` and `editor.css`:

```css
@import './fonts.css';
```

Define your `@font-face` in `css/fonts.css`:

```css
@font-face {
  font-display: swap;
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 400;
  src: url('@fonts/public-sans-v18-latin-regular.woff2') format('woff2'),
}
```

## Add the font to your Tailwind colors

Open `app.css` and add the new font family:

```css

@theme {
  --font-sans: "Public Sans", sans-serif;
}
```

See the [Tailwind CSS docs on customizing fonts](https://tailwindcss.com/docs/font-family#customizing-your-theme) for more information.
