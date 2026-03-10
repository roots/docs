---
date_modified: 2026-03-10 12:00
date_published: 2021-09-06 16:48
description: Set up Composer authentication in Trellis to access private packages, commercial plugins, and authenticated repositories during deployment.
title: Composer Authentication
authors:
  - ben
  - swalkinshaw
  - TangRufus
---

# Composer Authentication

Many paid WordPress plugins also offer Composer support. Typically, this is accomplished by adding the plugin repository to your composer.json file:

```json
"repositories": [
    {
        "type":"composer",
        "url":"https://example.com"
    }
]
```

The actual plugin download is usually protected behind an authentication layer. This allows the plugin developer to restrict access to the plugin via Composer. The authentication credentials are stored in an auth.json file.

However, when using such plugins in a Trellis project, it is generally considered bad practice to implement this via [deploy hooks](https://discourse.roots.io/t/interactive-console-authentication-for-3rd-party-repository-on-deploy/8592/2) or adding the `auth.json` to your version control.

Trellis supports authentication for multiple Composer repositories, via the Ansible [Vault](/trellis/docs/vault/#steps-to-enable-ansible-vault) functionality, on a per environment configuration.

## Supported authentication types

| Type | Description |
| --- | --- |
| `http-basic` | HTTP basic authentication (username/password) |
| `bearer` | HTTP Bearer token authentication |
| `github-oauth` | GitHub OAuth token |
| `gitlab-oauth` | GitLab OAuth token |
| `gitlab-token` | GitLab personal/deploy token |
| `bitbucket-oauth` | Bitbucket OAuth consumer key/secret |

## HTTP Basic

If `type` is omitted, it defaults to `http-basic` for backward compatibility.

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: http-basic, hostname: example.com, username: my-username, password: my-password }
```

If the private repository doesn't use a password (because the username contains an API key for example), you can omit `password`:

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: http-basic, hostname: example.com, username: apikey }
```

## Bearer

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: bearer, hostname: example.com, token: my-token }
```

## GitHub OAuth

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: github-oauth, hostname: github.com, token: my-github-token }
```

## GitLab OAuth

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: gitlab-oauth, hostname: gitlab.com, token: my-gitlab-oauth-token }
```

## GitLab Token

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: gitlab-token, hostname: gitlab.com, token: my-gitlab-token }
```

## Bitbucket OAuth

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: bitbucket-oauth, hostname: bitbucket.org, consumer_key: my-consumer-key, consumer_secret: my-consumer-secret }
```

## Multiple repositories

Multiple private Composer repositories can be configured together:

```yaml
# group_vars/<env>/vault.yml

vault_wordpress_sites:
  example.com:
    composer_authentications:
      - { type: http-basic, hostname: example.com, username: my-username, password: my-password }
      - { type: github-oauth, hostname: github.com, token: my-github-token }
      - { type: bearer, hostname: private-registry.com, token: my-token }
```

## Requirements

- Passwords and tokens should not be stored as plain text, as described in the [Vault](/trellis/docs/vault/) documentation
