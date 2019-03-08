---
ID: 31921
post_title: Existing Sage Projects
author: Michael W. Delaney
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/sage/docs/existing-sage-projects/
published: true
post_date: 2018-12-20 07:56:54
---
The majority of the Sage documentation focuses on setting up new themes. Use this document If you are collaborating on, or taking over an existing theme.

## Getting started

If you've never worked on a Sage project before, make sure your local development environment is configured by following the [Getting Started guide(s)](https://roots.io/getting-started/docs/development-environment-recommendations/).

## Gathering information

To work on an existing Sage project you need to know what version of Sage you're working with. You can usually find this by checking the `package.json` file:

```json
{
  "name": "sage",
  "version": "9.0.5",
  ...
}
```

If your `package.json` file doesn't contain the Sage version number, look for a `bower.json` file. If this file exists, it's safe to assume you're working with Sage 8. Otherwise assume you're working with Sage 9.

## Set up your development environment

Prepare your development environment based on what version of Sage you're working with.

### Sage 9

Set Node.js version with nvm:

```sh
$ nvm install --lts
```

Install Composer dependencies:

```sh
$ composer install
```

Install Node dependencies:

```sh
$ yarn
```

Build your project:

```sh
yarn build
```

For complete details on working with Sage 9, see the [Sage 9 documentation](https://roots.io/sage/docs/theme-installation/) or consider purchasing [the book](https://roots.io/books/theme-development-with-sage/)!

### Sage 8

Set Node.js version 4.5 with nvm:

```sh
$ nvm use 4.5
```

Install Node dependencies:

```sh
$ npm install
```

Install Bower dependencies:

```sh
$ bower install
```

Build your project with:

```sh
$ gulp
```

For complete details on working with Sage 8, see the archived [Sage 8 documentation](https://github.com/roots/docs/tree/e4770f667c54d5bab0aa42e24f07ec0d4524d207/sage).