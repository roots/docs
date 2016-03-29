Trellis expands your control over Ansible's CLI ouput in terms of format, color, and verbosity.

## Output format
### `custom_output`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `True`
* Optional environment variable: `TRELLIS_CUSTOM_OUTPUT` (has priority over `trellis.cfg`)
* Can also be passed to commands via `--extra-vars custom_output=<true|false>` (has priority over all)
* Enables or disables all the settings in the `[output_custom]` section of `trellis.cfg`
* Does not affect the functioning of parameters in the `[output_general]` section of `trellis.cfg`

When `custom_output = True` in `trellis.cfg`, Trellis will attempt to pretty print Ansible's CLI output. This mostly consists of extracting values such as`msg` and `stdout`, interpretting `\n` line breaks, and wrapping text to a customizable width. If you are ever concerned some output is not displaying because of the features in `trellis.cfg`, you could run your command with extra vars to disable `custom_output` and with `-vvvv` to get a verbose and unprocessed output. For example:
```
ansible-playbook server.yml -e "env=production custom_output=false" -vvvv
```

### `wrap_width`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `77`
* Optional environment variable: `TRELLIS_WRAP_WIDTH` (has priority over `trellis.cfg`)
* Can also be passed to commands via `--extra-vars wrap_width=<integer>` (has priority over all)

Using extra vars, you could make the CLI output wrap width narrow for a single run of the playbook like this:
```
ansible-playbook server.yml -e "env=production wrap_width=50"
```

## Output color
Trellis applies Ansible's built-in colors to the output formatting described above. Your terminal emulator likely has options to further adjust these colors (e.g., to adjust contrast, etc.). The optional environment variables have priority over parameters defined in `trellis.cfg`.

### Color examples
To help you see all available colors (Ansible's [`codeCodes`](https://github.com/ansible/ansible/blob/devel/lib/ansible/utils/color.py)) and customize your color settings, copy the code below to a file named `output_colors.yml` in the root of your Trellis project and run `ansible-playbook output_colors.yml`. If desired, adjust colors in `trellis.cfg` and run the playbook again to see how the change looks.

```
- name: Colors
  gather_facts: false
  hosts: localhost
  tasks:
    - name: Show available Ansible colors and current color settings
      debug:
        msg: |
          AVAILABLE COLORS
          ----------------
          {{ ansible_colors }}

          CURRENT COLOR SETTINGS
          ----------------------
          {{ color_settings }}
    - name: Example fail message
      fail:
        msg: This demonstrates the header, footer, and horizontal rules.
```

### `colorize_code`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `True`
* Optional environment variable: `TRELLIS_COLORIZE_CODE`

When `colorize_code = TRUE`, ``code text wrapped in backticks`` will be colorized with `color_code` and the backticks will not display. When `colorize_code = False`, the code text will not be colorized and the backticks will display.

### `color_default`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: Ansible environment variable `COLOR_SKIP` (usually `cyan`)
* Optional environment variable: `TRELLIS_COLOR_DEFAULT`

### `color_ok`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: Ansible environment variable `COLOR_OK` (usually `green`)
* Optional environment variable: `TRELLIS_COLOR_OK`

### `color_error`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: Ansible environment variable `COLOR_ERROR` (usually `red`)
* Optional environment variable: `TRELLIS_COLOR_ERROR`

### `color_warn`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: Ansible environment variable `COLOR_WARN` (usually `bright purple`)
* Optional environment variable: `TRELLIS_COLOR_WARN`

### `color_code`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `normal`
* Optional environment variable: `TRELLIS_COLOR_CODE`

### `color_code_block`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: Ansible environment variable `COLOR_CHANGED` (usually `yellow`)
* Optional environment variable: `TRELLIS_COLOR_CODE_BLOCK`

### `color_hr`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `bright gray`
* Optional environment variable: `TRELLIS_COLOR_HR`

### `color_footer`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `bright gray`
* Optional environment variable: `TRELLIS_COLOR_FOOTER`

## Output verbosity
Trellis adds a few custom options to minimize Ansible output. The section below specifies options available through `ansible.cfg`, `trellis.cfg`, or environment variables. If your command includes a verbosity flag of `-vvv` or greater, the play will run as though all these parameters are `True` (except `display_skipped_hosts`, an Ansible parameter). The optional environment variables have priority over parameters defined in `trellis.cfg`).

### `display_skipped_hosts`
* Config file: `ansible.cfg` under `[defaults]`
* Default if omitted: `True`
* Optional environment variable: `DISPLAY_SKIPPED_HOSTS`

```
# output when display_skipped_hosts = True
TASK [Demonstrate display_skipped_hosts -- in ansible.cfg defaults] ************
skipping: [localhost]

# output when display_skipped_hosts = False
TASK [Demonstrate display_skipped_hosts -- in ansible.cfg defaults] ************

```

### `display_skipped_items`
* Config file: `trellis.cfg` under `[output_general]`
* Default if omitted: `False`
* Optional environment variable: `TRELLIS_DISPLAY_SKIPPED_ITEMS`

```
# output when display_skipped_items = True
TASK [Demonstrate display_skipped_items -- in trellis.cfg output_general] ******
changed: [localhost] => (item={u'msg': u'Foo message', u'name': u'Foo'})
skipping: [localhost] => (item={u'msg': u'Displays only when display_skipped_items = True', u'name': u'Bar'})

# output when display_skipped_items = False
TASK [Demonstrate display_skipped_items -- in trellis.cfg output_general] ******
changed: [localhost] => (item={u'msg': u'Foo message', u'name': u'Foo'})

```

### `display_ok_items`
* Config file: `trellis.cfg` under `[output_custom]`
* Default if omitted: `False`
* Optional environment variable: `TRELLIS_DISPLAY_OK_ITEMS`
* Note: This will only be in effect if `custom_output = True` in `trellis.cfg` under `[output_custom]` or if CLI `--extra-vars` include `custom_output=true`.

```
# output when display_ok_items = True
TASK [Demonstrate display_ok_items  -- in trellis.cfg output_custom] ***********
changed: [localhost] => (item={u'msg': u'This item object will only display if `display_ok_items = True`', u'name': u'Foo'})
changed: [localhost] => (item={u'msg': u'A very complex dict like `wordpress_sites` can look like clutter', u'name': u'Bar'})

# output when display_ok_items = False
TASK [Demonstrate display_ok_items  -- in trellis.cfg output_custom] ***********
changed: [localhost] => (item=suppressed)
changed: [localhost] => (item=suppressed)
```

### `display_include_tasks`
* Config file: `trellis.cfg` under `[output_general]`
* Default if omitted: `False`
* Optional environment variable: `TRELLIS_DISPLAY_INCLUDE_TASKS`

```
# output when display_include_tasks = True
TASK [deploy : include] ********************************************************
included: /path/example.com/ansible/roles/deploy/tasks/initialize.yml for HOST

# output when display_include_tasks = False

```

## Templating
When `custom_output = True` in `trellis.cfg`, Trellis will apply the colors from the "Color" section above to the following elements:
* Color strings
  * Color strings are strings wrapped in `C_ERROR`, `C_WARN`, `C_OK`, or `C_BOLD`.
  * You may nest color strings inside any element, including inside other color strings.
  * `C_BOLD` just prepends 'bright' onto the color name, or changes 'dark gray' to 'bright gray'. Thus `C_BOLD` will not work for colors whose names start with 'bright' or for the colors 'black', 'normal', or 'white'.
* Code strings
  * Code strings are `strings wrapped in backticks`.
  * You may only nest code strings inside code blocks.
* Code blocks
  * A code block is text fenced off before and after by a new line with ```.
  * You may not nest code blocks inside any other elements.
  * No text wrapping is applied to code blocks.

Although elements may nest, they may not overlap. A child element's opening and closing tags must both be inside the parent's opening and closing tags.
```
# Yes (C_ERROR is completely nested)
`Code string with C_ERRORerror valueC_ERROR completely nested`

# No (C_BOLD is not completely nested)
Text string C_OKwith C_BOLDoverlappedC_OK color stringsC_BOLD
```
