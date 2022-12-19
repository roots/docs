---
description: Using Trellis with a theme built on Sage.
---

# Sage Integration
Trellis is designed to be theme-agnostic and is not tied to Roots' Sage theme at all.
That doesn't mean it's hard though; all that's needed is a way to compile assets.


## Compiling production theme assets
Sage, like many WordPress themes now, requires a step during deploys to compile production assets.

Trellis includes an *example* `build-before` deploy hook designed to work with Sage. See [`deploy-hooks/build-before.yml`](https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml).
For Sage users, simply uncomment that built-in example hook file and deploy away. Assets will be compiled *locally* and then copied to the remote server.

## Other themes
The Sage example deploy hook can also serve as s blueprint for many other themes that need to run an `npm` or `yarn` command for compiling assets.

## NVM
If you use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions for running themes locally, the easiest way to use it is via `$NVM_DIR/nvm-exec`.

Example:
```yaml
- name: Install npm dependencies
  command: $NVM_DIR/nvm-exec npm install
  delegate_to: localhost
  args:
   chdir: "{{ project_local_path }}/web/app/themes/mytheme"

- name: Compile assets for production
  command: $NVM_DIR/nvm-exec npm run build:production
  delegate_to: localhost
  args:
   chdir: "{{ project_local_path }}/web/app/themes/mytheme"
```
