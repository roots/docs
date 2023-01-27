---
description: Bedrock can be used with most local development setups. Some setups that support Bedrock out of the box are Trellis and Laravel Valet.
authors:
  - ben
  - Log1x
  - swalkinshaw
---

# Local Development

Bedrock can be used with most local development setups. Here's a list of some recommended setups and extensions that can be used to use Bedrock locally:

- [Trellis](https://roots.io/trellis/) is our WordPress LEMP stack that supports Bedrock and deployment out of the box
- Laravel Valet with [wp-cli-valet-command](https://github.com/aaemnnosttv/wp-cli-valet-command) can be used to spin up a Bedrock site in seconds:
    ```bash
    $ wp package install aaemnnosttv/wp-cli-valet-command:^1.2
    $ wp valet new my-project --project=bedrock
    ```
- [Docksal](https://docksal.io/) is a Docker based local environment that supports Bedrock (see [Dockerize Bedrock with Docksal](https://github.com/docksal/boilerplate-bedrock)
- [Lando](https://docs.devwithlando.io/) is a Docker based local environment that supports Bedrock
- [DDEV](https://ddev.readthedocs.io/) is a Docker based local environment that supports Bedrock (see [Composer Setup Example Using roots/bedrock](https://ddev.readthedocs.io/en/stable/users/cli-usage/#wordpress-quickstart))
- [Local Bedrock](https://github.com/artifex404/local-bedrock) is a Bedrock site boilerplate for Local by Flywheel
- [WP-CLI's server command](https://developer.wordpress.org/cli/commands/server/) which uses `php -S` can be used with Bedrock (the `docroot` for the server is set in Bedrock's [`wp-cli.yml`](https://github.com/roots/bedrock/blob/master/wp-cli.yml))

MAMP, XAMPP, and others setups work with Bedrock once the [virtual host is configured](configuration.md).
