---
ID: 29648
post_title: macOS Basic Setup
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/macos-basic-setup/
published: true
post_date: 2018-08-20 13:33:35
---
Basic macOS 10.13+ development environment for Roots Trellis, Bedrock, and Sage

## Requirements

Trellis, Bedrock, and Sage development on macOS relies on several libraries and software packages. This guide will show you how to install and configure each of these recommended packages on your computer. This guide assumes basic knowledge of command line and terminal usage.

- Xcode Command Line Tools
- Git
- Homebrew
- Composer
- nvm
- Node.js

## Xcode Command Line Tools

Install Xcode Command Line Tools using the built-in command:

```sh
$ xcode-select --install
```

## Git

Git is automatically installed as part of the Xcode Command Line tools. Configure Git with your user information:

```sh
$ git config --global user.name "Your Name"
$ git config --global user.name "yourname@example.com"
```

## Homebrew

Install Homebrew from the instructions at [https://brew.sh](https://brew.sh/), or with the following command:

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install Cask:

```sh
$ brew tap caskroom/cask
```

## Composer

Install Composer from Homebrew:

```sh
$ brew install composer
```

## SSH Keys

### Create SSH Keys

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH keys and add them to your macOS Keychain:

```sh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

### Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file and add the following lines:

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```
