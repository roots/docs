---
date_modified: 2023-01-31 17:40
date_published: 2018-04-24 09:59
description: Server logs for Trellis sites can be found at `/srv/www/example.com/logs/`.
title: Server Logs
authors:
  - ben
  - Log1x
  - swalkinshaw
---

# Server Logs

## Accessing logs

Trellis CLI includes a `logs` command for quickly accessing logs. It automatically integrates with [GoAccess](https://goaccess.io/) when the `--goaccess` option is used.

```shell
$ trellis logs [options] ENVIRONMENT [SITE]
```

| Description                | Command                              |
| -------------------------- | ------------------------------------ |
| View production logs       | `trellis logs production`            |
| View access logs only      | `trellis logs --access production`   |
| View error logs only       | `trellis logs --error production`    |
| View logs in GoAccess      | `trellis logs --goaccess production` |
| View the last 50 log lines | `trellis logs -n 50 production`      |

Run `trellis logs --help` for further information.

## Location of logs

Server logs for Trellis sites can be found at `/srv/www/example.com/logs/`:

- `/srv/www/example.com/logs/access.log`
- `/srv/www/example.com/logs/error.log`

Any server 500 errors or white screen issues should be debugged by viewing the error logs in the `/srv/www/example.com/logs/` directory.

Trellis uses the [ansible-logrotate](https://github.com/nickhammond/ansible-logrotate) role to install and configure logrotate for sites and can be configured by editing [`group_vars/all/logrotate.yml`](https://github.com/roots/trellis/blob/master/group_vars/all/logrotate.yml).
