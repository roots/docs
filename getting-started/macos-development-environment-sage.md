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
- Node.js < 10.0
- yarn

## nvm

Install nvm from the instructions at [https://github.com/creationix/nvm](https://github.com/creationix/nvm), or with the following command:

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

## Node.js

Install node.js < 10.0 from nvm:

    $ nvm install lts/carbon

## yarn

Install yarn from Homebrew:

    $ brew 'yarn --without-node'
