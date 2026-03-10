---
date_modified: 2026-03-10 12:00
date_published: 2026-03-10 12:00
description: How Trellis manages WordPress cron jobs with system cron, including configuration options for single sites and Multisite, plus adding custom cron jobs via deploy hooks.
title: Cron Jobs in Trellis
authors:
  - ben
  - chrillep
---

# Cron Jobs in Trellis

Trellis sets `DISABLE_WP_CRON` to `true` by default and replaces WP-Cron with a system cron job. This is more reliable than WP-Cron, which depends on site traffic to trigger scheduled tasks.

## How it works

When you provision a server, Trellis automatically:

1. Sets `DISABLE_WP_CRON` to `true` in your site's `.env` file
2. Creates a system cron job that runs `wp cron event run --due-now` on a schedule

This means WordPress scheduled events (like publishing scheduled posts, checking for updates, and running plugin tasks) are handled by the server's cron daemon instead of relying on page visits.

## Configuration

### Cron interval

The default cron interval is every 15 minutes. You can customize it per-site with the `cron_interval` option in `wordpress_sites.yml`:

```yaml
wordpress_sites:
  example.com:
    cron_interval: '*/5'
```

The value follows standard [cron schedule syntax](https://en.wikipedia.org/wiki/Cron#Overview) for the minute field.

### Disabling system cron

If you want to use WP-Cron instead of the system cron, set `disable_wp_cron` to `false` in your site's `env` configuration:

```yaml
wordpress_sites:
  example.com:
    env:
      disable_wp_cron: false
```

This will re-enable WP-Cron and remove the system cron job on the next provision.

### Multisite

For Multisite installations, Trellis creates a separate cron job that iterates over all sites in the network. The default interval for Multisite is every 30 minutes, configurable with `cron_interval_multisite`:

```yaml
wordpress_sites:
  example.com:
    multisite:
      enabled: true
    cron_interval_multisite: '*/15'
```

You can disable the Multisite cron job while keeping `disable_wp_cron` enabled by setting `multisite.cron` to `false`:

```yaml
wordpress_sites:
  example.com:
    multisite:
      enabled: true
      cron: false
```

## Adding custom cron jobs

Trellis doesn't have a built-in configuration option for custom cron jobs, but you can add them using Ansible's [cron module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html) with [deploy hooks](/trellis/docs/deployments/#hooks).

### During provisioning

To add a custom cron job during provisioning, create a task file and include it via a hook or custom role. For example, create `roles/custom-crons/tasks/main.yml`:

```yaml
- name: Schedule database backup
  cron:
    name: "{{ item.key }} database backup"
    minute: '0'
    hour: '3'
    user: "{{ web_user }}"
    job: "cd {{ www_root }}/{{ item.key }}/current && wp db export /tmp/{{ item.key }}-backup.sql > /dev/null 2>&1"
    cron_file: "{{ item.key | replace('.', '_') }}-db-backup"
  loop: "{{ wordpress_sites | dict2items }}"
  loop_control:
    label: "{{ item.key }}"
```

### During deploy

If you only use the deploy portion of Trellis (e.g., you don't have root access to run full provisioning), you can manage cron jobs through deploy hooks. This is useful for keeping cron job definitions in sync with your deployed code.

Create a task file at `deploy-hooks/cron-jobs.yml`:

```yaml
- name: Schedule custom task
  cron:
    name: "{{ site }} custom task"
    minute: '0'
    hour: '*/6'
    user: "{{ web_user }}"
    job: "cd {{ deploy_helper.current_path }} && wp eval-file scripts/custom-task.php > /dev/null 2>&1"
```

::: tip
Always set `user` explicitly. Without it, the cron job is added to the crontab of whichever user Ansible connects as (often the `deploy` user), which can cause WP-CLI permission issues. Use `{{ web_user }}` to match how Trellis manages its own WordPress cron jobs.
:::

Then add the hook to your configuration in `group_vars/all/deploy-hooks.yml` (or `group_vars/all/main.yml`):

```yaml
deploy_finalize_after:
  - "{{ playbook_dir }}/roles/deploy/hooks/finalize-after.yml"
  - "{{ playbook_dir }}/deploy-hooks/cron-jobs.yml"
```

::: warning
When overriding `deploy_finalize_after`, make sure to keep the default Trellis hook (`roles/deploy/hooks/finalize-after.yml`) as the first item in the list. Omitting it will skip the default tasks that refresh WordPress settings and reload php-fpm.
:::

### Cron module options

The Ansible `cron` module supports the following scheduling options:

| Option    | Description                          | Default |
|-----------|--------------------------------------|---------|
| `minute`  | Minute (0-59, `*`, `*/N`)           | `*`     |
| `hour`    | Hour (0-23, `*`, `*/N`)             | `*`     |
| `day`     | Day of month (1-31, `*`, `*/N`)     | `*`     |
| `month`   | Month (1-12, `*`, `*/N`)            | `*`     |
| `weekday` | Day of week (0-6, Sunday=0, `*`)    | `*`     |
| `job`     | The command to run                   |         |
| `name`    | Description of the cron entry        |         |
| `user`    | The user the cron job runs as        |         |
| `state`   | `present` or `absent`                | `present` |

## Verifying cron jobs

Trellis stores its provisioned cron jobs as files in `/etc/cron.d/`. To list them:

```bash
ls /etc/cron.d/wordpress-*
```

To view a specific cron file:

```bash
cat /etc/cron.d/wordpress-example_com
```

Cron jobs added without `cron_file` (including deploy hook examples that use `user`) are stored in the specified user's crontab instead. To view those:

```bash
sudo crontab -u web -l
```

## Related documentation

- [Managing WP-Cron in Bedrock](/bedrock/docs/wp-cron/)
- [Deployments and deploy hooks](/trellis/docs/deployments/)
