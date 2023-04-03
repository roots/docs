---
date_modified: 2023-03-28 07:00
date_published: 2023-03-28 07:00
title: Local Development
authors:
  - ben
---

# Local Development

Radicle comes with configuration for two local development setups out of the box:

* [Lando](https://lando.dev/)
* [Trellis](https://roots.io/trellis/)

Neither of these are a requirement, and any local development tool can be used with Radicle as long as you set your document root to the `public` directory. You will also need to:

1. Run `yarn && yarn build`
1. Run `composer install`
1. Copy `.env.example` to `.env` and update the [environment variables](https://roots.io/bedrock/docs/installation/#getting-started)

## Lando

To use Lando with Radicle:

1. In `bud.config.js`: Replace `http://radicle.test` with `https://radicle.lndo.site`
1. Run `yarn && yarn build`
1. Run `lando start`
1. Visit `https://radicle.lndo.site/`

You can run `lando login` to generate a passwordless wp-admin login URL (WordPress must first be installed).

## Trellis

Run `php .radicle-setup/trellis.php` to grab the latest version of Trellis and apply the necessary modifications for Radicle. After you've ran this script,
navigate to the Trellis directory to init and start your project:

```shell
$ php .radicle-setup/trellis.php
$ cd trellis/
$ trellis init
$ trellis up
```

Open `bud.config.js` and replace `http://radicle.test` with your local development URL. For example, if you used `example.com` as the domain name during the setup then your URL would be `http://example.test`. If you are unsure what this URL is, open `trellis/group_vars/development/wordpress_sites.yml` and use the canonical URL.

Then you will want to run `yarn && yarn build` before visiting your site at `http://example.test/`.

You can remove the `.radicle-setup/` directory after you've ran the Trellis script, or if you aren't planning to use Trellis.

Make sure to commit the changes to the repo as there will now be a `trellis/` folder.
