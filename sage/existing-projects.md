# Existing Projects

The majority of the Sage documentation focuses on setting up new themes. 
Use this document If you are collaborating on, or taking over an existing theme.

## Gathering information

To work on an existing Sage project you need to know what version of Sage you're working with.

If the root of your theme contains a `webpack.mix.js`, and the `/app` directory contains a `View` directory, then you're likely working with **Sage 10**.

If the `package.json` file in the root of your theme has something that looks like this:

```json
{
  "name": "sage",
  "version": "9.0.10",
  ...
}
```

Then you're working with **Sage 9**.

If your `package.json` file doesn't contain the Sage version number, look for a `bower.json` file. 
If this file exists, it's safe to assume you're working with **Sage 8**.
 Otherwise assume you're likely working with **Sage 9**.
 
If none of the above apply, you may be working with a very old version of Sage which doesn't currently have published documentation.
Someone on the [forums](https://discourse.roots.io/) may be able to help you.

## Set up your development environment

Prepare your development environment based on what version of Sage you're working with. 
For Sage 10:

Install latest Node.js LTS version with [Volta](https://docs.volta.sh/guide/getting-started):

```sh
$ volta install node
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
