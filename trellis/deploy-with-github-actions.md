---
date_modified: 2023-04-05 11:00
date_published: 2023-04-05 11:00
description: Deploy Trellis WordPress sites with GitHub Actions using setup-trellis-cli.
title: Deploying Trellis with GitHub Actions
authors:
  - ben
  - swalkinshaw
---

# Deploying Trellis WordPress Sites with GitHub Actions

The [`roots/setup-trellis-cli` GitHub Action](https://github.com/roots/setup-trellis-cli) can be used for setting up continuous deploys for Trellis based WordPress sites.

::: warning
This guide requires that you already have a repo on GitHub with your WordPress site along with the `trellis` directory committed to it
:::

## Setup the GitHub action

### Add the Ansible Vault password

Add a GitHub secret for `ANSIBLE_VAULT_PASSWORD` that contains the value of your `.vault_pass` file. Either manually add it at **Settings > Secrets and variables > Actions**, or use the GitHub CLI to automatically add it:

```bash
$ gh secret set ANSIBLE_VAULT_PASSWORD -b $(cat trellis/.vault_pass)
```

### Generate a SSH key

The GitHub Action runner needs to SSH into your remote Trellis server. The easiest way to get setup is by using Trellis CLI:

```shell
$ trellis key generate
```

After running this command you'll have:

* A new file in `trellis/public_keys` — make sure to commit this addition
* A deploy key added to your repo automatically (**Settings > Deploy keys**)
* Two new repository secrets added to your repo automatically: `TRELLIS_DEPLOY_SSH_KNOWN_HOSTS` and `TRELLIS_DEPLOY_SSH_PRIVATE_KEY`

Further information can be found on the [`roots/setup-trellis-cli` README](https://github.com/roots/setup-trellis-cli#ssh-known-hosts).

## Add a workflow for deploying 

The setup-trellis-cli repo contains some example workflows including:

* [Basic deploy](https://github.com/roots/setup-trellis-cli/blob/main/examples/basic.yml)
* [Deploy with a Sage-based theme](https://github.com/roots/setup-trellis-cli/blob/main/examples/sage.yml)

These examples are configured to deploy a Trellis site to the production environment when the `main` branch is pushed to. Copy the relevant example to your repo at `.github/workflows/deploy.yml`.

If you site uses a Sage-based theme, make sure to modify the `cache-dependency-path` to point to the `yarn.lock` file in your theme directory.
