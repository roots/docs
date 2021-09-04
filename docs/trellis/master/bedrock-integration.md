---
description: Configuring composer HTTP basic authentication for private packages.
---

# Bedrock Integration

If you want to manage your WordPress project configuration using Composer, we recommend using the [Bedrock Boilerplate](https://roots.io/docs/bedrock/master/installation/). Bedrock's [Composer](https://roots.io/docs/bedrock/master/composer/) support allows you to install plugins and themes from the WordPress.org repositories, via [WPackagist](https://wpackagist.org/).

## Composer HTTP basic authentication

Many paid WordPress plugins also offer Composer support. Typically this is accomplished by adding the plugin repository to your composer.json file:

```
"repositories": [
    {
        "type":"composer",
        "url":"https://composer.pluginrepostory.com"
    }
]
```

The actual plugin download is protected behind a basic HTTP authentication layer. This allows the plugin developer to restrict access to the plugin via Composer by a username/password combination. The basic authentication credentials are stored in an auth.json file. 

```
{
    "http-basic": {
        "composer.pluginrepostory.com": {
            "username": "{COMPOSER_HTTP_USERNAME}",
            "password": "{COMPOSER_HTTP_PASSWORD}"
        }
    }
}
```

However, when using such plugins in a Trellis project, it is generally considered bad practice to implement this via [deploy hooks](https://discourse.roots.io/t/interactive-console-authentication-for-3rd-party-repository-on-deploy/8592/2) or adding the `auth.json` to your version control.

Trellis now supports HTTP basic authentication for multiple Composer repositories, via the Ansible [Vault](https://roots.io/docs/trellis/master/vault/#steps-to-enable-ansible-vault) functionality, on a per environment configuration.

```
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  composer.pluginrepostory.com:
    composer_authentications:
      - { hostname: composer.pluginrepostory.com, username: COMPOSER_HTTP_USERNAME, password: COMPOSER_HTTP_USERNAME }

```

Multiple private Composer repositories can be configured in this way.

This functionality does have a few requirements

 - The passwords should not be stored as plain text, as described in the [Vault](https://roots.io/docs/trellis/master/vault/) documentation
 - The password cannot be null, or an empty string
 - Currently, only HTTP basic authentication is supported


