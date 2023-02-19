---
date_modified: 2023-02-19 12:16
date_published: 2023-02-19 12:16
description: How to configure Valet, a local development tool, for a Bedrock-based WordPress site.
title: Bedrock with Valet
authors:
  - ben
---

# Bedrock with Valet

[Laravel Valet](https://laravel.com/docs/10.x/valet) is a local development environment. In this guide you will learn how to setup a Bedrock-based WordPress site with Valet.

Valet supports Bedrock out of the box, along with traditional WordPress installations, Laravel apps, Drupal sites, and more. Since Valet is very lightweight, it is a great local development setup for folks that are working on several WordPress sites at any given time.

See the [Valet installation docs](https://laravel.com/docs/10.x/valet#installation) for information on how to install Valet. You will also want to install the Valet WP-CLI command:

```shell
$ wp package install aaemnnosttv/wp-cli-valet-command:@stable
```

## Setting up a Bedrock site

To create a new Bedrock site for Valet, navigate to Valet sites directory and use the `wp valet` command:

```shell
cd ~/Sites/valet
wp valet new bedrock --project=bedrock
```

You should now be able to access your new site at `https://bedrock.test`.

If you hit a 404, make sure that you have ran `valet park` from your Valet sites directory first.

Thank you to [Evan Mattson](https://discourse.roots.io/u/aaemnnosttv) for contributing Bedrock's driver to Valet, and for creating the [Valet WP-CLI command](https://github.com/aaemnnosttv/wp-cli-valet-command).
