---
ID: 6149
post_title: SSL
author:
  - Ben Word
post_date:
  - 2015-09-03 17:44:10
post_excerpt:
  - ""
layout: doc
permalink:
  - /trellis/docs/ssl/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
HTTPS is now more important than ever. Strong encryption through HTTPS creates a safer and more secure web while protecting your site's users.

Roots believes in security so we've always made SSL/HTTPS a priority in Trellis. Our implementation is designed to score an A+ on the [Qualys SSL Labs Test](https://www.ssllabs.com/ssltest/).

In the past many people avoided going HTTPS for technical and convenience reasons:

* Certificates were expensive
* Annoying and complicated web-server configuration
* HTTPS sites were much slower than HTTP

Trellis has features to make it as easy, cheap, and painless as possible to use HTTPS giving you no excuse *not* to use it.

There are three supported certificate *providers* in Trellis:

* [Let's Encrypt](#lets-encrypt)
* [Manual](#manual)
* [Self-signed](#self-signed)

HTTPS can be enabled on a per-site basis. However, by default, enabling SSL on a site will make that site HTTPS **only**. Meaning that all HTTP requests will be redirected to HTTPS with the proper HSTS headers set as well. Unless you have a good reason to change this default, you shouldn't. See the section on [HSTS](#hsts) for more details.

## Configuration

Any SSL provider starts with the same basic configuration. Add the following to a WP site:

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: <name>
```

You'll also need to set your `wp_home` and `wp_siteurl` variables to use `https` URLs:

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: letsencrypt
  env:
    wp_home: https://example.com
    wp_siteurl: https://example.com/wp
```

### Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) (LE) is a new Certificate Authority that is free, automated, and open.

Unless you already have an SSL certificate purchased, Let's Encrypt should be your provider choice.

Trellis has complete automated integration. The only required setting is the `provider` itself:

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: letsencrypt
```

There is one main difference between LE and other certificate authorities: their certificates expire every *90 days*. Trellis automates by running a cron-job so you never have to manually renew them or worry about them expiring like a paid certificate.

#### DNS records

Let's Encrypt verifies and creates certificates through a publicly accessible web server for *every* domain you want on the certificate.

This means you need valid and working DNS records for every site host/domain you have configured for your WP site.

```yaml
# group_vars/production/wordpress_sites.yml (example)

mydomain.com:
  site_hosts:
    - mydomain.com
    - mydomaintoredirect.com
  ssl:
    enabled: true
    provider: letsencrypt
```

In the example above, Trellis will try to automatically create 1 certificate with the following hosts: `mydomain.com`, `mydomaintoredirect.com`, `www.mydomain.com` and `www.mydomaintoredirect.com`.

All you need to do is make sure those DNS records exist and point to the web server's IP. Trellis takes care of the rest.

Where do the `www` subdomains come from? Trellis has an auto `www` redirect feature since you'll want both the `www` and non-`www` domains to redirect to the same place.

This can be disabled by setting `www_redirect` to `false` on your WP site:

```yaml
# group_vars/production/wordpress_sites.yml (example)

mydomain.com:
  site_hosts:
    - mydomain.com
    - mydomaintoredirect.com
  www_redirect: false
  ssl:
    enabled: true
    provider: letsencrypt
```

#### Challenges

Let's Encrypt certificate process looks roughly like:

1. Generate private account key
2. Generate private key for each site (could have multiple domains)
3. Generate CSR (Certificate Signing Request) for each site (single/multiple domains)
4. Request certificate from LE by sending them the account key and CSR
5. LE client creates a "challenge" file in the web root of your site
6. LE server verifies it can access the challenge file
7. LE server sends the certificate if the challenge succeeds

The above steps is what Trellis handles automatically.

#### Multiple servers

Trellis' LE integration is designed by default for a single server. If you have multiple web servers behind a load balancer, you will *not* want this role/process running on all of them since it would generate different private and account keys for each one.

This process is beyond the scope of the documentation right now. However, there are two variables which help for this process:

* `letsencrypt_account_key_source_content`
* `letsencrypt_account_key_source_file`

You can use either of these to manually define an account key's contents or file. If one of these is set, it will be used and none will be automatically generated.

It's also up to you to make sure you've manually registered your account key. See [https://gethttpsforfree.com/](https://gethttpsforfree.com/) for a simple site to do this.

#### Staging

Let's Encrypt has rate limits for their production/real certificates. While Trellis will prevent these rate limits from being hit, if you want to test out LE integration, you can use their staging server to get a "fake" certificate.

Note that browsers will display an error/warning that they don't recognize the Certificate Authority so this should only be used for testing purposes.

Just set the following variable:

```yaml
# in a group_vars file
letsencrypt_ca: "https://acme-staging.api.letsencrypt.org"
```

### Manual

This provider means you're providing both the SSL certificate and private key. This was the original method included in Trellis.

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: manual
    cert: ~/ssl/example.com.crt
    key: ~/ssl/example.com.key
```

`cert` and `key` are **local** relative paths to those files. They will be copied to the remote servers. This is done so your private key does not need to be stored in your Git repository for security reasons.

### Self-signed

The self-signed provider **should only be used for development or internal server purposes**. Trellis will generate a "fake" (or "snake-oil") certificate which is not recognized by browsers.

Browsers will prompt you with an error/warning that they don't recognize the Certificate Authority (which is yourself in this case).

```yaml
# group_vars/development/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
  provider: self-signed
```

## HSTS

Trellis sets [HSTS](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) headers for better security. HSTS will ensure all traffic to your site is being served over HTTPS automatically.

There are a few defaults set which you can override if need be:

* `hsts_max_age` - how long the header lasts (default: `31536000` (1 year))
* `hsts_include_subdomains` - also make *all* subdomains be served over HTTPS (default: `true`)
* `hsts_preload` - indicates the site owner's consent to have their domain preloaded (default: `true`)

These variables are configured on a site's `ssl` object:

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: letsencrypt
    hsts_max_age: 31536000
    hsts_include_subdomains: true
    hsts_preload: true
```

### Preload lists

To take full advantage of the `preload` feature, you need to manually submit your site/domain to browser HSTS preload lists here: [https://hstspreload.appspot.com/](https://hstspreload.appspot.com/)

### Disabling HSTS

The only way to disable HSTS is to set the `max-age` header to `0`:

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: letsencrypt
    hsts_max_age: 0
```

## Performance

Our HTTPS implementation uses all performance optimizations possible to ensure your sites remain fast despite the small overhead of SSL. This includes the following features:

* HTTP/2 support (fallback to HTTP/1.1 for older browsers)
* SSL session cache
* OCSP stapling
* 1400 byte TLS records
* Longer keepalives

See [Is TLS Fast Yet?](https://istlsfastyet.com/) for more information on fast TLS/SSL.

## Browser support

Since our implementation is designed to be modern and score an A+ on the [Qualys SSL Labs Test](https://www.ssllabs.com/ssltest/), this does mean that a few older browsers such as IE6 won't be able to access your site due to the cipher suites used.
