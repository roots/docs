---
date_modified: 2026-03-05 00:00
date_published: 2015-09-06 07:42
description: Secure Trellis WordPress servers by disabling root SSH login, creating admin users with sudo access, configuring secure password authentication, and hardening WordPress runtime file permissions.
title: WordPress Security Features in Trellis
authors:
  - ben
  - fullyint
  - Log1x
  - QWp6t
  - swalkinshaw
---

# WordPress Security Features in Trellis

## Locking down root

The `sshd` role heightens your server's security by providing better SSH defaults. SSH password authentication will be disabled. We encourage you to disable SSH `root` login as well. You may adjust these two particular options in `group_vars/all/security.yml`. See the [`sshd` role `README.md`](https://github.com/roots/trellis/tree/master/roles/sshd) for more configuration options.

## Admin user

The first provision via the `server.yml` playbook will create the `admin_user` and set up related [SSH Keys](ssh-keys.md). If you disable `root` login, subsequent connections will be made as the `admin_user`.

## Admin user sudoer password

If `root` login is disabled and the `server.yml` playbook connects as the `admin_user`, it will invoke `sudo` using the password in `vault_users` (`group_vars/<environment>/vault.yml`). If you run the playbook with `--ask-become-pass`, Trellis will use the password you enter via the CLI. You are strongly encouraged to protect the sensitive `vault_users` information by enabling Ansible [Vault](vault.md).

## WordPress runtime hardening

Trellis supports an opt-in hardening mode that separates the PHP-FPM runtime identity from the deploy user. When enabled, PHP runs as a dedicated user with write access limited to explicitly allowlisted paths. This reduces the impact of a compromised WordPress site by preventing PHP from modifying application code.

By default, hardening is disabled and Trellis behaves as it always has — PHP-FPM runs as the `web_user`.

### Enabling hardening

Add the following to `group_vars/all/main.yml` (or an environment-specific file like `group_vars/production/main.yml`):

```yaml
wordpress_runtime_hardened: true
```

### Configuration options

| Variable | Default | Description |
| --- | --- | --- |
| `wordpress_runtime_hardened` | `false` | Enable runtime hardening mode |
| `wordpress_runtime_user` | `www-data` | OS user that PHP-FPM runs as when hardened |
| `wordpress_runtime_group` | `www-data` | OS group that PHP-FPM runs as when hardened |
| `wordpress_runtime_writable_paths` | `["shared/uploads"]` | Paths the runtime user can write to (relative to the site root) |
| `wordpress_runtime_cron_as_runtime_user` | `false` | Run WP-CLI cron as the runtime user instead of `web_user` |

### Using a custom runtime user

For stronger isolation, use a dedicated user instead of `www-data`. The user and group must exist on the server before hardening is enabled — the playbook will fail fast if they don't.

Define the user in `group_vars/all/users.yml`:

```yaml
users:
  - name: php-app
    groups:
      - php-app
    keys: []
```

Then configure the runtime variables:

```yaml
wordpress_runtime_hardened: true
wordpress_runtime_user: php-app
wordpress_runtime_group: php-app
```

### Per-site writable paths

The global `wordpress_runtime_writable_paths` applies to all sites by default. You can override it for individual sites in your [WordPress Sites](/trellis/docs/wordpress-sites/) configuration:

```yaml
wordpress_sites:
  example.com:
    runtime_writable_paths:
      - shared/uploads
      - current/web/app/cache
```

### Cron user

By default, WP-CLI cron jobs continue to run as the `web_user` even when hardening is enabled. To run cron as the runtime user instead:

```yaml
wordpress_runtime_cron_as_runtime_user: true
```

This only takes effect when `wordpress_runtime_hardened` is also `true`.
