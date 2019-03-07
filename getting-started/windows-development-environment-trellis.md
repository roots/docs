---
ID: 33225
post_title: 'Windows Development Environment: Trellis'
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/getting-started/docs/windows-development-environment-trellis/
published: true
post_date: 2019-02-21 16:05:55
---
Trellis relies on a few other software tools. Install these tools:

- VirtualBox >= 4.3.10 (install on Windows)
- Vagrant >= 1.8.5 (install on Windows)
- Ansible >= 2.4 (install in WSL)


## VirtualBox

Download and install the latest version of [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for Windows.

## Vagrant

[Download the latest version of Vagrant](https://www.vagrantup.com/downloads.html) for Windows.

Then alias `vagrant` in WSL to `vagrant.exe`:

**⚠️ The following commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**

```sh
$ echo 'alias vagrant=vagrant.exe' >> ~/.bashrc
$ source ~/.bashrc
```

## Ansible

**⚠️ The following commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**

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

### Troubleshooting

#### Maximum recursion depth exceeded

If you run into a "maximum recursion depth exceeded" error while provisioning, try downgrading Ansible to 2.5.1 (`pip install ansible==2.5.1`) and then re-provisioning.

#### `vagrant ssh` doesn't work

Try:

```sh
$ echo 'alias vssh="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no vagrant@127.0.0.1 -i ./.vagrant/machines/default/virtualbox/private_key -p"' >> ~/.bashrc
$ source ~/.bashrc
```

#### Slow site

If your site loads extremely slowly, try installing the `vagrant-winnfsd` plugin. In some cases this plugin can cause problems, so you may need to uninstall it if things get worse.

**⚠️ The following commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**

```sh
$ vagrant plugin install vagrant-winnfsd
$ vagrant reload # if Vagrant was already running
```

If `vagrant-winnfsd` causes problems, before uninstalling it you can try forcing it to mount using TCP instead of UDP by adding `nfs_udp: false` to the NFS mount point configuration lines in your `Vagrantfile`.