---
ID: 29775
post_title: 'Ubuntu Linux Development Environment: Trellis'
author: Michael W. Delaney
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/ubuntu-linux-development-environment-trellis/
published: true
post_date: 2018-08-21 20:37:47
---
Trellis relies on a few other software tools. Install these tools:

- VirtualBox >= 4.3.10
- Vagrant >= 1.8.5
- Ansible >= 2.4

## VirtualBox

Install VirtualBox:

```sh
$ sudo apt-get install virtualbox
```

## Vagrant

[Download the latest version of Vagrant](https://www.vagrantup.com/downloads.html) and install it with `dpkg -i`:

```sh
$ sudo dpkg -i vagrant_2.2.3_x86_64.deb
```

## Ansible

Install pip (Python package manager) if you don't already have it:

```sh
$ sudo apt-get install python-pip
```

Install Ansible with pip:
```sh
$ pip install ansible

# Install a specific Ansible version:
$ pip install ansible==2.4.0.0
```