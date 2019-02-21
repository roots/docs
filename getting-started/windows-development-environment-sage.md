---
ID: 33223
post_title: 'Windows Development Environment: Sage'
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/windows-development-environment-sage/
published: true
post_date: 2019-02-21 16:05:27
---
Sage relies on a few build tools to manage dependencies and build assets. Install these tools:

- nvm
- Node.js
- yarn

**⚠️ All commands must be ran from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**

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

Install yarn:

```sh
$ npm install --global yarn
```