# Multisite

Trellis assumes your WordPress configuration already has multisite set up. If not, ensure the following values are placed somewhere in Bedrock's `config/application.php` **before*- provisioning your server:

```php
/- Multisite */
Config::define('WP_ALLOW_MULTISITE', true);
Config::define('MULTISITE', true);
Config::define('SUBDOMAIN_INSTALL', false); // Set to true if using subdomains
Config::define('DOMAIN_CURRENT_SITE', env('DOMAIN_CURRENT_SITE'));
Config::define('PATH_CURRENT_SITE', env('PATH_CURRENT_SITE') ?: '/');
Config::define('SITE_ID_CURRENT_SITE', env('SITE_ID_CURRENT_SITE') ?: 1);
Config::define('BLOG_ID_CURRENT_SITE', env('BLOG_ID_CURRENT_SITE') ?: 1);
```

You'll also need to update the multisite settings under your environment directory (`group_vars/<environment>/wordpress_sites.yml`):

```yaml
multisite:
  enabled: true
  subdomains: false   # Set to true if you're using a subdomain multisite install
```

You may also want to define the `env` dictionary for more multisite specific settings such as `DOMAIN_CURRENT_SITE` or `PATH_CURRENT_SITE`.

```yaml
env:
  domain_current_site: store1.example.com
```

That `env` will be merged in with Trellis' defaults so you don't need to worry about re-defining all of the properties.

Here's an example of a complete entry set up for multisite:

```yaml
# group_vars/production/wordpress_sites.yml
wordpress_sites:
  example.com:
    site_hosts:
      - canonical: example.com
    local_path: ../site # path targeting local Bedrock site directory (relative to Ansible root)
    admin_email: admin@example.com
    multisite:
      enabled: true
      subdomains: true
    ssl:
      enabled: false
    cache:
      enabled: false
    env:
      domain_current_site: store1.example.com
```

After provisioning your remote server and deploying your sites, you'll need to install WordPress as a final step in your staging and production environments. SSH into your server as the `web` user with `ssh web@<domain>` and in the `/srv/www/<domain>/current/` directories run the following WP-CLI command to install WordPress:

```bash
$ wp core multisite-install --title="site title" --admin_user="username" --admin_password="password" --admin_email="you@example.com"
```

You may notice that your network's main site URLs contain `/wp/` before the post's or page's pathnames. This is a problem in WP core which occurs when WordPress is located in a subdirectory, as is the case with Bedrock. See issue [Bedrock issue #250](https://github.com/roots/bedrock/issues/250) for details, along with the site URL fix plugin in the [Multisite Fixes](https://github.com/felixarntz/multisite-fixes) plugin collection for a solution.

If you use [Let's Encrypt](https://roots.io/trellis/docs/ssl/#lets-encrypt) as your SSL provider and your multisite install uses subdomains, currently you have to generate individual certificates for each of your subdomains, but this may change soon as Let's Encrypt will begin issuing [wildcard certificates in January of 2018](https://letsencrypt.org/2017/07/06/wildcard-certificates-coming-jan-2018.html). You can generate SSL certificates for your subdomains if you know these subdomains in advance while provisioning your server. To do this, define multiple `canonical` entries under `site_hosts` in your corresponding `wordpress_sites.yml` file like this:

```yaml
site_hosts:
  - canonical: example.com
    redirects:
      - www.example.com
  - canonical: subdomain.example.com
    redirects:
      - www.subdomain.example.com
```

## Subdomains locally

For subdomains in development, you'll need DNS entries for every subdomain/host. The [Landrush](https://github.com/phinze/landrush) Vagrant plugin is how you can do this. Install it via:

```bash
$ vagrant plugin install landrush
```

Landrush spins up a small DNS server that allows us to use wildcard subdomains, a requirement for subdomain multisite installs.

Some users may have external DNS issues when using Landrush. If you encounter this, add this to your `Vagrantfile`:

```ruby
config.landrush.guest_redirect_dns = false
```

See issue [#511](https://github.com/roots/trellis/issues/511) for more details.


### Debugging Landrush

If something goes wrong with Landrush such as not being able to resolve a
website from the guest:

```bash
$ vagrant landrush list
```

And remove any extraneous entries and try again.
