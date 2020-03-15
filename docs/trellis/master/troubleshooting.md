# Troubleshooting

## Debugging

Golden rule to debugging any failed command with Ansible:

1. Read the output logs and find the failed task.
2. Read through error message for the exact issue.
3. Re-run the command in `verbose` mode `ansible-playbook deploy.yml -vvvv -e "site=<domain> env=<environment>"` if necessary to get more details.
4. SSH into your server and manually run the command where Ansible failed.

Example: if a Git clone task failed during deploys, then SSH into the server as the `web` user (which is what deploys use) and run the manual command such as `git clone <repo>`. This will give you a much better clue as to what's going wrong.

<hr>

## ERR_EMPTY_RESPONSE

If you are running into `ERR_EMPTY_RESPONSE` when trying to access your local development site:

Try:

```bash
$ SKIP_GALAXY=true ANSIBLE_TAGS=wordpress vagrant reload --provision
```

Then run:

```bash
$ vagrant hostmanager
```


## Unresponsive machines or 404s

Halt all VMs and remove VM-related entries from your `/etc/hosts` file, particularly entries similar to the example below. You may want to backup the hosts file before editing.

```bash
192.168.50.5  example.test  # VAGRANT: 22c9...
```

Then `vagrant up` any VMs you need running and double-check that appropriate entries appear in your hosts file.

A tidy hosts file would reduce the likelihood of 404s, although it's not a guarantee.

<hr>

## Sequel Pro permission denied error

Are you getting `Permission denied (publickey)` when trying to connect to your Vagrant box with Sequel Pro?

Use the insecure private key inside the `.vagrant` folder. [See thread on Roots Discourse](https://discourse.roots.io/t/sequel-pro-ssh-to-vagrant/4683/26).

<hr>

## Let's Encrypt SSL certificates

See [Troubleshooting Let's Encrypt](ssl.md#troubleshooting-lets-encrypt).

<hr>

## There was an error while executing `VBoxManage`, a CLI used by Vagrant

Error message looks something like:

```bash
Command: ["modifyvm", "5a403eac-5619-4020-ba14-b72fd8d5b530", "--natpf1", "delete", "ssh"]

Stderr: VBoxManage: error: An unexpected process (PID=0x00003FAA) has tried to lock the machine 'trellis-playbooks', while only the process started by LaunchVMProcess (PID=0x00003C31) is allowed
VBoxManage: error: Details: code E_ACCESSDENIED (0x80070005), component Machine, interface IMachine, callee nsISupports
VBoxManage: error: Context: "LockMachine(a->session, LockType_Write)" at line 471 of file VBoxManageModifyVM.cpp
```

The solution is to open up your Activity Monitor and quit any `vagrant` or `ruby` processes.

<hr>

## Composer install: host key verification failed

Sometimes a task that installs Composer dependencies gives an error `host key verification failed`. This can happen when the `known_hosts` file on your Vagrant VM or remote host is missing a key for one of the host `repositories` in the related `composer.json` file. Ensure that each host from `composer.json` has a key listed in `group_vars/all/known_hosts.yml` then try your `vagrant provision` or `./bin/deploy.sh` command again.

<hr>

## SSH connections

If you have trouble with SSH connections to your server, consider the tips below. You may also want to review information about [disabling `root` login](security.md#locking-down-root) and how to configure your server's SSH settings via the [`sshd` role](https://github.com/roots/trellis/tree/master/roles/sshd).

### SSH keys

- [Generating a new SSH key and adding it to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
- [Testing your SSH connection](https://help.github.com/articles/testing-your-ssh-connection/)
- [Your local `ssh-agent` must be running](https://developer.github.com/guides/using-ssh-agent-forwarding/#your-local-ssh-agent-must-be-running) (macOS users: remember to run `ssh-add -K`)
- How to designate [SSH keys](ssh-keys.md) in Trellis

SSH will automatically look for and try a default set of SSH keys, along with keys loaded in your `ssh-agent`. However, the SSH server will only let your SSH client try a limited number of keys before disconnecting (default: 6). If you have many SSH keys and the correct key is not being selected, you can force your SSH client to try only the correct key. Add this to your `~/.ssh/config` (with the correct path to your key):

```bash
Host example.com
  IdentitiesOnly yes
  IdentityFile /users/username/.ssh/id_rsa
```

### Host key change

Your server may occasionally offer a different host key than what your local machine has on record in `known_hosts`. This could happen if you rebuild your server or if the `sshd` role configures your server to offer a stronger key.

**Example 1**

```bash
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

```bash
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

```bash
$ ssh-keygen -R 12.34.56.78
```

Then try your Trellis playbook or SSH connection again.

If the host key change is unexpected, cautiously consider why the host identification may have changed and whether you may be victim to a man-in-the-middle attack.

### `git clone` or `composer install` task hangs or fails

The `sshd` role may cause your server's SSH client to request stronger host keys from hosts of git repos or composer packages. This could create the [host-key-change](#host-key-change) problem, but this time on your server instead of your local machine. Follow the same remediation steps, but on the server.

Similarly, the `sshd` role may cause your server's SSH client to require stronger [ciphers, kex algorithms, and MACs](https://github.com/roots/trellis/tree/master/roles/sshd#ciphers-kexalgorithms-and-macs) than previously. If your `git clone` or `composer install` connections involve older systems that do not support the stronger protocols, you may need to add more options to `ssh_ciphers_extra`, `ssh_kex_algorithms_extra`, or `ssh_macs_extra`.

### Verbose output

SSH connection issues are often difficult to resolve without verbose output. Use the `-vvvv` option with your `ansible-playbook` command:

```bash
$ ansible-playbook server.yml -e env=production -vvvv
```

You may also use `-v`, `-vv`, and `-vvv` with manual SSH connections:

```bash
$ ssh -v root@12.34.56.78
```

### Manual SSH

If your `ansible-playbook` command is failing its SSH connection, it can be helpful to try a manual SSH connection to narrow down the problem. If manual SSH fails, try again with `-v` for [verbose output](#verbose-output).

```bash
$ ssh -v root@12.34.56.78
```

### `Ciphers`, `KexAlgorithms`, or `MACs`

The `sshd` role will most likely cause your SSH server to discontinue using some older and weaker protocols. If your connections involve older systems that do not support the stronger protocols configured by the `sshd` role, see [`Ciphers`, `KexAlgorithms`, and `MACs`](https://github.com/roots/trellis/tree/master/roles/sshd#ciphers-kexalgorithms-and-macs) for how to add back in any protocols you need.
