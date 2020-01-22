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
- Vagrant >= 2.1.0
- Ansible >= 2.5.3

## VirtualBox

Download and install the "OS X Hosts" version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

## Vagrant

Install Vagrant from Homebrew:

```sh
$ brew cask install vagrant
```

## Ansible

Install pip (Python package manager) if you don't already have it:

```sh
$ sudo easy_install pip
```

Install Ansible with pip:

```sh
$ pip install ansible

# Install a specific Ansible version:
$ pip install ansible==2.4.0.0
```

## NFS

For macOS Catalina or later, you have to grant full disk access to `/sbin/nfsd`.

1. Navigate to **System Preferences** → **Security & Privacy** → **Privacy** → **Full Disk Access**
2. Click `+`
3. Press <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>G</kbd> at the same time
4. Enter the `/sbin` directory
5. Double click the `nfsd` file
