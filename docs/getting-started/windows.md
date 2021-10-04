# Windows (WSL)

Trellis, Bedrock, and Sage development on Windows is supported by several libraries and software packages. 

::: warning Note
**All commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**
:::

## Global Dependencies

### Git

Configure Git with your user information:

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "yourname@example.com"
```

### PHP

Install PHP 7.4:

```bash
$ sudo add-apt-repository ppa:ondrej/php
$ sudo apt-get update
$ sudo apt-get install php7.4 php7.4-mbstring php7.4-xml php7.4-zip
```

### Composer

Install Composer:

```bash
$ curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

### WP-CLI

Install WP-CLI:

```bash
$ cd ~ && curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
$ chmod +x wp-cli.phar
$ sudo mv wp-cli.phar /usr/local/bin/wp
```

## SSH keys

### Creating an SSH key

Trellis and GitHub both use SSH keys to communicate securely without the need to type a username and password each time. Create your SSH key:

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

For more details on generating SSH keys, see [GitHub's excellent documentation](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

[Add your new public SSH key to your GitHub account](https://github.com/settings/ssh/new). To copy your public key from the terminal to the clipboard:

```bash
$ cat ~/.ssh/id_rsa.pub | clip.exe
```

### Add your SSH key to the ssh-agent

Modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

Edit your `~/.ssh/config` file and add the following lines:

```bash
Host *
  AddKeysToAgent yes
  IgnoreUnknown UseKeychain
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

## Working with Sage

Sage relies on a few build tools to manage dependencies and build assets.

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

- VirtualBox >= 4.3.10 (install on Windows)
- Vagrant >= 1.8.5 (install on Windows and WSL)
- Ansible >= 2.7, < 2.8 (install in WSL)


### VirtualBox

Download and install the latest version of [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for Windows.

### Vagrant

[Install the latest version of Vagrant](https://www.vagrantup.com/downloads.html) in WSL, and in Windows. The WSL version will depend on the Linux distribution you're using; for instance if you're using Ubuntu, you'll want the Debian package. It is *imperative* that you install *the same version* of Vagrant in both Windows and WSL; even a single patch number difference will prevent it from working. You have to install both versions because VMs cannot exist "within" WSL; they must be created "outside," in Windows. To do this, Vagrant-in-WSL needs to communicate with Vagrant-in-Windows.

[Follow the instructions on the Vagrant site](https://www.vagrantup.com/docs/other/wsl.html) to configure Vagrant to communicate correctly with Windows and VirtualBox. This will likely involve adding something like the following to `.bashrc` or a similar file executed when your WSL shell boots up:

```bash
export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"
export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1"
```

The above should be taken as **examples** and not just copied and pasted into your configuration. Read the linked document and make sure you're configuring your system correctly.

### Ansible

::: warning Note
The following commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).
:::

Install pip (Python package manager) if you don't already have it:

```bash
$ sudo apt-get install python3-pip
```

Install Ansible with pip:
```bash
$ pip install ansible

# Install a specific Ansible version:
$ pip install ansible==2.4.0.0
```

### Troubleshooting

#### Maximum recursion depth exceeded

If you run into a "maximum recursion depth exceeded" error while provisioning, try downgrading Ansible to 2.5.1 (`pip install ansible==2.5.1`) and then re-provisioning.

You'll also need to update your [`vagrant.default.yml`](https://github.com/roots/trellis/blob/19b0ce6da683d7038484e55b6a312776057a04a6/vagrant.default.yml#L7) so that `vagrant_ansible_version` references 2.5.1:

```diff
-vagrant_ansible_version: '2.9.10'
+vagrant_ansible_version: '2.5.1'
```

#### `vagrant ssh` doesn't work

Try:

```bash
$ echo 'alias vssh="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no vagrant@127.0.0.1 -i ./.vagrant/machines/default/virtualbox/private_key -p"' >> ~/.bashrc
$ source ~/.bashrc
```

#### Slow site

If your site loads extremely slowly, try installing the `vagrant-winnfsd` plugin. In some cases this plugin can cause problems, so you may need to uninstall it if things get worse.

::: warning Note
The following commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).
:::

```bash
$ vagrant plugin install vagrant-winnfsd
$ vagrant reload # if Vagrant was already running
```

If `vagrant-winnfsd` causes problems, before uninstalling it you can try forcing it to mount using TCP instead of UDP by adding `nfs_udp: false` to the NFS mount point configuration lines in your `Vagrantfile`.

#### Ansible or Vagrant complains about permissions

Windows and Linux use different permission models, and mapping Windows permissions to Linux is imperfect. In some cases, Vagrant or Ansible will refuse to run if your permissions inside WSL are too...permissive. WSL offers a way to apply Linux permissions to files stored in the Windows filesystem through the use of metadata. I encourage you to read more about it in [Microsoft's WSL docs](https://devblogs.microsoft.com/commandline/automatically-configuring-wsl/), but the short version is that adding the following to `/etc/wsl.conf` in your WSL instance and then restarting it will allow you to apply Linux permissions:

```
[automount]
options = "metadata,umask=22,fmask=11"
```

Once you've done that, you can then use `chmod` to apply the correct permissions. For instance, Ansible may complain that it will ignore Trellis's `ansible.cfg` becuase it is in a world-writable directory; You can fix this by running `chmod -R 744 trellis`. Vagrant may complain that the ssh keys generated for it to log into the VM are too permissive: `chmod 600` on the key file should fix that issue.
