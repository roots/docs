---
description: Use Xdebug in Trellis to debug your PHP. Trellis is configured with Xdebug and ready to rock out of the box in development.
---

# Debugging PHP

There are many ways to go about debugging a PHP application, and one of the most effective ways is using a debugger. One of the most powerful tools in the PHP community to go about doing this is [Xdebug](https://en.wikipedia.org/wiki/Xdebug).

## What is Xdebug?

Xdebug enables you to do the following:

- debug and profile PHP applications and scripts
- interactively debug running code
- measure the performance of your application
- see the state of your application at a point in time

Xdebug gives you all sorts of visibility into the internals of your application, like what variable values are at a certain point in time, what functions are taking a long time to execute, as well as what the return values of functions are. It gives you the ability to step through the execution of your application function by function, or even line by line if you really want to.

## Installation

Trellis is configured with Xdebug and ready to rock out of the box in development. All you have to do is select a compatible debugger. Xdebug is designed to be used with a DBGP-compatible debugger in order to interface with Xdebug on your site. [PHPStorm](https://www.jetbrains.com/phpstorm/) comes with support for this out of the box and [Sublime Text](https://github.com/martomo/SublimeTextXdebug), [Visual Studio Code](https://github.com/felixfbecker/vscode-php-debug), and [Vim](https://github.com/joonty/vdebug) have plugins available.

## Configuration

The variables used in the `roles/xdebug` role directly correlate to the configuration options used by Xdebug itself. For example, Xdebug has the option `xdebug.scream` to disable PHP error suppression using the `@` symbol before function calls. The corresponding Trellis variable would be `xdebug_scream`.

You can see all the available configuration options in `roles/xdebug/defaults/main.yml` and read about how they're used in Xdebug on their [documentation page](https://xdebug.org/docs/all_settings). Trellis ships with pretty sane defaults, but this gives you the option to override if necessary. To change those variables, it's recommended you set them in `group_vars/<environment>/php.yml`.

## Using Xdebug in production

While we default to installing Xdebug in development, installing it in any other environment is "opt-in." **It is not recommended to use Xdebug in production**, but it _can_ be extremely useful in debugging production-like environments.

For example, if there's an issue you're encountering in Production, but cannot reproduce in Development (aka, your Vagrant environment), it's likely the problem lies with something specific to your VPS provider.

Duplicating your production environment and sanitizing the data using something like [WP Hammer](https://github.com/10up/wp-hammer) will allow you to debug your production environmment without affecting it. This is where `bin/xdebug-tunnel.sh` comes in.

### `bin/xdebug-tunnel.sh`: Xdebug + SSH tunnels

Xdebug gives a lot of visibility into your application that you do not want to give to anyone. Because of this, you want to restrict access to who is allowed to initiate a debugging session.

The way we go about doing that is by creating a remote SSH tunnel from the VPS to your local computer. `bin/xdebug-tunnel.sh` makes it trivial to set up the connection by installing Xdebug if it is not already on the remote host as well as establishing the SSH tunnel between your server and your computer.

By default, Trellis configures Xdebug to look for a debugging session on the server's localhost port 9000:

```yml
# roles/xdebug/defaults/main.yml
xdebug_remote_host: localhost
xdebug_remote_port: 9000
```

Because your debugger is located on your computer and not the server, Xdebug would attempt to communicate with `localhost:9000` unsuccessfully and proceed with the request as normal. Using `bin/xdebug-tunnel.sh` creates a tunnel from the server's `localhost:9000` to your computer's `localhost:9000`, bridging the gap and allowing the two to communicate.

### Establishing the tunnel

First, let's look at the command we'll be using to create the tunnel:

```bash
$ ./bin/xdebug-tunnel.sh <action> <host>
```

The argument `action` can be `open` or `close` and `host` is the hostname, IP, or inventory alias in your `hosts/<environment>` file.

Provided this hosts file:

```
# let's pretend hosts/staging

some_inventory_hostname ansible_ssh_host=12.34.56.78

[staging]
some_inventory_hostname

[web]
some_inventory_hostname
```

You would execute:

```bash
$ ./bin/xdebug-tunnel.sh open some_inventory_hostname
```

This script runs the `xdebug-tunnel.yml` playbook with the necessary variables to install Xdebug on the environment as well as establish the tunnel.

To close the tunnel, as well as disable Xdebug, run:

```bash
$ ./bin/xdebug-tunnel.sh close some_inventory_hostname
```

This will remove the `/etc/php/7.0/fpm/conf.d/20-xdebug.ini` symlink, effectively disabling it for that environment while leaving xdebug installed. It also closes the SSH connection.

If you don't use inventory aliases in your host files, you can also use an ip address directly instead of the alias. For example, if your hosts file looks like this:

```
[staging]
12.34.56.78

[web]
12.34.56.78
```

You can do this:

```bash
$ ./bin/xdebug-tunnel.sh open 12.34.56.78
```

You must specify the `host` exactly the same when opening and closing the tunnel. It would cause an error to open the tunnel with a `host` of `some_inventory_hostname` then close with a host of `12.34.56.78`. This is because the tunnel socket is created using the host parameter you pass:

::: v-pre

```bash
/tmp/trellis-xdebug-{{ provided host }}
```

:::
