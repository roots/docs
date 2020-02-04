# SSL

HTTPS is now more important than ever. Strong encryption through HTTPS creates a safer and more secure web while protecting your site's users.

Roots believes in security so we've always made SSL/HTTPS a priority in Trellis. Our implementation is designed to score an A+ on the [Qualys SSL Labs Test](https://www.ssllabs.com/ssltest/).

In the past many people avoided going HTTPS for technical and convenience reasons:

- Certificates were expensive
- Annoying and complicated web-server configuration
- HTTPS sites were much slower than HTTP

Trellis has features to make it as easy, cheap, and painless as possible to use HTTPS giving you no excuse *not- to use it.

There are three supported certificate *providers- in Trellis:

- [Let's Encrypt](#lets-encrypt)
- [Manual](#manual)
- [Self-signed](#self-signed)

HTTPS can be enabled on a per-site basis. However, by default, enabling SSL on a site will make that site HTTPS **only**. Meaning that all HTTP requests will be redirected to HTTPS with the proper HSTS headers set as well. Unless you have a good reason to change this default, you shouldn't. See the section on [HSTS](#hsts) for more details.

CloudFlare Origin CA support can be added with [trellis-cloudflare-origin-ca](https://github.com/TypistTech/trellis-cloudflare-origin-ca).

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

### Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) (LE) is a new Certificate Authority that is free, automated, and open.

Unless you already have an SSL certificate purchased, Let's Encrypt should be your provider choice. Let's Encrypt is appropriate for your production and staging environments, but not for development (see [DNS records](#dns-records)).

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

<div class="alert alert-warning" role="alert">
<p class="mb-0">⚠️ Let's Encrypt is ending support for v1 of their ACME protocol. If you are using Trellis older than <code>v.1.2.0</code> please see <a href="https://discourse.roots.io/t/trellis-and-lets-encrypt-v1-end-of-life/">here</a> for more details.</p>
</div>

#### DNS records

Let's Encrypt verifies and creates certificates through a publicly accessible web server for *every- domain you want on the certificate.

This means you need valid and working DNS records for every site host/domain you have configured for your WP site.

```yaml
# group_vars/production/wordpress_sites.yml (example)

mydomain.com:
  site_hosts:
    - canonical: mydomain.com
      redirects:
        - www.mydomain.com
        - mydomaintoredirect.com
        - www.mydomaintoredirect.com
  ssl:
    enabled: true
    provider: letsencrypt
```

In the example above, Trellis will try to automatically create 1 certificate with the following hosts: `mydomain.com`, `www.mydomain.com`, `mydomaintoredirect.com` and `www.mydomaintoredirect.com`.

All you need to do is make sure those DNS records exist and point to the web server's IP. Trellis takes care of the rest.

If you want "www" subdomains to redirect to your canonical domain, they MUST be included in redirects.

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

Trellis' LE integration is designed by default for a single server. If you have multiple web servers behind a load balancer, you will *not- want this role/process running on all of them since it would generate different private and account keys for each one.

This process is beyond the scope of the documentation right now. However, there are two variables which help for this process:

- `letsencrypt_account_key_source_content`
- `letsencrypt_account_key_source_file`

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

#### Troubleshooting Let's Encrypt

Trellis versions prior to [Jan 2017](https://github.com/roots/trellis/pull/630) did not detect some changes that should have triggered Let's Encrypt certificate regeneration. The most common example was users adding domain(s) to `site_hosts` (in `wordpress_sites`) and reporting that browsers gave privacy warnings for the new domains. Similar problems occurred for users switching from manual certificates to Let's Encrypt certificates.

If you see similar privacy warnings after adjusting your SSL configuration in some way, these troubleshooting steps may help.

1. Update trellis to include [`roots/trellis#630`](https://github.com/roots/trellis/pull/630)
2. Set ssl `enabled: false` for affected sites in `group_vars/<environment>/wordpress_sites.yml`
3. Run `ansible-playbook server.yml -e env=<environment> --tags wordpress`
4. Reset ssl `enabled: true` for applicable sites in `group_vars/<environment>/wordpress_sites.yml`
5. Run `ansible-playbook server.yml -e env=<environment> --tags letsencrypt`

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

`cert` and `key` are **local*- relative paths to those files. They will be copied to the remote servers. This is done so your private key does not need to be stored in your Git repository for security reasons.

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

You can tell your browsers to trust these self signed certificates by using the vagrant-trellis-cert plugin. This also fixes issues with MacOS Catalina where the 'certificate not trusted' error screens are not possible to bypass. From your trellis folder, run:

```bash
vagrant plugin install vagrant-trellis-cert
vagrant trellis-cert trust
```

## HSTS

Trellis sets [HSTS](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) headers for better security. HSTS will ensure all traffic to your site is being served over HTTPS automatically.

There are a few defaults set which you can override if need be:

- `hsts_max_age` - how long the header lasts (default: `31536000` (1 year))
- `hsts_include_subdomains` - also make *all- subdomains be served over HTTPS (default: `true`)
- `hsts_preload` - indicates the site owner's consent to have their domain preloaded (default: `false`)

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

What is HSTS Preloading?

> HSTS Preloading is a mechanism whereby a list of hosts that wish to enforce the use of SSL/TLS on their site is built into a browser. This list is compiled by Google and is utilised by Chrome, Firefox, Opera, Safari, IE11 and Edge. These sites do not depend on the issuing of the HSTS response header to enforce the policy, instead the browser is aleady aware that the host requires the use of SSL/TLS before any connection or communication even takes place. This removes the opportunity an attacker has to intercept and tamper with redirects that take place over HTTP. This isn't to say that the host needs to stop issuing the HSTS response header, this must be left in place for those browsers that don't use preloaded HSTS lists.
>
> - https://scotthelme.co.uk/hsts-preloading/

Using preloading is a two-step process:

1. Enable the `preload` option shown above by setting `hsts_preload: true`
2. Submit your site/domain to the official browser preload list: [https://hstspreload.org/](https://hstspreload.org/)

More information:

- [https://hstspreload.org/](https://hstspreload.org/)
- [HSTS Preloading](https://scotthelme.co.uk/hsts-preloading/)

### `max-age`

Trellis defaults to a long `max-age` of `31536000` seconds (1 year).

You may want to test out HSTS with much shorter max-ages and then ramp up the value in stages until you're confident everything works.

This deployment ramp up process is detailed here: [https://hstspreload.org/#deployment-recommendations](https://hstspreload.org/#deployment-recommendations)

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

### `hsts_include_subdomains`

HSTS should ideally be applied to all subdomains as well which is why `hsts_include_subdomains` defaults to `true`. This means that if you have HSTS enabled on `example.com`, then *all- its subdomains (`*.example.com`) will also be forced over HTTPS.

If you have a WordPress site on `example.com` and you also serve another application from a subdomain such as `internalapp.example.com`, you may need to remove the "include subdomains" header option if it can't be served via HTTPS.

```yaml
# group_vars/production/wordpress_sites.yml (example)

example.com:
  # rest of site config
  ssl:
    enabled: true
    provider: letsencrypt
    hsts_max_age: 31536000
    hsts_include_subdomains: false
    hsts_preload: true
```

Note you should try very hard to support SSL/HTTPS on all subdomains. Only disable this option if you have no other options as a last resort.

## Performance

Our HTTPS implementation uses all performance optimizations possible to ensure your sites remain fast despite the small overhead of SSL. This includes the following features:

- HTTP/2 support (fallback to HTTP/1.1 for older browsers)
- SSL session cache
- OCSP stapling
- 1400 byte TLS records
- Longer keepalives

See [Is TLS Fast Yet?](https://istlsfastyet.com/) for more information on fast TLS/SSL.

## Browser support

Since our implementation is designed to be modern and score an A+ on the [Qualys SSL Labs Test](https://www.ssllabs.com/ssltest/), this does mean that a few older browsers such as IE6 won't be able to access your site due to the cipher suites used.
