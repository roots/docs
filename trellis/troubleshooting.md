---
ID: 6148
post_title: Troubleshooting
author: Ben Word
post_date: 2015-09-03 17:43:33
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/troubleshooting/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
## Unresponsive machines or 404s

Halt all VMs and remove VM-related entries from your `/etc/hosts` file, particularly entries similar to the example below. You may want to backup the hosts file before editing.

```
192.168.50.5  example.dev  # VAGRANT: 22c9...
```

Then `vagrant up` any VMs you need running and double-check that appropriate entries appear in your hosts file.

A tidy hosts file would reduce the likelihood of 404s, although it's not a guarantee.

## There was an error while executing `VBoxManage`, a CLI used by Vagrant

Error message looks something like:

```
Command: ["modifyvm", "5a403eac-5619-4020-ba14-b72fd8d5b530", "--natpf1", "delete", "ssh"]

Stderr: VBoxManage: error: An unexpected process (PID=0x00003FAA) has tried to lock the machine 'trellis-playbooks', while only the process started by LaunchVMProcess (PID=0x00003C31) is allowed
VBoxManage: error: Details: code E_ACCESSDENIED (0x80070005), component Machine, interface IMachine, callee nsISupports
VBoxManage: error: Context: "LockMachine(a->session, LockType_Write)" at line 471 of file VBoxManageModifyVM.cpp
```

The solution is to open up your Activity Monitor and quit any `vagrant` or `ruby` processes.