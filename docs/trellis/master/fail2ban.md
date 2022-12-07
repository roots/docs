---
description: Trellis allows you to customize Fail2ban services and filters.
---

# Fail2ban

Trellis installs Fail2ban on your servers by default.

## About Fail2ban

From the [Fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) docs:

Fail2ban scans log files (e.g. `/var/log/apache/error_log`) and bans IPs that show the malicious signs — too many password failures, seeking for exploits, etc. Generally Fail2ban is then used to update firewall rules to reject the IP addresses for a specified amount of time, although any arbitrary other action (e.g. sending an email) could also be configured. Out of the box Fail2ban comes with filters for various services (apache, courier, ssh, etc).

Fail2ban is able to reduce the rate of incorrect authentications attempts however it cannot eliminate the risk that weak authentication presents. Configure services to use only two factor or public/private authentication mechanisms if you really want to protect services.

:::warning Note
By default, Trellis lets Fail2ban *only* monitor the `sshd` service.
:::

## Configuring Fail2ban

Custom settings should be specified in `group_vars/all/security.yml`, e.g.:

```yaml
fail2ban_bantime: 7200 # 2 hours
fail2ban_maxretry: 2
```

For all available parameters, see [`roles/fail2ban/README.md`](https://github.com/roots/trellis/blob/master/roles/fail2ban/README.md).

## Logs

Fail2ban's logs are available on your remote host via SSH:

```bash
$ sudo tail -f /var/log/fail2ban.log
```

::: tip Note
During server setup, Trellis adds your *current* IP address to the whitelist.

A successful ban on yourself would show up as `INFO [filter-name] Ignore xxx.xxx.xxx.xxx by ip`.
:::

## Adding custom services and filters

Requires at least Trellis `v1.5.0`.

To add services, add `fail2ban_services_custom` with a list of filters to `group_vars/all/security.yml`, e.g.:

```yaml
fail2ban_services_custom:
  - name: wordpress-hard
    filter: wordpress-hard
    logpath: /var/log/auth.log
    maxretry: 1
  - name: wordpress-soft
    filter: wordpress-soft
    logpath: /var/log/auth.log
    maxretry: 2
```

If you are implementing Fail2ban services for a plugin, such as [WP Fail2ban](https://wordpress.org/plugins/wp-fail2ban/) or [WP Fail2Ban Redux](https://wordpress.org/plugins/wp-fail2ban-redux/), refer to their documentation for the correct service settings.

To add the corresponding filters, create a `fail2ban_filters` folder next to `group_vars` and add the filter configuration files to it. 

::: warning Note
The filter configuration must be a Jinja template (`.conf.j2`) for Trellis to recognize and template it out to the server.
:::

Filters provided by plugins as `.conf` files require that you append the file name with `.j2`. 

It is not required to modify filters provided by plugins. But, you may (and should) customize them to your needs.

::: tip Tip
To provision, run `ansible-playbook server.yml` with `--tags fail2ban` to set up only this portion.
:::
