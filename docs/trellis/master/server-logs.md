# Server Logs

Server logs for Trellis sites can be found at `/srv/www/example.com/logs/`:

- `/srv/www/example.com/logs/access.log`
- `/srv/www/example.com/logs/error.log`

Any server 500 errors or white screen issues should be debugged by viewing the error logs in the `/srv/www/example.com/logs/` directory. 

Trellis uses the [ansible-logrotate](https://github.com/nickhammond/ansible-logrotate) role to install and configure logrotate for sites and can be configured by editing [`group_vars/all/logrotate.yml`](https://github.com/roots/trellis/blob/master/group_vars/all/logrotate.yml).
