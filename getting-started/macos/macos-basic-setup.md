---
ID:
post_title: Basic Roots development environment for macOS
author: Michael W. Delaney
post_excerpt: ""
layout: doc
permalink: >

published: false
post_date:
---

Basic macOS 10.13+ development environment for Roots Trellis, Bedrock, and Sage

## Requirements

Roots Trellis, Bedrock, and Sage development on macOS is supported by several libraries and software packages. This guide will show you how to install and configure each of these recommended packages on your computer.

- Xcode Command Line Tools
- Git
- Homebrew
- Composer
- nvm
- Node.js

## Xcode Command Line Tools

Install Xcode Command Line Tools using the built-in command:

    $ xcode-select --install

## Git

Git is automatically installed as part of the Xcode Command Line tools. Configure Git with your user information:

    $ git config --global user.name "Your Name"
    $ git config --global user.name "yourname@example.com"

## Homebrew

Install Homebrew from the instructions at [https://brew.sh](https://brew.sh/), or with the following command:

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Install Cask:

    $ brew tap caskroom/cask

## Composer

Install Composer from Homebrew:

    $ brew install composer

# SSH Keys

---

## Create SSH Keys

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH keys and add them to your macOS Keychain:

    $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

## Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file

    $ nano ~/.ssh/config

Add the following lines:

    Host *
     AddKeysToAgent yes
     UseKeychain yes
     IdentityFile ~/.ssh/id_rsa
