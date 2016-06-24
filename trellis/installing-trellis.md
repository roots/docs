---
ID: 7761
post_title: Installing Trellis
author: Ben Word
post_date: 2015-10-15 12:20:35
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/installing-trellis/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
## Requirements

Make sure all dependencies have been installed before moving on:

* [Ansible](http://docs.ansible.com/ansible/intro_installation.html#latest-releases-via-pip) 2.0.2.0
* [Virtualbox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
* [Vagrant](http://www.vagrantup.com/downloads.html) <= 1.8.1
* [vagrant-bindfs](https://github.com/gael-ian/vagrant-bindfs#installation) >= 0.3.1 (Windows users may skip this if not using vagrant-winnfsd for folder sync)
* [vagrant-hostmanager](https://github.com/smdahlen/vagrant-hostmanager#installation)

## Installation

The recommended directory structure for a Trellis project looks like:

```shell
example.com/      # → Root folder for the project
├── trellis/      # → Your clone of this repository
└── site/         # → A Bedrock-based WordPress site
    └── web/
        ├── app/  # → WordPress content directory (themes, plugins, etc.)
        └── wp/   # → WordPress core (don't touch!)
```

See a complete working example in the [roots-example-project.com repo](https://github.com/roots/roots-example-project.com).

1. Create a new project directory:
```plain
$ mkdir example.com && cd example.com
```
2. Clone Trellis:
```plain
$ git clone --depth=1 git@github.com:roots/trellis.git && rm -rf trellis/.git
```
3. Clone Bedrock:
```plain
$ git clone --depth=1 git@github.com:roots/bedrock.git site && rm -rf site/.git
```
4. Install the Ansible Galaxy roles:
```plain
$ cd trellis && ansible-galaxy install -r requirements.yml
```

Windows user? [Read the Windows docs](https://roots.io/trellis/docs/windows/) for slightly different installation instructions. VirtualBox is known to have poor performance in Windows — use VMware or [see some possible solutions](https://discourse.roots.io/t/virtualbox-performance-in-windows/3932).
