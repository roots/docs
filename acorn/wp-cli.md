---
description: A list of available WP-CLI commands provided by Acorn. Similar to Laravel's `artisan` CLI.
authors:
  - alwaysblank
  - ben
  - QWp6t
---

# WP-CLI

Acorn comes with WP-CLI commands similar to Laravel's `artisan` CLI.

## Available commands

* `wp acorn clear-compiled` — Remove the compiled class file
* `wp acorn completion` — Dump the shell completion script
* `wp acorn env` — Display the current framework environment
* `wp acorn help` — Display help for a command
* `wp acorn list` — List commands
* `wp acorn optimize` — Cache the framework bootstrap files
<br><br>
* `wp acorn acorn-init` — Initializes required paths in the base directory
<br><br>
* `wp acorn config:cache` — Create a cache file for faster configuration loading
* `wp acorn config:clear` — Remove the configuration cache file
<br><br>
* `wp acorn optimize:clear` — Remove the cached bootstrap files
<br><br>
* `wp acorn make:command` — Create a new Artisan command
* `wp acorn make:component` — Create a new view component class
* `wp acorn make:composer` — Create a new view composer class
* `wp acorn make:provider` — Create a new service provider class
<br><br>
* `wp acorn package:discover` — Rebuild the cached package manifest
<br><br>
* `wp acorn vendor:publish` — Publish any publishable assets from vendor packages
<br><br>
* `wp acorn view:cache` — Compile all of the application's Blade templates
* `wp acorn view:clear` — Clear all compiled view files
