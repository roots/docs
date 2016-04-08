Trellis expands your control over Ansible's CLI output in terms of format and verbosity. The options below may be applied via `ansible.cfg` or via environment variables. When an environment variable is set, it will take priority.

## Output format
### Custom output
* Example: `stdout_callback = output`
* Under `[defaults]` in `ansible.cfg`
* To disable: Comment out or remove `stdout_callback = output`
* Default: Enabled
* Reference: [`stdout_callback`](http://docs.ansible.com/ansible/intro_configuration.html#stdout-callback) in Ansible docs

When custom output is enabled, Trellis will attempt to pretty print Ansible's CLI output. This mostly consists of extracting values such as`msg` and `stdout`, interpretting `\n` line breaks, wrapping text to the `wrap_width` described below, and reducing output verbosity according to the options described below.

### `wrap_width`
* Example: `wrap_width = 80`
* Under `[trellis_output]` in `ansible.cfg`
* Default if omitted: `80`
* Optional environment variable: `TRELLIS_WRAP_WIDTH`

`wrap_width` controls the textwrap width applied to the CLI output (number of columns).

## Output verbosity
Trellis adds a few custom options to minimize Ansible output. The optional environment variables have priority over parameters defined in `ansible.cfg`.

If your command includes a verbosity option of `-v` or greater, the play will run as though these parameters are set to their more verbose setting. However, the `display_skipped_hosts` parameter will be unaffected because it is an Ansible core parameter, not controlled by Trellis.

### `display_include_tasks`
* Example: `display_include_tasks = False`
* Under `[trellis_output]` in `ansible.cfg`
* Default if omitted: `False`
* Optional environment variable: `TRELLIS_DISPLAY_INCLUDE_TASKS`

```
# output when display_include_tasks = True
TASK [deploy : include] ********************************************************
included: /path/example.com/ansible/roles/deploy/tasks/initialize.yml for HOST

# all include task output is omitted when display_include_tasks = False

```

### `display_skipped_items`
* Example: `display_skipped_items = False`
* Under `[trellis_output]` in `ansible.cfg`
* Default if omitted: `False`
* Optional environment variable: `TRELLIS_DISPLAY_SKIPPED_ITEMS`

```
# output when display_skipped_items = True
TASK [Demonstrate display_skipped_items -- in ansible.cfg trellis_output] ******
changed: [localhost] => (item={u'msg': u'Foo message', u'name': u'Foo'})
skipping: [localhost] => (item={u'msg': u'Displays only when display_skipped_items = True', u'name': u'Bar'})

# output when display_skipped_items = False
TASK [Demonstrate display_skipped_items -- in ansible.cfg trellis_output] ******
changed: [localhost] => (item={u'msg': u'Foo message', u'name': u'Foo'})

```

### `display_skipped_hosts`
* Example: `display_skipped_hosts = False`
* Under `[defaults]` in `ansible.cfg`
* Default if omitted: `True`
* Optional environment variable: `DISPLAY_SKIPPED_HOSTS`
* Reference: [`display_skipped_hosts`](http://docs.ansible.com/ansible/intro_configuration.html#display-skipped-hosts) in Ansible docs

```
# output when display_skipped_hosts = True
TASK [Demonstrate display_skipped_hosts -- in ansible.cfg defaults] ************
skipping: [localhost]

# output when display_skipped_hosts = False
TASK [Demonstrate display_skipped_hosts -- in ansible.cfg defaults] ************

```

### `truncate_items`
* Example: `truncate_items = True`
* Under `[trellis_output]` in `ansible.cfg`
* Default if omitted: `True`
* Optional environment variable: `TRELLIS_TRUNCATE_ITEMS`

Tasks that loop over items (e.g., `with_items` and `with_dict`) typically print the content of each item. The output can look rather cluttered when the printed items contain a lot of content. The `truncate_items` option will truncate each item's content to `wrap_width` or to just the item key if the item is a dict.

```
# output when truncate_items = False
TASK [Demonstrate truncate_items  -- in ansible.cfg trellis_output] ************
ok: [localhost] => (item={u'msg': u'This item object will only display in all its longline glory if `truncate_items = False` or if the item fails', u'name': u'Foo'})
ok: [localhost] => (item={'value': {u'multisite': {u'enabled': False}, u'cache': {u'enabled': False}, u'repo': u'git@github.com:roots/bedrock.git', u'ssl': {u'enabled': False, u'provider': u'letsencrypt'}, u'local_path': u'../site', u'branch': u'master', u'site_hosts': [u'example.com']}, 'key': u'example.com'})

# output when truncate_items = True
TASK [Demonstrate truncate_items  -- in ansible.cfg trellis_output] ************
ok: [localhost] => (item={u'msg': u'This item object will only display in al...)
ok: [localhost] => (item=example.com)
```

Exceptions
* On item failed: Item output will display in full for failed items, for the sake of easier debugging.
* On item skipped: Item output will be completely absent if the item skips and `display_skipped_items = True` or if a host skips and `display_skipped_hosts = True`.
