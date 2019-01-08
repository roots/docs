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

Install VirtualBox from the standard Ubuntu software repositories:

```sh
$ sudo apt-get install virtualbox
```

## Vagrant

Install Vagrant from the standard Ubuntu software repositories:

```sh
$ sudo apt-get install vagrant
```

## Ansible

If you don't already have pip (Python package manager) installed, install it:

```sh
$ sudo apt-get install python-pip
```

Install Ansible with pip:
```sh
$ pip install ansible
```

To install a specific Ansible version:

```sh
$ pip install ansible==2.4.0.0
```
