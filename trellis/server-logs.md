---
ID: 26307
post_title: Server Logs
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/server-logs/
published: true
post_date: 2018-04-24 10:59:55
---
Server logs for Trellis sites can be found at `/srv/www/example.com/logs/`:

* `/srv/www/example.com/logs/access.log`
* `/srv/www/example.com/logs/error.log`

Any server 500 errors or white screen issues should be debugged by viewing the error logs in the `/srv/www/example.com/logs/` directory. 

Trellis uses the [ansible-logrotate](https://github.com/nickhammond/ansible-logrotate) role to install and configure logrotate for sites and can be configured by editing [`group_vars/all/logrotate.yml`](https://github.com/roots/trellis/blob/master/group_vars/all/logrotate.yml).