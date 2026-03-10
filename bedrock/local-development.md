---
date_modified: 2026-03-08 16:07
date_published: 2018-12-28 13:54
description: Bedrock supports various local development tools including Trellis, Laravel Valet, Local, DDEV, Lando, and DevKinsta for flexible WordPress development.
title: Local WordPress Development with Bedrock
authors:
  - ben
  - Log1x
  - swalkinshaw
---

# Local WordPress Development with Bedrock

Bedrock can be used with most local development setups. [Trellis](https://roots.io/trellis/) is our WordPress LEMP stack that supports Bedrock out of the box. We also have guides for using Bedrock with some popular setups:

- [Bedrock with DDEV](/bedrock/docs/bedrock-with-ddev/)
- [Bedrock with DevKinsta](/bedrock/docs/bedrock-with-devkinsta/)
- [Bedrock with Lando](/bedrock/docs/bedrock-with-lando/)
- [Bedrock with Local](/bedrock/docs/bedrock-with-local/)
- [Bedrock with Valet](/bedrock/docs/bedrock-with-valet/)

For test setup and commands, see [Testing Bedrock with Pest](/bedrock/docs/testing/).

Additionally, [WP-CLI's server command](https://developer.wordpress.org/cli/commands/server/) can be used with Bedrock (the `docroot` for the server is set in Bedrock's [`wp-cli.yml`](https://github.com/roots/bedrock/blob/master/wp-cli.yml))

MAMP, XAMPP, and others setups work with Bedrock once the [virtual host is configured](configuration.md).
