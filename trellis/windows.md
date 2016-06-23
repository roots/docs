---
ID: 5347
post_title: Windows
author: Ben Word
post_date: 2015-09-03 17:33:07
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/windows/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:90:"a:1:{i:0;s:72:"a:1:{i:0;s:54:"a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}";}";}";}'
---
## Installing Ansible

From the Ansible docs:

> Currently Ansible can be run from any machine with Python 2.6 installed (Windows isn’t supported for the control machine).
This includes Red Hat, Debian, CentOS, OS X, any of the BSDs, and so on.

If your host machine is running Windows, the workaround is to run Ansible *on the VM* (since it's running Ubuntu) and not locally. You do not need to install Ansible manually.

When you run `vagrant up`, the Vagrantfile will detect Windows and run the `windows.sh` script. The script installs Ansible and the external Ansible roles/packages on the VM (so you can also skip manually running the `ansible-galaxy install` command).

## Running Ansible commands

With Ansible installed on your Vagrant VM, you must run Ansible commands on the VM, not on the Windows host.

**Development server.** The Ansible commands for the development machine are run for you automatically when you run `vagrant up`.

**Remote servers (staging/production).** To run the `ansible-playbook` commands to provision remote servers, you'll need to SSH in to the VM, `cd` to the directory with your Trellis files (`/vagrant`), then run the [setup](https://github.com/roots/trellis#remote-server-setup-stagingproduction) and [deployment](https://github.com/roots/trellis#deploying-to-remote-servers) commands.

## SSH forwarding

SSH forwarding requires that you use an authentication agent combined with an SSH client that can read and forward keys from the agent. On Windows, this is typically done with Pageant (agent) and PuTTY (client). On most Unix-based systems, the OpenSSH suite provides `ssh-agent` (agent) and `ssh` (client). Vagrant uses [Net::SSH](https://github.com/net-ssh/net-ssh), which expects `ssh-agent` to be used.

If you're already using Pageant, then you can [install `ssh-pageant`](https://github.com/cuviper/ssh-pageant#installation) to act as a proxy between Pageant and `ssh` (or `vagrant ssh`), otherwise [GitHub provides an excellent guide](https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit) for automatically starting `ssh-agent` in [Babun](http://babun.github.io/)/[Cygwin](https://cygwin.com/index.html), [Git for Windows](https://git-for-windows.github.io/), or any other Unix shell emulation on Windows. If you use [cmder](http://cmder.net/), then simply type [`agent`](https://github.com/cmderdev/cmder/blob/master/bin/agent.cmd) in your console, and it will automatically load your keys and start the ssh-agent.

## Improving performance with VirtualBox

VirtualBox on Windows is known to have poor performance when using synced directories with many files (for example - when developing with Sage)

This can be mitigated by installing the `vagrant-winnfsd` and `vagrant-bindfs` plugins.  If both of these are installed, Trellis will detect and use them.  No other software is required as the vagrant-winnfsd plugin comes bundled with WinNFSD.

Before running the initial `vagrant up`, make sure that both of these plugins are installed.

In addition, `vagrant-winnfsd` requires Administrator privileges when doing the initial provisioning.  If UAC is enabled, make sure the initial `vagrant up` is run from a command prompt with elevated privileges (Run as Administrator).

WinNFSD is no longer being actively maintained, and there is currently no good replacement for Vagrant on Windows.  If the `vagrant-winnfsd` plugin is not working in your environment, you can revert to the default VirtualBox folder sync method by doing a `vagrant halt` and uninstalling the `vagrant-winnfsd` plugin.

## Other notes

There may also be issues with permissions/UAC and symlinks. See this [comment](https://github.com/roots/trellis/issues/8#issuecomment-43346116).