---
ID: 7763
post_title: Local Development Setup
author:
  - Ben Word
post_date:
  - 2015-10-15 12:24:41
post_excerpt:
  - ""
layout: doc
permalink:
  - /trellis/docs/local-development-setup/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
Configure the sites on your Vagrant development VM by editing `group_vars/development/wordpress_sites.yml` and `group_vars/development/vault`.

`wordpress_sites` is the top-level dictionary used to define the WordPress sites, databases, Nginx vhosts, etc that will be created. Each site's variables are nested under a site "key" (e.g., `example.com`). This key is just a descriptive name and serves as the default value for some variables. See our [example project](https://github.com/roots/roots-example-project.com/blob/master/trellis/group_vars/development/wordpress_sites.yml) for a complete working example.

* `site_hosts` - array of hosts that Nginx will listen on (required, include main domain at least)
* `www_redirect` - whether to redirect `www/non-www` counterparts of `site_hosts` (default: `true`)
* `local_path` - path targeting Bedrock-based site directory (required for development)
* `ssl` - enable SSL and set paths
  * `enabled` - `true` or `false` (required, set to `false`. Set to `true` without the `key` and `cert` options [to generate a *self-signed* certificate](https://roots.io/trellis/docs/ssl/) )
  * `key` - local relative path to private key
  * `cert` - local relative path to certificate
* `site_install` - whether to install WordPress or not (*development* only, required)
* `site_title` - WP site title (*development* only, default: project name)
* `db_create` - whether to auto create a database or not (default: `true`)
* `db_import` - Path to local `sql` dump file which will be imported (optional)
* `system_cron` - Disable WP cron and use system's (default: `true`)
* `admin_user` - WP admin user name (*development* only, required)
* `admin_email` - WP admin email address (*development* only, required)
* `admin_password` - WP admin user password (*development* only, required, in `vault.yml`)
* `multisite` - hash of multisite options. See the [Multisite docs](https://roots.io/trellis/docs/multisite/).
  * `enabled` - Multisite enabled flag (required, set to `false`)
  * `subdomains` - subdomains option
  * `base_path` - base path/current site path
* `cache` - hash of cache options
  * `enabled` - Cache enabled flag (required, set to `false`)
  * `duration` - Duration of the cache (default: `30s`)
* `env` - environment variables
  * `wp_home` - `WP_HOME` constant (required)
  * `wp_siteurl` - `WP_SITEURL` constant (required)
  * `wp_env` - environment (required, matches group name: `development`, `staging`, `production`)
  * `db_name` - database name (required)
  * `db_user` - database username (required)
  * `db_password` - database password (required, in `vault.yml`)
  * `db_host` - database hostname (default: `localhost`)
  * `domain_current_site` (required if multisite.enabled is `true`)

After your WordPress sites have been configured, run `vagrant up`.
