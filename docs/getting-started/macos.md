# macOS

Trellis, Bedrock, and Sage development on macOS 10.13+ is supported by several libraries and software packages. 

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

```bash
$ xcode-select --install
```

## Git

Git is automatically installed as part of the Xcode Command Line tools. Configure Git with your user information:

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "yourname@example.com"
```

## Homebrew

Install Homebrew from the instructions at [https://brew.sh](https://brew.sh/), or with the following command:

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Composer

Install Composer from Homebrew:

```bash
$ brew install composer
```

## SSH keys

### Create SSH key

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH key and add them to your macOS Keychain:

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

### Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file and add the following lines:

```bash
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

## Working with Sage

Sage relies on a few build tools to manage dependencies and build assets. Install these tools:

- nvm
- Node.js
- yarn

### nvm

Install nvm from the instructions at [https://github.com/creationix/nvm](https://github.com/creationix/nvm), or with the following command:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.38.0/install.sh | bash
```

### Node.js

Install the latest Node.js LTS release from nvm:

```bash
$ nvm install --lts
```

### yarn

Install yarn:

```bash
$ npm install --global yarn
```

## Working with Trellis

Trellis relies on a few additional software packages to function. Install these packages:

- VirtualBox >= 4.3.10
- Vagrant >= 2.1.0
- Ansible >= 2.5.3

### VirtualBox

Download and install the "OS X Hosts" version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

### Vagrant

Install Vagrant from Homebrew:

```bash
$ brew install --cask vagrant
```

### Ansible

Install pip (Python package manager) if you don't already have it:

```bash
$ sudo easy_install pip
```

Install Ansible with pip:

```bash
$ pip install ansible

# Install a specific Ansible version:
$ pip install ansible==2.4.0.0
```

### NFS

For macOS Catalina or later, you will have to grant full disk access to `/sbin/nfsd`.

1. Navigate to **System Preferences** → **Security & Privacy** → **Privacy** → **Full Disk Access**
2. Click `+`
3. Press <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>G</kbd> at the same time.
4. Enter the `/sbin` directory.
5. Double click the `nfsd` file.
