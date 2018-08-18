---
ID:
post_title: Trellis development environment for macOS
author: Michael W. Delaney
post_excerpt: ""
layout: doc
permalink: >

published: false
post_date:
---
# Requirements

---

Trellis relies on a few other software tools. Install these tools:

- Virtualbox >= 4.3.10
- Vagrant >= 1.8.5
- Ansible >= 2.4

## VirtualBox

Download and install the "OS X Hosts" version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

## Vagrant

Install Vagrant from Homebrew:

    $ brew cask install vagrant

## Ansible

If you don't already have Pip (Python package manager) installed, install it:

    $ sudo easy_install pip

Install Ansible with Pip:

    $ pip install ansible

To install a specific Ansible version:

    $ pip install ansible==2.4.0.0
