---
description: Trellis installation and new project instructions.
---

# Installation

[[toc]]

## What is Trellis?

Trellis is a [WordPress LEMP stack](https://roots.io/trellis/).

### Why use Trellis?

You’ll get a complete WordPress server running all the software you need configured according to the best practices. All of this is powered by Ansible for configuration management. You don’t have to use brittle and confusing Bash scripts or worry about commands you found to copy and paste.

- Local development environment with Vagrant
- High-performance production servers
- Zero-downtime deploys for your [Bedrock](https://roots.io/bedrock/)-based WordPress sites
- [trellis-cli](https://github.com/roots/trellis-cli) for easier management

## Requirements

Trellis relies on a few other software tools. Make sure all dependencies have been installed before moving on:

- [Vagrant](https://www.vagrantup.com/downloads.html) >= 2.1.0, < 2.2.19
- a Vagrant [provider](https://www.vagrantup.com/docs/providers):
  - x86 (Intel based Macs, Linux, Windows PCs): [VirtualBox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
  - Apple Silicon (M1 based Macs): See our [Parallels page](vagrant.md#parallels-apple-silicon-m1-macs)
- [trellis-cli](https://github.com/roots/trellis-cli)

## Getting started

:::: tabs

::: tab "Getting started on macOS"
#### NFS

For macOS Catalina or later, you will have to grant full disk access to `/sbin/nfsd`.

1. Navigate to **System Preferences** → **Security & Privacy** → **Privacy** → **Full Disk Access**
2. Click `+`
3. Press <kbd>Command</kbd> <kbd>Shift</kbd> <kbd>G</kbd> at the same time.
4. Enter the `/sbin` directory.
5. Double click the `nfsd` file.
:::

::: tab "Getting started on Windows"
**All commands must be run from WSL ([Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10)).**
:::
::::

## Create a project

To create a new project, first pick a descriptive name (and use it place of the default `example.com`).
We recommend the domain of the site for convenience.

<CodeSwitcher :languages="{cli:'Trellis CLI',manual:'Manual'}">
<template v-slot:cli>

```bash
$ trellis new example.com
```

</template>
<template v-slot:manual>

1. Create a new project directory:
```bash
$ mkdir example.com && cd example.com
```
2. Install Trellis:
```bash
$ git clone --depth=1 git@github.com:roots/trellis.git && rm -rf trellis/.git
```
3. Install Bedrock into the `site` directory:
```bash
$ composer create-project roots/bedrock site
```

</template>
</CodeSwitcher>

After you've created a project, the folder structure for a Trellis project will look like this:

```bash
example.com/      # → Root folder for the project
├── trellis/      # → Your clone of this repository
└── site/         # → A Bedrock-based WordPress site
    └── web/
        ├── app/  # → WordPress content directory (themes, plugins, etc.)
        └── wp/   # → WordPress core (don't touch!)
```

See a complete working example in the [roots-example-project.com repo](https://github.com/roots/roots-example-project.com).
