---
ID: 33221
post_title: Windows Basic Setup
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/windows-basic-setup/
published: true
post_date: 2019-02-21 16:04:11
---
Trellis, Bedrock, and Sage development on Windows is supported by several libraries and software packages. This guide describes how to get the following packages installed and configured on your computer:

- Git
- PHP
- Composer
- WP-CLI

**⚠️ All commands must be ran from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**

## Git

Configure Git with your user information:

```sh
$ git config --global user.name "Your Name"
$ git config --global user.email "yourname@example.com"
```

## PHP

Install PHP 7.3:

```sh
$ sudo add-apt-repository ppa:ondrej/php
$ sudo apt-get update
$ sudo apt-get install php7.3 php7.3-mbstring php7.3-xml
```

## Composer

Install Composer:

```sh
$ curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

## WP-CLI

Install WP-CLI:

```sh
$ cd ~ && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
$ chmod +x wp-cli.phar
$ sudo mv wp-cli.phar /usr/local/bin/wp
```

## SSH keys

### Create SSH keys

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH keys:

```sh
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

### Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file and add the following lines:

```sh
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```