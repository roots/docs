---
description: Instructions for installing Acorn.
---

# Installation

[[toc]]

**[Bedrock](https://github.com/roots/bedrock)** is the recommended way to manage your WordPress installation, themes, and plugins, and as such it's how we recommend you install Acorn. You can install Acorn as an mu-plugin or a "normal" plugin, but we don't support this. If it's a workflow you need, or have experience with, we encourage you to [submit a PR](https://github.com/roots/docs/compare) to improve these docs. 

## Server Requirements

Acorn's server requirements are minimal, and mostly come from WordPress and [Laravel 8's requirements](https://laravel.com/docs/8.x/deployment#server-requirements). Most WordPress hosts will meet these requirements, but use the following list if you're unsure.

- PHP >=7.3 or >=8.0
- WordPress >= 5.4
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP Extension
- JSON PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

## Installing Acorn

To install Acorn in a Bedrock environment, navigate to your Bedrock directory and run the following command:

```sh
$ composer require roots/acorn
```

We recommend adding Acorn's `postAutoloadDump` function to Composer's `post-autoload-dump` event:

```json
"post-autoload-dump": [
  "Roots\\Acorn\\ComposerScripts::postAutoloadDump"
]
```

### Alternatives

Although not officially supported, the following options _should_ work. Please file a [bug report](https://github.com/roots/docs/issues/new?assignees=&labels=&template=bug_report.md) for future consideration if you run into issues.

- **Install as mu-plugin.**
  Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract to your `mu-plugins` directory. Make sure you have a mechanism in place to autoload it, such as [`bedrock-autoloader`](https://github.com/roots/bedrock-autoloader).
- **Install as a normal plugin.** 
  Download the [most recent version of Acorn](https://github.com/roots/acorn/releases/latest) and extract to your `plugins` directory. Make sure to activate the plugin, or it won't work.

