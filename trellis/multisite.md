---
ID: 6154
post_title: Multisite
author: Ben Word
post_date: 2015-09-03 18:09:24
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/multisite/
published: true
---
Trellis assumes your WordPress configuration already has multisite set up. If not, ensure the following values are placed somewhere in Bedrock's `config/application.php` **before** provisioning your server:

```php
/* Multisite */
define('WP_ALLOW_MULTISITE', true);
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', true); // Set to false if using subdirectories
define('DOMAIN_CURRENT_SITE', env('DOMAIN_CURRENT_SITE'));
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);
```

You'll also need to edit the `wordpress_sites.yml` vars file and update the multisite settings under your environment directory (`group_vars/<environment>/wordpress_sites.yml`):

```yaml
multisite:
  enabled: true
  subdomains: false   # Set to true if you're using a subdomain multisite install
```

You'll also need to define the `env` dictionary for multisite installs with these three settings:

```yaml
env:
  domain_current_site: example.com
  wp_home: http://example.com
  wp_siteurl: http://example.com/wp
```

Trellis automatically sets `wp_home` and `wp_siteurl` but with multisite they needs to be manually set.

## Subdomain installs and hosts

Install the [Landrush](https://github.com/phinze/landrush) Vagrant plugin:

```
vagrant plugin install landrush
```

Landrush spins up a small DNS server that allows us to use wildcard subdomains, a requirement for subdomain multisite installs.

Make the following changes to your `Vagrantfile`:

```diff
+ PRIVATE_IP = '192.168.50.5'
```

```diff
-  config.vm.network :private_network, ip: ip, hostsupdater: 'skip' 
+  config.vm.network :private_network, ip: PRIVATE_IP, hostsupdater: 'skip'
```

```diff
-  if Vagrant.has_plugin? 'vagrant-hostmanager'
-    config.hostsupdater.aliases = aliases
+  if Vagrant.has_plugin? 'landrush'
+    config.landrush.enabled = true
+    config.landrush.tld = config.vm.hostname
+
+    hostnames.each do |host|
+      config.landrush.host host, PRIVATE_IP
+    end
   else
-    puts 'vagrant-hostsupdater missing, please install the plugin:'
-    puts 'vagrant plugin install vagrant-hostsupdater'
+    puts 'landrush missing, please install the plugin:'
+    puts 'vagrant plugin install landrush'
   end
```

### Debugging Landrush

If something goes wrong with Landrush such as not being able to resolve a
website from the guest:

```
vagrant landrush list
```

And remove any extraneous entries and try again.