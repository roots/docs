---
description: A command-line interface (CLI) to manage Trellis projects via the trellis command.
---

trellis-cli includes the following useful command-line enhancements to the Trellis experience:
* Smart autocompletion (based on your defined environments and sites)
* Automatic Virtualenv integration for easier dependency management
* Easy DigitalOcean droplet creation
* Better Ansible Vault support for encrypting files

# Installation
## Quick Installation (macOS and Linux via Homebrew)

```bash
brew install roots/tap/trellis-cli
```

## Script Installation
We also offer a quick script version:

### You might need sudo before bash
```bash
curl -sL https://roots.io/trellis/cli/get | bash
```

### Turns on debug logging
```bash
curl -sL https://roots.io/trellis/cli/get | bash -s -- -d
```

### Sets bindir or installation directory, Defaults to '/usr/local/bin'
```bash
curl -sL https://roots.io/trellis/cli/get | bash -s -- -b /path/to/my/bin
```

# Usage

Run `trellis` for the complete usage and help.

Supported commands so far:

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
| `new` | Creates a new Trellis project |
| `provision` | Provisions the specified environment |
| `rollback` | Rollsback the last deploy of the site on the specified environment |
| `ssh` | Connects to host via SSH |
| `up` | Starts and provisions the Vagrant environment by running `vagrant up` |
| `valet` | Commands for Laravel Valet |
| `vault` | Commands for Ansible Vault |
