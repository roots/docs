---
date_modified: 2023-01-27 13:17
date_published: 2015-09-06 07:42
description: Troubleshoot Trellis installations with debugging tips for Ansible errors, solutions for unresponsive machines, and fixes for common provisioning problems.
title: Troubleshooting Common Trellis Issues
authors:
  - ben
  - fullyint
  - Log1x
  - swalkinshaw
  - dalepgrant
---

# Troubleshooting Common Trellis Issues

## Debugging

Golden rule to debugging any failed command with Ansible:

1. Read the output logs and find the failed task.
2. Read through error message for the exact issue.
3. Re-run the command in `verbose` mode `ansible-playbook deploy.yml -vvvv -e "site=<domain> env=<environment>"` if necessary to get more details.
4. SSH into your server and manually run the command where Ansible failed.

Example: if a Git clone task failed during deploys, then SSH into the server as the `web` user (which is what deploys use) and run the manual command such as `git clone <repo>`. This will give you a much better clue as to what's going wrong.

## Let's Encrypt SSL certificates

See [Troubleshooting Let's Encrypt](ssl.md#troubleshooting-let-s-encrypt).

## Composer install: host key verification failed

Sometimes a task that installs Composer dependencies gives an error `host key verification failed`. This can happen when the `known_hosts` file on your Lima VM or remote host is missing a key for one of the host `repositories` in the related `composer.json` file. Ensure that each host from `composer.json` has a key listed in `group_vars/all/known_hosts.yml` then try your `trellis provision development` or `trellis deploy` command again.

## SSH connections

If you have trouble with SSH connections to your server, consider the tips below. You may also want to review information about [disabling `root` login](security.md#locking-down-root) and how to configure your server's SSH settings via the [`sshd` role](https://github.com/roots/trellis/tree/master/roles/sshd).

### SSH keys

- [Generating a new SSH key and adding it to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
- [Testing your SSH connection](https://help.github.com/articles/testing-your-ssh-connection/)
- [Your local `ssh-agent` must be running](https://developer.github.com/guides/using-ssh-agent-forwarding/#your-local-ssh-agent-must-be-running) (macOS users: remember to run `ssh-add -K`)
- How to designate [SSH keys](ssh-keys.md) in Trellis

SSH will automatically look for and try a default set of SSH keys, along with keys loaded in your `ssh-agent`. However, the SSH server will only let your SSH client try a limited number of keys before disconnecting (default: 6). If you have many SSH keys and the correct key is not being selected, you can force your SSH client to try only the correct key. Add this to your `~/.ssh/config` (with the correct path to your key):

```plaintext
Host example.com
  IdentitiesOnly yes
  IdentityFile /users/username/.ssh/id_ed25519
```

### Host key change

Your server may occasionally offer a different host key than what your local machine has on record in `known_hosts`. This could happen if you rebuild your server or if the `sshd` role configures your server to offer a stronger key.

**Example 1**

```plaintext
TASK [setup] *******************************************************************
System info:
  Ansible 2.2.1.0; Darwin
  Trellis at "Add `apt_packages_custom` to customize Apt packages"
---------------------------------------------------
SSH Error: data could not be sent to the remote host. Make sure this host can
be reached over ssh
fatal: [xxx.xxx.xxx.xxx]: UNREACHABLE! => {"changed": false, "unreachable": true}
    to retry, use: --limit @/Users/yourname/sites/example.com/trellis/deploy.retry
```

**Example 2**

```plaintext
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:lv86hFykjn8pnOWE2WDWJo8Mzf6FTDMx/yWXOqzK5PU.
```

If this change in host keys is expected, then clear the old host key from your `known_hosts` by running the following command (with your real IP or host name).

```shell
$ ssh-keygen -R 12.34.56.78
```

Then try your Trellis playbook or SSH connection again.

If the host key change is unexpected, cautiously consider why the host identification may have changed and whether you may be victim to a man-in-the-middle attack.

### `git clone` or `composer install` task hangs or fails

The `sshd` role may cause your server's SSH client to request stronger host keys from hosts of git repos or composer packages. This could create the [host-key-change](#host-key-change) problem, but this time on your server instead of your local machine. Follow the same remediation steps, but on the server.

Similarly, the `sshd` role may cause your server's SSH client to require stronger [ciphers, kex algorithms, and MACs](https://github.com/roots/trellis/tree/master/roles/sshd#ciphers-kexalgorithms-and-macs) than previously. If your `git clone` or `composer install` connections involve older systems that do not support the stronger protocols, you may need to add more options to `ssh_ciphers_extra`, `ssh_kex_algorithms_extra`, or `ssh_macs_extra`.

### Verbose output

SSH connection issues are often difficult to resolve without verbose output. Use the `-vvvv` option with your `ansible-playbook` command:

```shell
$ ansible-playbook server.yml -e env=production -vvvv
```

You may also use `-v`, `-vv`, and `-vvv` with manual SSH connections:

```shell
$ ssh -v root@12.34.56.78
```

### Manual SSH

If your `ansible-playbook` command is failing its SSH connection, it can be helpful to try a manual SSH connection to narrow down the problem. If manual SSH fails, try again with `-v` for [verbose output](#verbose-output).

```shell
$ ssh -v root@12.34.56.78
```

### `Ciphers`, `KexAlgorithms`, or `MACs`

The `sshd` role will most likely cause your SSH server to discontinue using some older and weaker protocols. If your connections involve older systems that do not support the stronger protocols configured by the `sshd` role, see [`Ciphers`, `KexAlgorithms`, and `MACs`](https://github.com/roots/trellis/tree/master/roles/sshd#ciphers-kexalgorithms-and-macs) for how to add back in any protocols you need.

## APT sources
You may need to clean the APT sources to update a package, for example when [updating MariaDB mirrors](https://github.com/roots/trellis/issues/1575). You can set `apt_clean_sources: true` in `group_vars/all/main.yml` to run every provision, or to run this for one provision only, use:

```shell
$ trellis provision --extra-vars apt_clean_sources=true production
```
