---
description: Configuring composer HTTP basic authentication for private packages.
---

# Composer HTTP Basic Authentication

Many paid WordPress plugins also offer Composer support. Typically, this is accomplished by adding the plugin repository to your composer.json file:

```json
"repositories": [
    {
        "type":"composer",
        "url":"https://example.com"
    }
]
```

The actual plugin download is protected behind a basic HTTP authentication layer. This allows the plugin developer to restrict access to the plugin via Composer by a username/password combination. The basic authentication credentials are stored in an auth.json file. 

```yaml
{
    "http-basic": {
        "example.com": {
            "username": "{COMPOSER_HTTP_USERNAME}",
            "password": "{COMPOSER_HTTP_PASSWORD}"
        }
    }
}
```

However, when using such plugins in a Trellis project, it is generally considered bad practice to implement this via [deploy hooks](https://discourse.roots.io/t/interactive-console-authentication-for-3rd-party-repository-on-deploy/8592/2) or adding the `auth.json` to your version control.

Trellis now supports HTTP basic authentication for multiple Composer repositories, via the Ansible [Vault](https://docs.roots.io/trellis/master/vault/#steps-to-enable-ansible-vault) functionality, on a per environment configuration.

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { hostname: example.com, username: COMPOSER_HTTP_USERNAME, password: COMPOSER_HTTP_USERNAME }

```

If the private repository doesn't use a password (because the username contains
an API key for example), you'll need to set an empty password like this:

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { hostname: example.com, username: apikey, password: "''" }

```

Multiple private Composer repositories can be configured in this way.

This functionality does have a few requirements:

 - The passwords should not be stored as plain text, as described in the [Vault](https://docs.roots.io/trellis/master/vault/) documentation
 - Currently, only HTTP basic authentication is supported

