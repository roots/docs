The majority of the Sage documentation focuses on setting up new themes. Use this document If you are collaborating on, or taking over an existing theme.

## Getting started

If you've never worked on a Sage project before, make sure your local development environment is configured by following the [Getting Started guide(s)](https://roots.io/docs/getting-started/index.html).

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

Prepare your development environment based on what version of Sage you're working with. For Sage 8:

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
