# Local Development

Bedrock can be used with most local development setups. Here's a list of some recommended setups and extensions that can be used to use Bedrock locally:

- [Trellis](https://roots.io/trellis/) is our WordPress LEMP stack that supports Bedrock and deployment out of the box
- [Laravel Valet](https://roots.io/guides/wordpress-local-development-on-os-x-with-valet-and-bedrock/) with [wp-cli-valet-command](https://github.com/aaemnnosttv/wp-cli-valet-command) can be used to spin up a Bedrock site in seconds:
    ```sh
    $ wp package install aaemnnosttv/wp-cli-valet-command:^1.2
    $ wp valet new my-project --project=bedrock
    ```
- [Lando](https://docs.devwithlando.io/) is a Docker based local environment that supports Bedrock (see [Dockerize Bedrock with Lando](https://roots.io/guides/dockerize-local-bedrock-and-sage-development-with-lando/))
- [Local Bedrock](https://github.com/artifex404/local-bedrock) is a Bedrock site boilerplate for Local by Flywheel
- [WP-CLI's server command](https://developer.wordpress.org/cli/commands/server/) which uses `php -S` can be used with Bedrock (the `docroot` for the server is set in Bedrock's [`wp-cli.yml`](https://github.com/roots/bedrock/blob/master/wp-cli.yml))

MAMP, XAMPP, and others setups work with Bedrock once the [virtual host is configured](https://roots.io/bedrock/docs/bedrock-server-configuration/).

## Additional resources

- [Local Bedrock Development with Local by Flywheel](https://roots.io/guides/local-bedrock-development-with-local-by-flywheel/)
- [Local WordPress Development with Docker and Docker Compose](https://urre.me/writings/docker-for-local-wordpress-development/)
