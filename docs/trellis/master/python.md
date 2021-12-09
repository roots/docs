---
description: Guide to installing and using Python with Trellis
---

# Python and Trellis

Trellis' main requirement is Python because Ansible is built with Python.
This page documents the best way to install Python on your computer, how to
manage Python package dependencies (like Ansible), common issues to avoid, and
using trellis-cli to make your life easier.

When dealing with Trellis and Python, there's three key points:

1. Make sure you have a stable version of Python and pip installed
2. Use [trellis-cli](https://github.com/roots/trellis-cli) since it handles
   dependencies for you
3. **Never** use `sudo` when installing packages with `pip`

## Python 2 vs Python 3

While Python 2 reached end-of-life in 2019, it's still supported in Trellis for
now. However, we do *recommend using Python 3* whenever possible. And since
Python 3 is mostly the default version now, there's not many reasons to still
use Python 2.

Unlike most languages that have a single version installed at a time, and only
offer an "unversioned" single binary path (such as just `node`), Python can be
more confusing because some operating systems treat them separately.

Regardless of the OS, it's still possible to symlink `python3` to `python` for
convenience as well.

## Installing Python

### macOS

Newer versions of macOS like Monterey and Big Sur come with both versions 2 and
3. Annoyingly though, the unversioned `python` is 2.7x while `python3` needs to
be explicitly used for Python 3.

While using the system Python on macOS should work fine, the main downside is
that the versions are only updated when macOS itself has a new major version.

If you want to have more control over Python versions, we recommend using a tool
like [pyenv](https://github.com/pyenv/pyenv) or [asdf](https://github.com/danhper/asdf-python)
to install specific versions globally (or even per project if that's needed).

We **do not recommend** installing Python from Homebrew. This might be
surprising since it goes against most guides and recommendations but we believe
using Python from Homebrew will cause more problems long-term due to its newer 
"feature" of auto-upgrading packaages as described in [this article](https://justinmayer.com/posts/homebrew-python-is-not-for-you/).

After Python is installed and working, you'll also need to ensure pip is installed. If `pip` or `pip3` does not exist, it can be installed like this:

```bash
sudo easy_install pip
```

### Ubuntu

Ubuntu 20.04 comes default with Python 3 available as `python3`
only. There's no "unversioned" `python`. If you want to install Python 2, it
will be installed as `python2`.

The [`python-is-python3`])(https://packages.ubuntu.com/focal/python-is-python3) package
exists solely as an easy way to symlink `/usr/bin/python` to `python3`.

```bash
sudo apt-get install -y python3 python-is-python3 python3-pip
```

### Windows

Roots [recommends using WSL](https://roots.io/docs/getting-started/windows/)
when using Windows. Since WSL uses Ubuntu, follow the [Ubuntu section](#ubuntu) above.

## Installing and managing dependencies

Once you have Python working, the next step is ensuring you can install Trellis'
dependencies. They are always declared in the
[`requirements.txt`](https://github.com/roots/trellis/blob/master/requirements.txt) file,
but mainly this involves installing Ansible.

[pip](https://pypi.org/project/pip/) is Python's package installer and what
Trellis recommends using. But this is where trellis-cli comes in!

### trellis-cli and Virtualenv
We **strongly recommend** using trellis-cli whenever possible since it will make
your life managing dependencies and installing Ansible much easier.

trellis-cli uses [Virtualenv](https://virtualenv.pypa.io) to manage dependencies _per_ project.
It creates a "virtual environment" within each Trellis project so the
dependencies are completely isolated. This allows different projects to have
different versions of Ansible installed for example.

trellis-cli automatically creates a virtualenv and installs dependencies via pip
at two points:

1. when a new project is created with `trellis new`
2. when `trellis init` is run for an existing project

Once the virtualenv exists, all other `trellis` commands automatically use it.
This means running `trellis deploy production` will activate the virtualenv
(within the CLI, for the lifetime of the command) and use the version of Ansible
within the virtual environment.

When using trellis-cli, you should almost never have to use `pip` manually
yourself. There's a more advanced Virtualenv integration offered as well. See
the [README](https://github.com/roots/trellis-cli#virtualenv) for more details.

### Manually using pip
If you do need to run `pip` manually to install Ansible, here's a few tips:

1. **Never** use `sudo` with `pip`. It will only cause problems.
2. Make sure you're using the version of pip that corresponds to your Python
   version. If you're using Python 3, then you might need to use `pip3`.
3. Avoid installing `ansible` directly with pip. Instead run `pip install -r requirements.txt` within a Trellis project to ensure you're getting a supported version of Ansible.
