---
ID: 7761
post_title: Installing Trellis
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/installing-trellis/
published: true
post_date: 2015-10-15 12:20:35
---
## Install requirements

Trellis relies on a few other software tools. Make sure all dependencies have been installed before moving on:

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
* [Vagrant](https://www.vagrantup.com/downloads.html) >= 1.8.5

<div class="well well-trellis-alt module">

This is the minimum requirements for a development server. Vagrant automatically takes care of the Ansible dependency for us by default.

To speed up future dev VM provisioning, or for remote servers, you'll need to install Ansible locally on your host machine.

See [Requirements](https://roots.io/trellis/docs/remote-server-setup/#requirements) under Remote Server Setup.
</div>

## Create a project

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

Pick a descriptive name for your project and use it instead of the default `example.com`. We recommend the domain of the site for convenience.

1. Create a new project directory:
```plain
$ mkdir example.com && cd example.com
```
2. Clone Trellis:
```plain
$ git clone --depth=1 https://github.com/roots/trellis && rm -rf trellis/.git
```
3. Clone Bedrock:
```plain
$ git clone --depth=1 https://github.com/roots/bedrock site && rm -rf site/.git
```

Windows user? [Read the Windows docs](https://roots.io/trellis/docs/windows/) for slightly different installation instructions.
