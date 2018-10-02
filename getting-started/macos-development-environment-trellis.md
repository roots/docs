---
ID: 29653
post_title: 'macOS Development Environment: Trellis'
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/macos-development-environment-trellis/
published: true
post_date: 2018-08-20 14:20:52
---
Trellis relies on a few additional software packages to function. Install these packages:

- VirtualBox >= 4.3.10
- Vagrant >= 1.8.5
- Ansible >= 2.4

## VirtualBox

Download and install the "OS X Hosts" version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

## Vagrant

Install Vagrant from Homebrew:

```sh
$ brew cask install vagrant
```

## Ansible

If you don't already have pip (Python package manager) installed, install it:

```sh
$ sudo easy_install pip
```

Install Ansible with pip:

```sh
$ pip install ansible
```

To install a specific Ansible version:

```sh
$ pip install ansible==2.4.0.0
```
