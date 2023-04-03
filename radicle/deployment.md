---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Deploying Radicle
authors:
  - ben
---

# Deployment

You will need to make sure that your deployment process handles the following:

1. Run `yarn && yarn build` from the project root
1. Copy contents of `public/dist/` folder to your server (produced from `yarn build`)
1. Run `wp acorn optimize`
1. Run `wp acorn icons:cache` (if using Blade Icons)
1. Run `wp login install --activate` (if wanting to use the WP-CLI login command)

## Deploying with Trellis

If you choose to use Trellis for handling your deployments, there are two options:

1. Use GitHub Actions with [setup-trellis-cli](https://github.com/roots/setup-trellis-cli) — uncomment the deploy job from `.github/workflows/deploy.yml`. It is configured to deploy to the production environment on every push to the `main` branch
1. Run `trellis deploy <environment>`
