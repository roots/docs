---
date_modified: 2026-03-10 12:00
date_published: 2026-03-10 12:00
description: Learn how to structure your Trellis projects when managing multiple WordPress sites, including shared and separate Trellis configurations.
title: Managing Multiple Trellis Sites
authors:
  - ben
---

# Managing Multiple Sites

Trellis supports hosting multiple WordPress sites on a single server out of the box. But when managing several sites, how you organize your project directories matters. There are two common approaches.

## Shared Trellis

A single Trellis instance manages multiple Bedrock sites on one server:

```plaintext
projects/             # → Root folder
├── trellis/          # → Single Trellis managing all sites
├── example.com/      # → First Bedrock site
└── another.com/      # → Second Bedrock site
```

Each site is defined in `wordpress_sites.yml` with its own `local_path` pointing to the corresponding directory. See the [WordPress Sites](/trellis/docs/wordpress-sites/) docs for configuration details.

This approach works well when:

- Sites share the same server and server configuration
- You want to minimize infrastructure costs by running multiple sites on one server
- You want a single place to manage provisioning and deploys

## Separate Trellis per site

Each site gets its own Trellis instance with independent server configuration:

```plaintext
example.com/          # → First project
├── trellis/
└── site/
another.com/          # → Second project
├── trellis/
└── site/
```

This approach works well when:

- Sites need different server configurations (PHP versions, Nginx settings, etc.)
- Sites are hosted on different servers or providers
- You want fully independent infrastructure per site
- Different teams manage different sites

The trade-off is more duplication of Trellis configuration, but you get full isolation between projects.
