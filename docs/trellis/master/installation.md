---
description: Trellis installation and new project instructions.
---

# Installation

Trellis relies on a few other software tools. Make sure all dependencies have been installed before moving on:

- [Vagrant](https://www.vagrantup.com/downloads.html) >= 2.1.0, < 2.2.19
- a Vagrant [provider](https://www.vagrantup.com/docs/providers):
  - x86 (Intel based Macs, Linux, Windows PCs): [VirtualBox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
  - Apple Silicon (M1 based Macs): See our [Parallels page](./vagrant.md#Parallels)
- *Recommended* [trellis-cli](https://github.com/roots/trellis-cli)

::: tip Windows user?
[Read the Windows getting started docs](../../getting-started/windows.md) for slightly different installation instructions.
:::

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
