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
publish_to_discourse:
  - "0"
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

**Remote servers (staging/production).** To run the `ansible-playbook` commands to provision remote servers, you'll need to SSH in to the VM, `cd` to the directory with your trellis files, then run the [setup](https://github.com/roots/trellis#remote-server-setup-stagingproduction) and [deployment](https://github.com/roots/trellis#deploying-to-remote-servers) commands.

## Other notes
There may also be issues with permissions/UAC and symlinks. See this [comment](https://github.com/roots/trellis/issues/8#issuecomment-43346116).