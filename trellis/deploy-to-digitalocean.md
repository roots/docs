---
date_modified: 2023-01-27 13:17
date_published: 2019-01-07 10:05
description: Provision and deploy to DigitalOcean servers with Trellis.
title: Deploying Trellis to DigitalOcean
authors:
  - ben
---

# Deploying Trellis to DigitalOcean

[DigitalOcean](https://roots.io/r/digitalocean) is a cloud infrastructure provider that offers virtual servers called droplets starting at $5/month that can handle most normal WordPress sites when provisioned with Trellis.

To provision a server, Trellis requires a server running a bare/stock version of the latest Ubuntu LTS release.

::: tip
ℹ️ If you [signup for DigitalOcean](https://roots.io/r/digitalocean) through the Roots referral link you will receive a free $100 in credit for 2 months, and you help cover the costs of our hosting.
::: 

## Creating a new DigitalOcean droplet

Trellis CLI comes a `trellis droplet create` command to automatically create a DigtalOcean droplet for a specified environment:

```shell
$ trellis droplet create production
```

::: warning
This command requires a [DigitalOcean personal access token](https://cloud.digitalocean.com/account/api/tokens/new).
:::

If the `DIGITALOCEAN_ACCESS_TOKEN` environment variable is not set, the command will prompt for one.

### Quick start (region and size will be prompted)

```shell
$ trellis droplet create production
```

![Screenshot of trellis droplet create example](https://cdn.roots.io/app/uploads/deploy-to-digitalocean-trellis-droplet-create.png)

The remote server playbook will run and provision your droplet with PHP, Nginx, and everything else included in Trellis.

### Additional options

The command help file can be accessed by passing the `--help` flag:

```shell
$ trellis droplet create --help
```

<details>
<summary>trellis droplet create --help</summary>

```
Usage: trellis droplet create [options] ENVIRONMENT

Creates a droplet (server) on DigitalOcean for the environment specified.

Only remote servers (for staging and production) are currently supported.
Development should be managed separately through Vagrant.

This command requires a DigitalOcean personal access token.
Link: https://cloud.digitalocean.com/account/api/tokens/new

If the DIGITALOCEAN_ACCESS_TOKEN environment variable is not set, the command
will prompt for one.

Create a production server (region and size will be prompted):

  $ trellis droplet create production

Create a 1gb server in the nyc3 region:

  $ trellis droplet create --region=nyc3 --size=s-1vcpu-1gb production

Create a 1gb server with a specific Ubuntu image:

  $ trellis droplet create --region=nyc3 --image=ubuntu-18-04-x64 --size=s-1vcpu-1gb production

Create a server but skip provisioning:

  $ trellis droplet create --skip-provision production

Arguments:
  ENVIRONMENT Name of environment (ie: production)

Options:
      --region          Region to create the server in
      --image           (default: ubuntu-20-04-x64) Server image (ie: Linux distribution)
      --size            Server size/type
      --skip-provision  Skip provision after server is created
      --ssh-key         (default: ~/.ssh/id_rsa.pub) path to SSH public key to be added on the server
  -h, --help            show this help
```

</details>

## Changes made after running the command

After creating a new droplet, your local project will have a modified hosts file for the environment that you provisioned:

```diff
[production]
-your_server_hostname
+159.89.191.207

[web]
-your_server_hostname
+159.89.191.207
```

## Deploying to DigitalOcean droplet

Once your server is provisioned you’ll want to perform the first deploy. If you try to visit your site before deploying you’ll see a server 500 error.

```shell
$ trellis deploy production
```

After the first deploy is done, you can now either install WordPress by visiting the site or even import an existing database.

## $5 droplet performance

If you enable the [FastCGI caching in Trellis](/trellis/docs/fastcgi-caching/) then you’ll be able to squeeze quite a bit of performance out of a $5 DigitalOcean droplet.

<p><iframe src="https://share.loader.io/reports/19a5726e5f296a96c431f8609dd427cd/widget/results/6ebcd76c5963361fc0acf413364709e1" frameborder="0" style="width: 100%; height: 300px;"></iframe></p>
<p><a href="http://loader.io/reports/19a5726e5f296a96c431f8609dd427cd/results/6ebcd76c5963361fc0acf413364709e1">View on loader.io</a></p>
