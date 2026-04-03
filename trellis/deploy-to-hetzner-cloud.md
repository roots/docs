---
date_modified: 2026-04-03 10:00
date_published: 2026-04-03 10:00
description: Deploy Trellis WordPress sites to Hetzner Cloud servers. Create servers, configure settings, and automate WordPress deployment to Hetzner Cloud.
title: Deploying Trellis to Hetzner Cloud
authors:
  - ben
---

# Deploying Trellis to Hetzner Cloud

[Hetzner Cloud](https://hetzner.cloud/?ref=V6DnI7GDHM4N) is a cloud infrastructure provider offering virtual servers with competitive pricing that can handle most normal WordPress sites when provisioned with Trellis.

::: tip
ℹ️ Sign up for [Hetzner Cloud](https://hetzner.cloud/?ref=V6DnI7GDHM4N) through the Roots referral link to receive $20 in cloud credits.
:::

## Creating a new server

Trellis CLI comes with a `trellis server create` command to automatically create and provision a server for a specified environment:

```shell
$ trellis server create --provider=hetzner production
```

::: warning
This command requires a [Hetzner API token](https://docs.hetzner.com/cloud/api/getting-started/generating-api-token/).
:::

If the `HCLOUD_TOKEN` environment variable is not set, the command will prompt for one.

To avoid passing `--provider` every time, set Hetzner as your default provider in `trellis.cli.yml`:

```yaml
server:
  provider: hetzner
```

Then you can simply run:

```shell
$ trellis server create production
```

### Quick start (region and size will be prompted)

```shell
$ trellis server create production
```

The remote server playbook will run and provision your server with PHP, Nginx, and everything else included in Trellis.

### Additional options

The command help file can be accessed by passing the `--help` flag:

```shell
$ trellis server create --help
```

## Changes made after running the command

After creating a new server, your local project will have a modified hosts file for the environment that you provisioned:

```diff
[production]
-your_server_hostname
+49.13.25.100

[web]
-your_server_hostname
+49.13.25.100
```

## Deploying

Once your server is provisioned you'll want to perform the first deploy. If you try to visit your site before deploying you'll see a server 500 error.

```shell
$ trellis deploy production
```

After the first deploy is done, you can now either install WordPress by visiting the site or even import an existing database.
