---
ID: 31979
post_title: Bedrock Local Development
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/bedrock-local-development/
published: true
post_date: 2018-12-28 13:54:22
---
Bedrock can be used with most local development setups. Here's a list of some recommended setups and extensions that can be used to use Bedrock locally:

* [Trellis](https://roots.io/trellis/) is our WordPress LEMP stack that supports Bedrock and deployment out of the box
* [Laravel Valet](https://roots.io/guides/wordpress-local-development-on-os-x-with-valet-and-bedrock/) with [wp-cli-valet-command](https://github.com/aaemnnosttv/wp-cli-valet-command) can be used to spin up a Bedrock site in seconds:
    ```bash
    $ wp package install aaemnnosttv/wp-cli-valet-command:^1.2
    $ wp valet new my-project --project=bedrock
    ```
* [Lando](https://docs.devwithlando.io/) is a Docker based local environment that supports Bedrock (see [Dockerize Bedrock with Lando](https://roots.io/guides/dockerize-local-bedrock-and-sage-development-with-lando/))
* [Local Bedrock](https://github.com/artifex404/local-bedrock) is a Bedrock site boilerplate for Local by Flywheel
* [WP-CLI's server command](https://developer.wordpress.org/cli/commands/server/) which uses `php -S` can be used with Bedrock by passing the document root:
    ```bash
    $ wp server --docroot=web
    ```

MAMP, XAMPP, and others setups work with Bedrock once the [virtual host is configured](https://roots.io/bedrock/docs/bedrock-server-configuration/).

## Additional resources

* [Local WordPress Development with Docker and Docker Compose](https://urre.me/writings/docker-for-local-wordpress-development/)