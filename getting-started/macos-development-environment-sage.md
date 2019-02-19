---
ID: 29651
post_title: 'macOS Development Environment: Sage'
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/macos-development-environment-sage/
published: true
post_date: 2018-08-20 14:20:36
---
Sage relies on a few build tools to manage dependencies and build assets. Install these tools:

- nvm
- Node.js
- yarn

## nvm

Install nvm from the instructions at [https://github.com/creationix/nvm](https://github.com/creationix/nvm), or with the following command:

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

## Node.js

Install the latest Node.js LTS release from nvm:

```sh
$ nvm install --lts
```

## yarn

Install yarn from Homebrew:

```sh
$ brew install yarn --without-node
```