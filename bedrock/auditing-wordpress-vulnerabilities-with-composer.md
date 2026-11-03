---
date_modified: 2026-07-24 23:00
date_published: 2026-05-03 12:00
description: Audit WordPress plugins and themes for known vulnerabilities with Composer using WP Sec Adv, a security advisory repository sourced from Wordfence Intelligence.
title: Auditing WordPress Vulnerabilities with Composer
authors:
  - ben
  - tangrufus
---

# Auditing WordPress Vulnerabilities with Composer

`composer audit` reports known vulnerabilities for PHP packages on Packagist, but it has no awareness of WordPress plugin and theme advisories. [WP Sec Adv](https://github.com/typisttech/wpsecadv) closes that gap by exposing WordPress security data — sourced from the [Wordfence Intelligence](https://www.wordfence.com/help/wordfence-intelligence/v3-accessing-and-consuming-the-vulnerability-data-feed/) feed — as a Composer repository.

Once added, Composer treats WordPress advisories the same as any other:

- `composer audit` reports known vulnerabilities in installed WordPress packages
- `composer require` and `composer update` block installation of vulnerable packages
- Advisories include CVEs, severity ratings, and links to vulnerability reports

The advisory data refreshes twice daily.

## Adding the repository

From your Bedrock project root:

```shell
$ composer repo --append add wpsecadv composer https://repo-wpsecadv.typist.tech
```

Composer will now check for WordPress vulnerabilities during `install`, `require`, `update`, and `audit`.

## Package support

WP Sec Adv matches advisories to Composer packages by slug, with built-in support for:

- [WordPress plugin and theme packages](https://wp-packages.org/)
- [WordPress core packages](https://wp-packages.org/wordpress-core)

Unrecognized vendors still attempt to match against known plugin and theme slugs, so custom mirrors and private registries work too.

## Ignoring advisories

Not every advisory requires immediate action. Composer lets you acknowledge specific advisories with a documented reason:

```json
{
  "config": {
    "policy": {
      "advisories": {
        "ignore-id": {
          "CVE-2026-3589": "Waiting for upstream fix in v1.2.3. Allow during updates but still report in audits"
        }
      }
    }
  }
}
```

Every exception is tracked in `composer.json`, keeping your security posture intentional rather than reactive.

## Auditing in CI

Pair WP Sec Adv with a CI step to audit your lockfile on every push. For GitHub Actions:

```yaml
- name: Audit
  run: composer audit --locked
```

This gives you continuous vulnerability monitoring for both PHP and WordPress dependencies with no additional tooling.

::: tip
WP Sec Adv is maintained by [Tang Rufus](https://github.com/tangrufus). If it's useful to your projects, consider [sponsoring his work](https://github.com/sponsors/tangrufus).
:::
