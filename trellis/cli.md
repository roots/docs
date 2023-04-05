---
date_modified: 2023-04-05 07:42
date_published: 2023-04-05 07:42
description: A command-line interface (CLI) to manage Trellis projects via the `trellis` command.
title: Trellis CLI
authors:
  - swalkinshaw
---

# Trellis CLI

trellis-cli is a command-line interface (CLI) to manage Trellis projects via the `trellis` command. The CLI provides a more consistent and integrated experience and includes:

* Automatic Python Virtualenv integration for easier dependency management
* Smart autocompletion (based on your defined environments and sites)
* One-command DigitalOcean droplet creation
* Better Ansible Vault support for encrypting files
* (New) Built-in virtual machine support for development environments

and much more.

## Installation

### Quick Install (macOS, Linux, WSL via Homebrew)

```shell
brew install roots/tap/trellis-cli
```

### Script

We also offer a quick script version:

```shell
# You might need sudo before bash
curl -sL https://roots.io/trellis/cli/get | bash

# Sets bindir or installation directory, Defaults to '/usr/local/bin'
curl -sL https://roots.io/trellis/cli/get | bash -s -- -b /path/to/my/bin
```

### Manual Install

trellis-cli provides binary releases for a variety of OSes. These binary versions can be manually downloaded and installed.

1. Download the [latest release](https://github.com/roots/trellis-cli/releases/latest) or any [specific version](https://github.com/roots/trellis-cli/releases)
2. Unpack it (eg: `tar -zxvf trellis_1.2.1_Linux_x86_64.tar.gz`)
3. Find the `trellis` binary in the unpacked directory, and move it to its desired destination (eg: `mv trellis_1.2.0_Darwin_x86_64/trellis /usr/local/bin/trellis`)
4. Make sure the above path is in your `$PATH`

### Dev/unstable install (macOS, Linux, WSL via Homebrew)

```shell
# Cleanup previous versions (if installed)
brew uninstall roots/tap/trellis-cli

# Install
brew install --HEAD roots/tap/trellis-cli-dev

# Upgrade
brew upgrade --fetch-HEAD roots/tap/trellis-cli-dev
```

### Windows Install
trellis-cli does offer a native Windows exe but we [recommend you use
WSL](https://docs.roots.io/trellis/master/installation/#local-development-requirements) for Trellis. The above install methods will work for WSL as well.

If you do want to use the native Windows exe, you'll need to do the following
setup after downloading the Windows build:

1. Open system properties
2. Open environment variables
3. Under system variables add new variable, `TRELLIS`, pointing to the location of the `trellis.exe` file, like `C:\trellis_1.0.0`
4. Edit path from system variables and add new named `%TRELLIS%`
5. Save the changes

## Usage

Run `trellis` for the complete usage and help.

For subcommand documentation, run `trellis <command> -h`.

### Commands

| Command | Description |
| --- | --- |
| `alias` | Generate WP CLI aliases for remote environments |
| `check` | Checks if Trellis requirements are met |
| `db` | Commands for database management |
| `deploy` | Deploys a site to the specified environment |
| `dotenv` | Template .env files to local system |
| `down` | Stops the Vagrant machine by running `vagrant halt`|
| `droplet` | Commands for DigitalOcean Droplets |
| `exec` | Exec runs a command in the Trellis virtualenv |
| `galaxy` | Commands for Ansible Galaxy |
| `info` | Displays information about this Trellis project |
| `init` | Initializes an existing Trellis project |
| `key` | Commands for managing SSH keys |
| `logs` | Tails the Nginx log files |
| `new` | Creates a new Trellis project |
| `open` | Opens user-defined URLs (and more) which can act as shortcuts/bookmarks specific to your Trellis projects |
| `provision` | Provisions the specified environment |
| `rollback` | Rollsback the last deploy of the site on the specified environment |
| `ssh` | Connects to host via SSH |
| `up` | Starts and provisions the Vagrant environment by running `vagrant up` |
| `valet` | Commands for Laravel Valet |
| `vault` | Commands for Ansible Vault |
| `vm` | Commands for managing development virtual machines |
| `xdebug-tunnel` | Commands for managing Xdebug tunnels |

## Configuration
There are three ways to set configuration settings for trellis-cli and they are
loaded in this order of precedence:

1. global config
2. project config
3. env variables

The global CLI config (defaults to `$HOME/.config/trellis/cli.yml`)
and will be loaded first (if it exists).

Next, if a project is detected, the project CLI config will be loaded if it
exists at `.trellis/cli.yml`.

Finally, env variables prefixed with `TRELLIS_` will be used as
overrides if they match a supported configuration setting. The prefix will be
stripped and the rest is lowercased to determine the setting key.

Note: only string, numeric, and boolean values are supported when using environment
variables.

Current supported settings:

| Setting | Description | Type | Default |
| --- | --- | -- | -- |
| `allow_development_deploys` | Whether to allows deploy to the `development` env | boolean | false |
| `ask_vault_pass` | Set Ansible to always ask for the vault pass | boolean | false |
| `check_for_updates` | Whether to check for new versions of trellis-cli | boolean | true |
| `database_app` | Database app to use in `db open` (Options: `tableplus`, `sequel-ace`)| string | none |
| `load_plugins` | Load external CLI plugins | boolean | true |
| `open` | List of name -> URL shortcuts | map[string]string | none |
| `virtualenv_integration` | Enable automated virtualenv integration | boolean | true |
| `vm` | Options for dev virtual machines | Object | see below |

### `vm`
| Setting | Description | Type | Default |
| --- | --- | -- | -- |
| `manager` | VM manager (Options: `auto` (depends on OS), `lima`)| string | "auto" |
| `ubuntu` | Ubuntu OS version (Options: `18.04`, `20.04`, `22.04`)| string | `22.04` |
| `hosts_resolver` | VM hosts resolver (Options: `hosts_file`)| string | `hosts_file` |
| `images` | Custom OS image | object | Set based on `ubuntu` version |

#### `images`
| Setting | Description | Type | Default |
| --- | --- | -- | -- |
| `location` | URL of Ubuntu image | string | none |
| `arch` | Architecture of image (eg: `x86_64`, `aarch64`) | string | none |

Example config:

```yaml
ask_vault_pass: false
check_for_updates: true
load_plugins: true
open:
  site: "https://mysite.com"
  admin: "https://mysite.com/wp/wp-admin"
virtualenv_integration: true
vm:
  manager: auto
  ubuntu: 22.04
```

Example env var usage:
```shell
TRELLIS_ASK_VAULT_PASS=true trellis provision production
```
