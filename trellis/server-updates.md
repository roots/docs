---
date_modified: 2026-11-24 00:00
date_published: 2026-11-18 00:00
description: Keep Trellis servers patched. Learn which packages Trellis upgrades automatically, how to check your servers with `trellis doctor`, and how to upgrade Nginx, PHP, and MariaDB when a security release comes out.
title: Keeping Trellis Servers Updated
authors:
  - ben
---

# Keeping Trellis Servers Updated

Trellis installs packages, but by default it doesn't upgrade them. Re-provisioning a server leaves Nginx, PHP, and MariaDB at whatever version is already installed. When one of them ships a security release, you need to upgrade it yourself.

## Checking your servers

`trellis doctor` checks whether your servers are up to date. It requires [trellis-cli](/trellis/docs/cli/) v1.21.0 or later. Run it from your project's `trellis` directory:

```bash
trellis doctor
```

With no arguments, it checks every environment except `development`. To check specific environments, including your local VM, name them:

```bash
trellis doctor production
```

On each server, it compares the installed Nginx, PHP, and MariaDB packages with what their repositories offer, and checks [php.net](https://www.php.net/releases/) for PHP releases that haven't reached the repository yet. It also checks for a required reboot, unattended-upgrades, Ubuntu's end of support, and whether your project is on the latest Trellis release.

When something is outdated, doctor prints the `trellis provision` command that upgrades it:

```plaintext
production · admin@203.0.113.10
  ✓ Ubuntu               Ubuntu 24.04.3 LTS · supported until 2029-05-31
  ✓ nginx                1.31.9
  ✗ php8.3-fpm           8.3.37-2 → 8.3.37-3 available
                         apt source: https://packages.sury.org/php noble/main
  ✓ mariadb-server       11.8.10
  ✓ Reboot               No reboot required
  ✓ Unattended upgrades  enabled · last ran 20 hours ago

  Fix:
    trellis provision --tags php --extra-vars "apt_package_state=latest" production
```

Doctor connects to your servers the same way `trellis provision` does. Without `--fix`, it doesn't use sudo or change anything on them.

### Applying upgrades

To run the upgrades doctor suggests, add `--fix`:

```bash
trellis doctor --fix production
```

It asks before provisioning each environment, then checks it again. Upgrades stay within your configured `php_version` and `mariadb_version`, and Ubuntu's own packages and reboots are left to you.

### Running doctor on a schedule

With `--quiet`, doctor only prints problems and warnings, and prints nothing when everything is up to date, so it works well in cron:

```plaintext
0 7 * * 1-5 cd /path/to/site/trellis && /path/to/trellis doctor --quiet production
```

Use the full path to `trellis` (run `which trellis` to find it) and an SSH key that doesn't prompt for a passphrase. Connect to each server once beforehand (e.g. `trellis ssh production`) so its host key is known. Cron can't answer a vault password prompt, so use a `.vault_pass` file instead of `ask_vault_pass`.

Doctor exits with `1` when something is outdated, and `2` when nothing is outdated but something couldn't be checked, such as an unreachable server. Warnings, like a required reboot, exit with `0`.

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

`trellis doctor` does this check for you. If php.net has a release that your server's repository doesn't yet, doctor says so; run it again later to see when the new packages are available.

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
