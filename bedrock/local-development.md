---
date_modified: 2023-02-19 12:16
date_published: 2018-12-28 13:54
description: Bedrock can be used with most local development setups. Some setups that support Bedrock out of the box are Trellis and Laravel Valet.
title: Local Development
authors:
  - ben
  - Log1x
  - swalkinshaw
---

# Local Development

Bedrock can be used with most local development setups. [Trellis](https://roots.io/trellis/) is our WordPress LEMP stack that supports Bedrock out of the box. We also have guides for using Bedrock with some popular setups:

- [Bedrock with DDEV](/bedrock/docs/bedrock-with-ddev/)
- [Bedrock with DevKinsta](/bedrock/docs/bedrock-with-devkinsta/)
- [Bedrock with Lando](/bedrock/docs/bedrock-with-lando/)
- [Bedrock with Local](/bedrock/docs/bedrock-with-local/)
- [Bedrock with Valet](/bedrock/docs/bedrock-with-valet/)

Additionally, [WP-CLI's server command](https://developer.wordpress.org/cli/commands/server/) can be used with Bedrock (the `docroot` for the server is set in Bedrock's [`wp-cli.yml`](https://github.com/roots/bedrock/blob/master/wp-cli.yml))

MAMP, XAMPP, and others setups work with Bedrock once the [virtual host is configured](configuration.md).
