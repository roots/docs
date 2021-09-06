---
description: Homebrew installs trellis-cli's shell completion automatically by default. If shell completions aren't working, or you installed manually not using Homebrew, you'll need to install the completions manually.
---

# Autocompletes

Homebrew installs trellis-cli's shell completion automatically by default. If shell completions aren't working, or you installed manually not using Homebrew, you'll need to install the completions manually.

To use the trellis-cli's autocomplete via Homebrew's shell completion:

Follow [Homebrew's install instructions](https://docs.brew.sh/Shell-Completion).

::: tip Note
For zsh, as the instructions mention, be sure compinit is autoloaded and called, either explicitly or via a framework like oh-my-zsh.
:::

Once Shell-Completion is installed, run the following:

```bash
brew reinstall trellis-cli
```

To install shell completions manually, run the following:

```bash
trellis --autocomplete-install
```

This should modify your `.bash_profile`, `.zshrc` or similar.
