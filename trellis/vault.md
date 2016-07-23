---
ID: 8780
post_title: Vault
author: Ben Word
post_date: 2015-11-01 14:32:38
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/vault/
published: true
docs_project:
  - "19"
saved_flag:
  - 'a:1:{i:0;s:18:"a:1:{i:0;s:1:"1";}";}'
publish_to_discourse:
  - 'a:1:{i:0;s:54:"a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}";}'
---
Some Ansible variables contain sensitive data such as passwords. Trellis keeps these variable definitions in separate files named `vault.yml`. We strongly recommend that you encrypt these `vault.yml` files using [Ansible Vault](http://docs.ansible.com/ansible/playbooks_vault.html) to avoid exposing sensitive data in your project repo. Your Trellis commands will be exactly the same as before enabling vault, not requiring any extra flags.

To briefly demonstrate what vault does, consider this example `vault.yml` file.

```yml
# example vault.yml file -- unencrypted plain text
my_password: example_password
```

You should replace the `example_password` then encrypt the file with Ansible Vault before committing it to your repo. The data would be safe in your repo because the encrypted file would look like this:

```yml
# example vault.yml file -- encrypted
$ANSIBLE_VAULT;1.1;AES256
343163646662643438323831343332626234333233386666333162383265663
3132306538383762336332376165383530633838643937320a6363343238643
363065366664316364646561613163653866623566303235666537343437643
6638363265383831390a6631663239373833636133623333666363643166383
6237663637353638653266616562616535623465636265316231613331 etc.
```

## Steps to enable Ansible Vault

### 1. Set vault password

Generate a long random password and save it as a string on a single line in a new file. Name the file `.vault_pass` and save it at the root of this project (e.g., next to `ansible.cfg`). You will probably want to run `chmod 600 .vault_pass` to restrict access to this file. This `.vault_pass` file will remain in plain text and should _not_ be committed to your repo, so be sure that it is included in your `.gitignore` file.

If you prefer not to create a file with your vault password, you can add the `--ask-vault-pass` flag to your `ansible-playbook` commands, which will prompt you to enter your password via the command line.

### 2. Inform Ansible of vault password

The easiest way to inform Ansible of your vault password is to list your `.vault_pass` file as a default in `ansible.cfg`:

```diff
  # ansible.cfg
  [defaults]
  roles_path = vendor/roles
  force_handlers = True
  inventory = hosts
+ vault_password_file = .vault_pass
```

If you prefer not to set this default in your `ansible.cfg` file, you can add the `--vault-password-file .vault_pass` flag to your `ansible-playbook` commands. Alternatively, you could add the `--ask-vault-pass` flag, causing the `ansible-playbook` command to prompt you to enter your password via the command line.

### 3. Encrypt files

**Caution:** If you have unencrypted `vault.yml` files in your project's git history (e.g., passwords in plain text), you will most likely want to change the variable values in your `vault.yml` files before encrypting them and committing them to your repo.

Encrypt your `vault.yml` files with the command `ansible-vault encrypt <file>`. The example below uses the command to encrypt the full list of `vault.yml` files (fileglobs are not supported, see [https://github.com/ansible/ansible/issues/6241](https://github.com/ansible/ansible/issues/6241)):

```
ansible-vault encrypt group_vars/all/vault.yml group_vars/development/vault.yml group_vars/staging/vault.yml group_vars/production/vault.yml
```

## Other vault commands

Here are a few notable commands from the official [Ansible Vault](http://docs.ansible.com/ansible/playbooks_vault.html) docs.

* [`ansible-vault encrypt <file>`](http://docs.ansible.com/ansible/playbooks_vault.html#encrypting-unencrypted-files)
* [`ansible-vault view <file>`](http://docs.ansible.com/ansible/playbooks_vault.html#viewing-encrypted-files)
* [`ansible-vault edit <file>`](http://docs.ansible.com/ansible/playbooks_vault.html#editing-encrypted-files)
* [`ansible-vault decrypt <file>`](http://docs.ansible.com/ansible/playbooks_vault.html#decrypting-encrypted-files) -- Avoid using the `decrypt` command. If your intention is to view or edit an encrypted file, use the `view` or `edit` commands instead. Any time you decrypt a file, you risk forgetting to re-encrypt the file before committing changes to your repo.
* [`ansible-vault rekey <file>`](http://docs.ansible.com/ansible/playbooks_vault.html#rekeying-encrypted-files)

## Working with vault variables

Here are a few conceptual tips for working with [variables and vault](http://docs.ansible.com/ansible/playbooks_best_practices.html#variables-and-vaults) in Trellis.

* Variables with sensitive data such as passwords are defined in files named `vault.yml`.
* Each environment has its own `vault.yml` file: `group_vars/<environment>/vault.yml`.
* There is also one `vault.yml` file applicable to all environments: `group_vars/all/vault.yml`.
* Variables named with the `vault_` prefix are defined in the `vault.yml` files.
* To view or edit an encrypted `vault.yml` file, use either `ansible-vault view <file>` or `ansible-vault edit <file>`. Avoid using the `decrypt` command. Any time you decrypt a file, you risk forgetting to re-encrypt the file before committing changes to your repo. You may want to employ a pre-commit hook ([example](https://www.reinteractive.net/posts/167-ansible-real-life-good-practices)) for added prevention.

## Sharing a project with vault-encrypted files

Your repo with vault-encrypted files is secure from anyone being able to see or use the sensitive data in the `vault.yml` files. To grant a colleague access to the data, you will need to give your colleague your vault password to use in repeating the two password steps in the [Steps to Enable Ansible Vault](https://roots.io/trellis/docs/vault/#steps-to-enable-ansible-vault) above. It is still recommended to always keep your project in a private repo.

## Disabling Ansible Vault

It is not recommended to disable Ansible Vault but you can disable it at any time. Simply run `ansible-vault decrypt <file1> <file2> <etc>`. If you then commit the unencrypted files to your repo, the sensitive data will be in your repo in plain text and will be difficult to remove from the git history. If you re-enable vault in the future, you may want to change all the sensitive data, encrypt with vault, then commit the revised and encrypted `vault.yml` files to your repo.

## Additional resources

[ansible-toolkit](https://github.com/dellis23/ansible-toolkit#atk-git-diff) provides a `atk-git-diff` command that allows you to do a `git diff` on encrypted files.