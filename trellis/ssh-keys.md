---
ID: 6150
post_title: SSH Keys
author: Ben Word
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/ssh-keys/
published: true
post_date: 2015-09-03 17:44:44
---
Each Trellis playbook uses a specific SSH user to connect to your remote machines (or guest VM).

<table class="table table-bordered">
  <thead>
    <tr>
      <th></th>
      <th>Default User</th>
      <th>User Variable</th>
      <th>Task</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong><code>dev.yml</code></strong></td>
      <td><code>vagrant</code></td>
      <td>-</td>
      <td>create development VMs</td>
    </tr>
    <tr>
      <td><strong><code>server.yml</code></strong></td>
      <td><code>root</code> or <code>admin</code></td>
      <td><code>admin_user</code></td>
      <td>provision remote servers</td>
    </tr>
    <tr>
      <td><strong><code>deploy.yml</code></strong></td>
      <td><code>web</code></td>
      <td><code>web_user</code></td>
      <td>deploy WordPress sites</td>
    </tr>
  </tbody>
</table>

This page reviews how to configure SSH users for the `server.yml` and `deploy.yml` playbooks. If you are looking for general SSH configuration options, see the [`sshd` role `README.md`](https://github.com/roots/trellis/tree/master/roles/sshd) .

If you will be the only person provisioning and deploying, and your SSH public key is available at `~/.ssh/id_rsa.pub`, you will probably not need to modify the Trellis defaults for `users`.

## The `users` Dictionary
While provisioning, `server.yml` will create the `users` defined in `group_vars/all/users.yml`, assigning their `groups` and public SSH `keys`. The example below defines a single user.

```yaml
users:
  - name: username
    groups:
      - primary_group
      - other_group
    keys:
      - "{{ lookup('file', '/path/to/local/file') }}"
      - https://github.com/username.keys
```
Specify the user's primary group first in the list in the list of `groups`. List `keys` for anyone who will need to make an SSH connection as that user. `server.yml` can `lookup` keys in local files or retrieve them from remote host URLs. Here's an example of my public keys I have hosted on GitHub: https://github.com/swalkinshaw.keys

If needed, you may redefine the `users` in any given `group_vars` environment file, overriding the `users` list in `group_vars/all/users.yml`.

## `server.yml`: `root` or `admin`
We assume that when you first create your server you've already added your SSH key to the `root` account. Digital Ocean will add this for you when you create a droplet. If you don't want to use an SSH key, you will need to add the `--ask-pass` option each time you run the `server.yml` playbook.

`server.yml` will try to connect to your server as `root`. If the connection fails, `server.yml` will try to connect as the `admin_user` defined in `group_vars/all/users.yml` (default `admin`). If `root` login will be disabled on your server, it is critical for the `admin_user` to be defined in your list of `users`, with `sudo` first in this user's list of groups (see the [Security docs](https://roots.io/trellis/docs/security/)). The default definition for the `admin_user` is shown below.

```yaml
users:
  - name: "{{ admin_user }}"
    groups:
      - sudo
    keys:
      - "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
      # - https://github.com/username.keys

admin_user: admin
```

**Notes**
* You may enable colleagues to run `server.yml` by adding their public SSH `keys` to the `admin_user`.
* If your hosting provider disables root but provides a default user such as `ubuntu`, specify `admin_user: ubuntu`.
* If you are trying to override the dynamic selection of `root` or `admin_user`, preferring to manually specify the Ansible remote user, review notes in the section [remote user variable precedence](https://github.com/roots/trellis/pull/274#issuecomment-121455761).

## `deploy.yml`: `web`

The `deploy.yml` playbook deploys your site while connecting as the `web_user` (default `web`) because this user owns files in the web root, the deploy destination. The `web_group` must come first in the list of groups for the web_user. The default definition for the `web_user` is shown below.

```yaml
web_user: web
web_group: www-data
⋮
users:
  - name: "{{ web_user }}"
    groups:
      - "{{ web_group }}"
    keys:
      - "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
      # - https://github.com/username.keys
```

You may enable colleagues to run `deploy.yml` by adding their public SSH `keys` to the `web_user`. See the example below.

## Example `users`

The example below adds the SSH keys of GitHub users `swalkinshaw` and `retlehs` to `~/.ssh/authorized_keys` for `admin_user`. This enables `swalkinshaw` and `retlehs` to run `server.yml` to provision the servers. The example also adds their keys, and the keys of GitHub user `austinpray`, to `web_user`. This enables each of them to run `deploy.yml` to deploy sites.

```yaml
users:
  - name: "{{ web_user }}"
    groups:
      - "{{ web_group }}"
    keys:
      - https://github.com/swalkinshaw.keys
      - https://github.com/retlehs.keys
      - https://github.com/austinpray.keys
  - name: "{{ admin_user }}"
    groups:
      - sudo
    keys:
      - https://github.com/swalkinshaw.keys
      - https://github.com/retlehs.keys
  - name: another_user
    groups:
      - some_group
      - some_other_group
    keys:
      - https://github.com/swalkinshaw.keys
```

The example above also demonstrates the option of creating `another_user` whose primary group is `some_group`, but who is also in `some_other_group`, and who has public SSH keys for `swalkinshaw`.

**Note**
* Removing a key and re-provisioning the server does not remove the key in the `authorized_keys` file.

## Cloning remote repo using SSH agent forwarding

All the SSH connections discussed above apply to Trellis connecting from your local machine to your server. It is a different type of connection, however, when Trellis clones a remote private repo during deployment. In this case, your remote server is allowed to forward your local machine's SSH credentials to the remote repo to authorize the connection.

The Trellis `ansible.cfg` file enables this SSH agent forwarding with `ssh_args = -o ForwardAgent=yes`. You should not need auth tokens or private keys for the `web_user`. If you run into trouble cloning a remote repo during deploy, see [Using SSH agent forwarding](https://developer.github.com/guides/using-ssh-agent-forwarding/) for tips and troubleshooting.

### macOS/OS X users

Remember to import your SSH key password into Keychain by running:

```sh
ssh-add -K
```
