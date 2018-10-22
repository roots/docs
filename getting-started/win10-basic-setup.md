Basic Windows 10 development environment for Roots Trellis, Bedrock, and Sage

## Requirements

Roots Trellis, Bedrock, and Sage development on Windows 10 relies on several libraries and software packages. This guide will show you how to install and configure each of these recommended packages on your computer. This guide assumes basic knowledge of the command line (provided commands should work in PowerShell or CMD, unless otherwise specified).

### Everything

- git

### Trellis

- putty (and friends)
- Vagrant
- VirtualBox

### Sage

- PHP
- Composer
- nvm
- Node.js
- yarn

## Git

You may already have git installed. Open up your command line of choice, and run the following command:

```cli
git --version
```

If that tells you what version of git you have, then skip this section! You're good to go.

If that command fails, however, go [download Git for Windows](https://git-scm.com/download/win). Run the installer, and select "Use Git from the Windows Command Prompt" when asked about "Adjusting your PATH environment". Leave the other options unchanged (except for the one about the default editor, if you don't want to use vi).

Once it finishes, close all open CMD/PowerShell sessions, open up a new one and run `git --version`. Git should now be installed!

## Putty

Putty is a Windows SSH client, but it also includes a number of utilities that will be useful to us—most notably pageant, which can manage our SSH keys. To install putty and its friends, simply [download and run the installer](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html).

## Vagrant

Vagrant provides a nice simple interface for Virtual Machine management. It is used by Trellis, but can also be
used directly through the CLI. Installing Vagrant is easy: Just [download and run the installer](https://www.vagrantup.com/downloads.html).

> Vagrant supports several different virtualization services, including VMWare and VirtualBox. This documentation
> will use VirtualBox because it is easy to use and free, but it is not the only option.

## VirtualBox

VirtualBox creates Virtual Machines, or VMs. It is used by Vagrant (and Trellis) to spin up VMs for you to develop
on.

Installing VirtualBox is easy: Just [download and run the installer](https://www.virtualbox.org/wiki/Downloads).
The machine running VirtualBox (as opposed to the machine running _on_ VirtualBox) is called the "host," so 
you'll want to download the "Windows hosts" installer. You may need to restart your computer during installation.

## PHP

> If you're using the full Roots stack, you don't need to install PHP in Windows--Trellis will install it on the 
> Virtual Machine, and you can log into the Virtual Machine to do any PHP tasks Roots will require.

You may already have PHP installed. Open up your command line of choice, and run the following command:

```cli
php --version
```

If that tells you what version of PHP you have, and that version is greater than or equal to 7.1.3, then skip this section! If your PHP version is less than 7.1.3, you'll need to upgrade it, but running through the upgrade process is outside the scope of this document.

If you still need to install PHP, first you'll need to [download it](https://windows.php.net/download#php-7.2). You'll want the ***VC15 x64 Non Thread Safe*** version. You will also need to download the [Visual C++ Redistributable for Visual Studio 2017 x64](https://aka.ms/vs/15/release/VC_redist.x64.exe) bundle.

Once you've downloaded both, first install _Visual C++ Redistributable for Visual Studio 2017 x64_. When that's complete, unzip the PHP download into `C:\Users\<user>\.bin\php`. These are all the files PHP needs to run, but you'll need to change a few settings first. 

Look in `C:\Users\<user>\.bin\php` for a file called `php.ini-development`. Make a copy in the same directory, and rename the copy `php.ini`. Open up `php.ini`, and search for a line that looks like this:

```ini
; extension_dir = "ext"
```

Uncomment this line by removing the semicolon at the beginning. 

Next, search the same file for `extension=curl` and `extension=mbstring` and uncomment them as well. These are extensions that Composer will need.

Finally, open the "Run" dialog, and enter `SystemPropertiesAdvanced.exe`, then hit "OK" to open "System Properties / Advanced". Look for the button near the bottom that says "Environment Variables" and click it. Under "User variables for <user>" look for the "Path" row. Double-click on that row to open it, and then click the "New" button. Paste in the directory where you extracted the PHP files: `C:\Users\<user>\.bin\php`. Then press the "OK" button on all the windows you opened util they're all closed.

Close all open CMD/PowerShell sessions, then open up a new one and run `php --version`. Now PHP should be installed!

## Composer

> If you're using the full Roots stack, you don't need to install Composer in Windows--Trellis will install it on the 
> Virtual Machine, and you can log into the Virtual Machine to do Composer things.

Composer is a PHP application, so you'll have to have PHP installed before you can install Composer.

First, download the [Composer installer](https://getcomposer.org/Composer-Setup.exe). Then, run it. After the installer finishes, close all CMD/Powershell windows, then open a new one and run `composer --version`. You should see the version of Composer you have installed.

## NVM

NVM is a very useful little program that allows you to easily manage Node.js installations, and switch between versions of Node.js when necessary. Trellis/Bedrock/Sage won't generally require these kinds of gymnastics, but other Node.js-based development might! So it's always good to be prepared.

> **Note:** We're going to be using "NVM for Windows," but we'll just be calling it "NVM." There is another program that does the same thing for Linux-based machine that is also named "nvm" (it is, in fact, the original). Just keep this in mind if you ever go out on the internet looking for NVM help.

Before installing NVM, you'll need to remove Node.js from your system if you were already using it for something. As per the NVM for Windows docs:

> Please note, you need to uninstall any existing versions of node.js before installing NVM for Windows. Also delete any existing nodejs installation directories (e.g., "C:\Program Files\nodejs") that might remain. NVM's generated symlink will not overwrite an existing (even empty) installation directory.
> 
> You should also delete the existing npm install location (e.g. "C:\Users<user>\AppData\Roaming\npm") so that the nvm install location will be correctly used instead. After install, reinstalling global utilities (e.g. gulp) will have to be done for each installed version of node.

To begin installation, first [download the latest release](https://github.com/coreybutler/nvm-windows/releases), then simply extract and run it. Once the installation is finished, close all CMD/PowerShell sessions, open up a new one, and run `nvm version` to make sure the installation worked.

## Node.js

With NVM installed, we can now easily install Node.js itself. We're going to use it to install the most up-to-date LTS (Long Term Service) release, which as of this writing is 8.11.4. Generally for this type of development you'll want to install the LTS version of Node. You can always find the current LTS and Stable versions at [nodejs.org](https://nodejs.org) 

To install Node, open up a command line and enter the following:

```cli
nvm install 8.11.4
```

Once that install has finished, we need to tell NVM that we want to _use_ the version we just installed:

```cli
nvm use 8.11.4
```

Now, run `node --version`. It should return `v8.11.4`.

## yarn

Yarn is a package manager for JavaScript that Sage uses to manage it's JavaScript packages. It requires Node.js, so make sure you've installed node first. Once that's done, [download the Windows Stable version of yarn, and run the installer](https://yarnpkg.com/en/docs/install#windows-stable). You may need to restart your computer, or close all open command line windows in order for yarn to be available.
