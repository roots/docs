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
define('PATH_CURRENT_SITE', env('PATH_CURRENT_SITE') ?: '/');
define('SITE_ID_CURRENT_SITE', env('SITE_ID_CURRENT_SITE') ?: 1);
define('BLOG_ID_CURRENT_SITE', env('BLOG_ID_CURRENT_SITE') ?: 1);
```

You'll also need to edit the `wordpress_sites.yml` vars file and update the multisite settings under your environment directory (`group_vars/<environment>/wordpress_sites.yml`):

```yaml
multisite:
  enabled: true
  subdomains: false   # Set to true if you're using a subdomain multisite install
```

You'll may also want to define the `env` dictionary for more multisite specific settings such as `DOMAIN_CURRENT_SITE` or `PATH_CURRENT_SITE`.

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

## Subdomain installs and hosts

Install the [Landrush](https://github.com/phinze/landrush) Vagrant plugin:

```
vagrant plugin install landrush
```

Landrush spins up a small DNS server that allows us to use wildcard subdomains, a requirement for subdomain multisite installs.

Make the following changes to your `Vagrantfile`:


```diff
-  if Vagrant.has_plugin? 'vagrant-hostmanager'
-    config.hostmanager.enabled = true
-    config.hostmanager.manage_host = true
-    config.hostmanager.aliases = hostnames + redirects
+  if Vagrant.has_plugin? 'landrush'
+    config.landrush.enabled = true
+    config.landrush.tld = config.vm.hostname
+
+    hostnames.each do |host|
+      config.landrush.host host, PRIVATE_IP
+    end
   else
-    fail_with_message "vagrant-hostmanager missing, please install the plugin with this command:nvagrant plugin install vagrant-hostmanager"
+    fail_with_message "landrush missing, please install the plugin:nvagrant plugin install landrush"
   end
```

### Debugging Landrush

If something goes wrong with Landrush such as not being able to resolve a
website from the guest:

```
vagrant landrush list
```

And remove any extraneous entries and try again.