---
ID: 6149
post_title: SSL
author: Ben Word
post_date: 2015-09-03 17:44:10
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/ssl/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
SSL/HTTPS can be enabled on a per-site basis. However, by default, enabling SSL on a site will make that site HTTPS **only**. Meaning that all HTTP requests will be redirected to HTTPS with the proper HSTS headers set as well.

Our SSL implementation is designed to score an A+ on the [Qualys SSL Labs Test](https://www.ssllabs.com/ssltest/). This does mean that a few older browsers such as IE6 won't be able to access your site due to the cipher suites used.

## Configuration

Add the following to a WP site:

```yaml
ssl:
  enabled: true
  cert: ~/ssl/example.com.crt
  key: ~/ssl/example.com.key
```

`cert` and `key` are **local** relative paths to those files. They will be copied to the remote servers. This is done so your private key does not need to be stored in your Git repository for security reasons.

## Performance

Our SSL implementation uses all performance optimizations possible to ensure your sites remain fast despite the small overhead of SSL. This includes the following features:

* SPDY protocol
* SSL session cache
* OCSP stapling
* 1400 byte TLS records
* Longer keepalives

See https://istlsfastyet.com/ for more information on fast TLS (SSL).