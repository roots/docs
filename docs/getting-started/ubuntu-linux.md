# Ubuntu Linux

Trellis, Bedrock, and Sage development on Ubuntu Linux is supported by several libraries and software packages. 

## Global Dependencies

### Git

Git is available from the standard Ubuntu software repositories and may be installed with the following command:

```bash
$ sudo apt-get install git
```

Configure Git with your user information:

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "yourname@example.com"
```

### Composer

Install Composer from the standard Ubuntu software repositories:

```bash
$ sudo apt-get install composer
```

## SSH Keys

### Creating an SSH key

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH keys:

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

### Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file and add the following lines:

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
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
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

Trellis relies on a few other software tools. Install these tools:

- VirtualBox >= 4.3.10
- Vagrant >= 1.8.5
- Ansible >= 2.4

### VirtualBox

Install VirtualBox:

```bash
$ sudo apt-get install virtualbox
```

### Vagrant

[Download the latest version of Vagrant](https://www.vagrantup.com/downloads.html) and install it with `dpkg -i`:

```bash
$ sudo dpkg -i vagrant_2.2.14_x86_64.deb
```

### Ansible

Install pip (Python package manager) if you don't already have it:

```bash
$ sudo apt-get install python-pip
```

Install Ansible with pip:
```bash
$ pip install ansible

# Install a specific Ansible version:
$ pip install ansible==2.4.0.0
```
