---
description: trellis-cli uses Virtualenv to manage dependencies such as Ansible which it automatically activates and uses when running any trellis command. 
---

There are many times you may want to run `ansible-playbook` or `pip` manually in your shell. To make this experience seamless, `trellis-cli` offers shell integration which automatically activates the Virtualenv when you enter a Trellis project, and deactivates when you leave it.

To enable this integration, add the following to your shell profile:

Bash (`~/.bash_profile`):

```bash
eval "$(trellis shell-init bash)"
```

Zsh (`~/.zshrc`):

```bash
eval "$(trellis shell-init zsh)"
```
