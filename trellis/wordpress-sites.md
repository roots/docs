---
date_modified: 2023-01-27 13:17
date_published: 2016-03-28 21:10
description: Everything in Trellis is built around the concept of "sites". Trellis will automatically configure everything needed to host a WordPress site.
title: WordPress Sites
authors:
  - ben
  - dalepgrant
  - fullyint
  - Log1x
  - mockey
  - MWDelaney
  - nathanielks
  - nlemoine
  - swalkinshaw
  - TangRufus
---
# WordPress Sites

Everything in Trellis is built around the concept of "sites". Each Trellis managed server (local virtual machine or remote server) can support one or more WordPress sites. Trellis will automatically configure everything needed to host a WordPress site such as databases, Nginx confs, folder directories, etc based on the site's configuration.

These sites are configured in YAML files for each environment such as `group_vars/development/wordpress_sites.yml`.

There are two components and places to configure sites:

- Basic settings in `group_vars/development/wordpress_sites.yml`
- Passwords/secrets in `group_vars/development/vault.yml`

::: tip Note
If you used Trellis CLI to create your project, the basic configuration settings
will already be set for your main site.
:::

## Site configuration

`wordpress_sites` is a top-level dictionary (object/hash) used to define all the sites you want. Here's an absolute bare-minimum site as an example for development:

```yaml
# group_vars/development/wordpress_sites.yml
wordpress_sites:
  example.com:
    site_hosts:
      - canonical: example.test
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: admin@example.test
    multisite:
      enabled: false
    ssl:
      enabled: false
    cache:
      enabled: false
```

Each site is defined by a "key" (`example.com` in this case). Trellis uses the key internally as the name of the site and as a default value in a lot of variables. We recommend naming your sites after their domain so it's descriptive.

Nested under the name/key are the site specific configuration settings. You only need to define a variable/setting if you want to overwrite the default value which can be found below.

## Passwords/secrets

When you add or edit a site in `wordpress_sites.yml`, you also need to edit `vault.yml` for the accompanying site/key. `vault.yml` simplifies the use of the Ansible Vault encryption feature for specific files. You never want to include plain-text passwords in a Git repository so we make it easier to optionally encrypt the `vault.yml` file while leaving the normal settings separate. See [Vault](vault.md) for more information on this.

```yaml
# group_vars/development/vault.yml
vault_wordpress_sites:
  example.com:
    admin_password: admin
    env:
      db_password: example_dbpassword
```

Notice the matching site keys in both `wordpress_sites` and `vault_wordpress_sites` for `example.com` which ties together these site settings.

## Options

### Common

- `site_hosts` - List of hosts that Nginx will listen on. At least one is required. Each host item must specify a `canonical` host and may optionally specify a list of corresponding `redirects` (hosts). **Remember to set up DNS for every host listed.** You cannot use just an IP address.

```yaml
# minimum required
example.com:
  site_hosts:
    - canonical: example.com

# multiple hosts and redirects are possible
example.com:
  site_hosts:
    - canonical: example.com
      redirects:
        - www.example.com
        - site.com
    - canonical: example.co.uk
      redirects:
        - www.example.co.uk
```

- `local_path` - path targeting Bedrock-based site directory (*required*)
- `current_path` - symlink to latest release (default: `current`)
- `db_create` - whether to auto create a database or not (default: `true`)
- `packagist_token` - Token to use to authenticate with Packagist.com for private Composer repositories (optional)
- `ssl` - SSL options. See the [SSL docs](ssl.md)
- `multisite` - Multisite options. See the [Multisite docs](multisite.md)
- `cache` - Nginx FastCGI cache options. See the [Cache docs](fastcgi-caching.md)
- `h5bp` - Nginx config files from [h5bp server config](https://github.com/h5bp/server-configs-nginx) to include
  - `cache_file_descriptors` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/directive-only/cache-file-descriptors.conf) (default: `not_dev`)
  - `extra_security` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/directive-only/extra-security.conf) (default: `true`)
  - `no_transform` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/directive-only/no-transform.conf) (default: `false`)
  - `x_ua_compatible` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/directive-only/x-ua-compatible.conf) (default: `true`)
  - `cache_busting` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/location/cache-busting.conf) (default: `false`)
  - `cross_domain_fonts` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/location/cross-domain-fonts.conf) (default: `true`)
  - `expires` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/location/expires.conf) (default: `false`)
  - `protect_system_files` - See [h5bp server config](https://github.com/h5bp/server-configs-nginx/blob/2.0.0/h5bp/location/protect-system-files.conf) (default: `true`)
- `env` - environment variables
  - `disable_wp_cron` - Disable WP cron and use system's (default: `true`)
  - `wp_home` - `WP_HOME` constant (default: `<protocol>://${HTTP_HOST}`)
  - `wp_siteurl` - `WP_SITEURL` constant (default: `${WP_HOME}/wp`)
  - `wp_env` - environment (default: `env` via Ansible)
  - `db_name` - database name (default: `<site name>_<env>`)
  - `db_user` - database username (default: `<site name>`)
  - `db_password` - database password (*required*, in `vault.yml`)
  - `db_host` - database hostname (default: `localhost`)
  - `db_prefix` - database table prefix (defaults to `wp_` if not set)
  - `db_user_host` - hostname or ip range used to restrict connections to database (default: `localhost`)

### Development

- `site_install` - whether to install WordPress or not (default: `true`)
- `site_title` - WP site title (default: site name)
- `admin_user` - WP admin user name (default: `admin`)
- `admin_email` - WP admin email address (*required*)
- `admin_password` - WP admin user password (*required* in `vault.yml`)
- `initial_permalink_structure` - permalink structure applied at time of WP install (default: `/%postname%/`)

### Remote servers

- `repo` - URL of the Git repo of your Bedrock project (*required*)
- `repo_subtree_path` - relative path to your Bedrock/WP directory in your repo (above) if its not the root (like site/ in roots-example-project)
- `branch` - the branch name, tag name, or commit SHA1 you want to deploy (default: `master`)
- `env` - environment variables
  - `auth_key` - Generate (*required* in `vault.yml`)
  - `secure_auth_key` - Generate (*required* in `vault.yml`)
  - `logged_in_key` - Generate (*required* in `vault.yml`)
  - `nonce_key` - Generate (*required* in `vault.yml`)
  - `auth_salt` - Generate (*required* in `vault.yml`)
  - `secure_auth_salt` - Generate (*required* in `vault.yml`)
  - `logged_in_salt` - Generate (*required* in `vault.yml`)
  - `nonce_salt` - Generate (*required* in `vault.yml`)
- `deploy_keep_releases` - number of releases to keep for rollbacks (default: 5)
