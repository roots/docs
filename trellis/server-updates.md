---
date_modified: 2026-11-18 00:00
date_published: 2026-11-18 00:00
description: Keep Trellis servers patched. Learn which packages Trellis upgrades automatically, and how to upgrade Nginx, PHP, and MariaDB when a security release comes out.
title: Keeping Trellis Servers Updated
authors:
  - ben
---

# Keeping Trellis Servers Updated

Trellis installs packages, but by default it doesn't upgrade them. Re-provisioning a server leaves Nginx, PHP, and MariaDB at whatever version is already installed. When one of them ships a security release, you need to upgrade it yourself.

## How Trellis installs packages

Most packages are installed with `apt_package_state: present`, which installs a package if it's missing and otherwise leaves it alone. A few security-related packages (`openssh-server`, `fail2ban`, and `ferm`) use `apt_security_package_state: latest`, so they're upgraded every time you provision.

These defaults live in [`group_vars/all/main.yml`](https://github.com/roots/trellis/blob/master/group_vars/all/main.yml):

```yaml
apt_package_state: present
apt_security_package_state: latest
apt_dev_package_state: latest
```

Nginx, PHP, and MariaDB come from their own repositories instead of Ubuntu's:

| Service | Repository | Version pinned by |
| --- | --- | --- |
| Nginx | [nginx.org mainline](https://nginx.org/en/linux_packages.html) | Always the latest mainline release |
| PHP | [packages.sury.org](https://packages.sury.org/php/) | `php_version` |
| MariaDB | [MariaDB repository](https://mariadb.org/download/?t=repo-config) | `mariadb_version` |

Ubuntu's unattended-upgrades only covers Ubuntu's own repositories by default. It installs security updates for packages like Redis, Memcached, and OpenSSL, but never touches Nginx, PHP, or MariaDB.

## Upgrading a service

To upgrade a single service, provision with `apt_package_state=latest` and the tag for that service's role. Upgrades stay within the version you've configured: PHP stays on your `php_version` (e.g. 8.3.x) and MariaDB stays on your `mariadb_version`.

### Nginx

```bash
trellis provision --extra-vars apt_package_state=latest --tags nginx production
```

Confirm the version on the server:

```bash
nginx -v
```

### PHP

```bash
trellis provision --extra-vars apt_package_state=latest --tags php production
```

This upgrades PHP and all of its extensions. Confirm the version on the server:

```bash
php -v
```

### MariaDB

```bash
trellis provision --extra-vars apt_package_state=latest --tags mariadb production
```

Confirm the version on the server:

```bash
mariadb --version
```

Repeat for each environment, including `staging` and `development`.

::: tip Services restart automatically
The packages restart their own services when they're upgraded: PHP-FPM and MariaDB restart, and Nginx swaps the running process over to the new binary without dropping connections. If you want to be certain a service is running the new version, restart it on the server (e.g. `sudo systemctl restart nginx`).
:::

## Upgrading everything

To upgrade every package Trellis manages in one run, leave off `--tags`:

```bash
trellis provision --extra-vars apt_package_state=latest production
```

This runs the full `server.yml` playbook, so it takes longer and also applies any configuration changes you haven't provisioned yet.

## Waiting for a security release

Security releases are often announced a day or two ahead of time, and packages can lag behind the official release. PHP builds on packages.sury.org usually land within hours of a release, but can take longer.

To see whether a new version is available, update the package lists on the server:

```bash
sudo apt-get update
```

Then compare the installed and candidate versions, swapping in the package you're checking:

```bash
apt-cache policy php8.3-fpm
```

Once the "Candidate" version is newer than "Installed", you're ready to provision.

::: warning
The PHP role only refreshes the package lists if they're more than an hour old (`apt_cache_valid_time`). If you provision and PHP doesn't upgrade, run `sudo apt-get update` on the server and provision again.
:::

## Kernel and system updates

Kernel updates from unattended-upgrades don't take effect until the server reboots. Ubuntu creates `/var/run/reboot-required` when a reboot is needed:

```bash
cat /var/run/reboot-required
```

To upgrade the rest of the system's packages manually, run:

```bash
sudo apt-get upgrade
```

## Staying informed

Security releases for the services Trellis installs are announced here:

- [PHP news](https://www.php.net/archive/)
- [Nginx security advisories](https://nginx.org/en/security_advisories.html)
- [MariaDB security](https://mariadb.org/about/security/)
- [Ubuntu security notices](https://ubuntu.com/security/notices)

When a release affects Trellis servers, we post upgrade steps on the [Roots blog](https://roots.io/blog/) and [Roots Discourse](https://discourse.roots.io/).
