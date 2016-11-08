---
ID: 17270
post_title: Debugging PHP
author: Nathaniel Schweinberg
post_date: 2016-11-07 14:25:43
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/debugging-php/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
## Debugging PHP

There are many ways to go about debugging a PHP application, and one of the more effective ways is using a debugger. One of the tools in the PHP community to go about doing this is [Xdebug](https://en.wikipedia.org/wiki/Xdebug). Xdebug is a tool that allows you to see _into_ the state of your application.

### What is Xdebug?

Xdebug is a couple things:

- It's a tool for debugging and profiling PHP applications and scripts
- It's a tool to interactively debug running code
- It's a tool able to measure the performance of your application

Xdebug gives you all sorts of visibility into the internals of your application, like what variable values are at a certain point in time, what functions are taking a long time to execute, as well as what the return values of functions are. It gives you the ability to step through the execution of your application function by function, or even line by line if we really want to.

To change those variables, it's recommended you set them in `group_vars/<environment>/php.yml`.

### Installation

Trellis is configured with Xdebug and ready to rock out of the box in development. All you have to do is select a compatible debugger. Xdebug is designed to be used with a DBGP-compatible debugger in order to interface with Xdebug on your site. [PHPStorm](https://www.jetbrains.com/phpstorm/) comes with support for this out of the box and [Sublime Text](https://github.com/martomo/SublimeTextXdebug) and [Vim](https://github.com/joonty/vdebug) have plugins available.

### Configuration

The variables used in the `roles/xdebug` role directly correlate to the configuration options used by Xdebug itself. For example, Xdebug has the option `xdebug.scream` to disable PHP error suppression using the `@` symbol before function calls. The corresponding Trellis variable would be `xdebug_scream`.

You can see all the available configuration options in `roles/xdebug/defaults/main.yml` and read about how they're used in Xdebug on their [documentation page](https://xdebug.org/docs/all_settings). Trellis ships with pretty sane defaults, but this gives you the option to override if necessary.

### Using Xdebug in Production

While we default to installing Xdebug in development, installing it in any other environment is "opt-in." **It is not recommended to use Xdebug in production**, but it _can_ be extremely using in debugging production-like environments. For example, if there's an issue you're encountering in Production, but cannot reproduce in Development (aka, your Vagrant environment), it's likely the problem lies with something specific to your VPS provider. Duplicating your production environment and sanitizing the data using something like [WP Hammer](https://github.com/10up/wp-hammer) will allow you to debug your production environmment without affecting it. This is where `bin/xdebug-tunnel.sh` comes in.

### `bin/xdebug-tunnel.sh`: Xdebug + SSH Tunnels

Xdebug gives a lot of visibility into your application that you do not want to give to anyone. Because of this, we want to restrict access to who is allowed to initiate a debugging session. The way we go about doing that is by creating a remote SSH tunnel from the VPS to our local computer. `bin/xdebug-tunnel.sh` makes it trivial to set up the connection by installing Xdebug if it is not already on the remote host as well as establishing the SSH tunnel between your server and your computer.

By default, Trellis configures Xdebug to look for a debugging session on the server's localhost port 9000:

```
# roles/xdebug/defaults/main.yml
xdebug_remote_host: localhost
xdebug_remote_port: 9000
```

Because our debugger is located on our computer and not the server, Xdebug would attempt to communicate with `localhost:9000` unsuccessfully and proceed with the request as normal. Using `bin/xdebug-tunnel.sh` creates a tunnel from the server's `localhost:9000` to your computer's `localhost:9000`, bridging the gap and allowing the two to communicate.

### Establishing the tunnel

Provided this hosts file:
```
# let's pretend hosts/prodlike

some_inventory_hostname ansible_ssh_host=12.34.56.78

[prodlike]
some_inventory_hostname

[web]
some_inventory_hostname
```

We would execute:

```
./bin/xdebug-tunnel.sh open some_inventory_hostname
```

This script runs the `xdebug-tunnel.yml` playbook with the necessary variables to install Xdebug on the environment as well as establish the tunnel.

To close the tunnel, as well as disable Xdebug, run:

```
./bin/xdebug-tunnel.sh close some_inventory_hostname
```

This will remove the `/etc/php/7.0/fpm/conf.d/20-xdebug.ini` symlink, effectively disabling it for that environment while leaving xdebug installed. It also closes the SSH connection.

If you don't use inventory aliases in your host files, you can also use an ip address directly instead of the alias. For example, if your host file looks like this:

```
[prodlike]
12.34.56.78

[web]
12.34.56.78
```

You can do this:

```
./bin/xdebug-tunnel.sh open 12.34.56.78
```

_You do have to be consistent though._ If you open the tunnel using an alias and close it using an ip address, it'll yell at you because the tunnel socket is created using that passed parameter because it creates files matching the following pattern:

```
/tmp/trellis-xdebug-{{ provided host }}
```
