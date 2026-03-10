---
date_modified: 2023-06-06 15:00
date_published: 2016-11-27 11:34
description: Access Trellis WordPress databases using GUI tools like Sequel Pro or TablePlus. Configure SSH tunnels for secure connections without phpMyAdmin.
title: WordPress Database Access with Trellis
authors:
  - ben
  - huubl
  - Log1x
  - MWDelaney
  - mZoo
  - swalkinshaw
  - TangRufus
---

# WordPress Database Access with Trellis

Accessing your databases with client software like [Sequel Pro](https://www.sequelpro.com/), [Sequel Ace](https://sequel-ace.com/) and [TablePlus](http://tableplus.com/) is straight forward with [`trellis-cli`](https://github.com/roots/trellis-cli). Run the following from any directory within your project:

## Sequel Pro (or Sequel Ace):

```shell
$ trellis db open --app=sequel-pro production example.com
```

## TablePlus

```shell
$ trellis db open --app=tableplus production example.com
```

::: tip SSH Password?
Because Trellis provisions remote environments to use [SSH keys](/trellis/docs/ssh-keys/) rather than passwords, the password field or prompt is left blank.
:::

## Connection details

To access database passwords, run:

```shell
$ trellis vault view <environment> | grep "db_password"
```

### Remote servers

* Connection type: SSH
* MySQL host: `127.0.0.1`
* Username: `example_com`
* Password: `example_dbpassword`
* SSH Host: `example.com`
* SSH User: `web`
