---
ID: 29770
post_title: Ubuntu Linux Basic Setup
author: Michael W. Delaney
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/ubuntu-linux-basic-setup/
published: true
post_date: 2018-08-21 20:37:16
---
Roots Trellis, Bedrock, and Sage development on Ubuntu Linux is supported by several libraries and software packages. This guide describes how to get the following packages installed and configured on your computer:

- Git
- Composer

## Git

Git is available from the standard Ubuntu software repositories and may be installed with the following command:

```sh
$ sudo apt-get install git
```

Configure Git with your user information:

```sh
$ git config --global user.name "Your Name"
$ git config --global user.name "yourname@example.com"
```

## Composer

Install Composer from the standard Ubuntu software repositories:

```sh
$ sudo apt-get install composer
```

## SSH Keys

### Create SSH Keys

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