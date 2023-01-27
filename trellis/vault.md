---
description: Steps to enable and use Ansible Vault with a Trellis project. Trellis uses a vault.yml file for variables with sensitive data such as passwords.
authors:
  - ben
  - fullyint
  - Log1x
  - MWDelaney
  - mZoo
  - swalkinshaw
  - TangRufus
---

# Vault

Some Ansible variables contain sensitive data such as passwords. Trellis keeps these variable definitions in separate files named `vault.yml`. We strongly recommend that you encrypt these `vault.yml` files using [Ansible Vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html#vault) to avoid exposing sensitive data in your project repo. Your Trellis commands will be exactly the same as before enabling vault, not requiring any extra flags.

To briefly demonstrate what vault does, consider this example `vault.yml` file.

```yaml
# example vault.yml file -- unencrypted plain text
my_password: example_password
```

You should replace the `example_password` then encrypt the file with Ansible Vault before committing it to your repo. The data would be safe in your repo because the encrypted file would look like this:

```yaml
# example vault.yml file -- encrypted
$ANSIBLE_VAULT;1.1;AES256
343163646662643438323831343332626234333233386666333162383265663
3132306538383762336332376165383530633838643937320a6363343238643
363065366664316364646561613163653866623566303235666537343437643
6638363265383831390a6631663239373833636133623333666363643166383
6237663637353638653266616562616535623465636265316231613331 etc.
```

## Steps to enable Ansible Vault

::: danger
If you have unencrypted `vault.yml` files in your project's git history (e.g., passwords in plain text), you will most likely want to change the variable values in your `vault.yml` files before encrypting them and committing them to your repo.
:::

### Encrypt files
`trellis-cli` automatically generates your vault files and a vault password, but does not encrypt your vaults. To encrypt vaults created by `trellis-cli` run the following from any directory within your project:


```bash
$ trellis vault encrypt
```

## Other vault commands


`trellis-cli` provides a few basic commands that mirror with the official [Ansible Vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html) ones.

- `trellis vault encrypt <args>`
- `trellis vault view <args>`
- `trellis vault edit <args>`
- `trellis vault decrypt <args>` -- Avoid using the `decrypt` command. If your intention is to view or edit an encrypted file, use the `view` or `edit` commands instead. Any time you decrypt a file, you risk forgetting to re-encrypt the file before committing changes to your repo.

Run `trellis vault` to see usage details.  

## Working with vault variables

Here are a few tips for working with [variables and vault](http://docs.ansible.com/ansible/playbooks_best_practices.html#variables-and-vaults) in Trellis.

- Variables with sensitive data such as passwords are defined in files named `vault.yml`.
- Each environment has its own `vault.yml` file: `group_vars/<environment>/vault.yml`.
- There is also one `vault.yml` file applicable to all environments: `group_vars/all/vault.yml`.
- Variables named with the `vault_` prefix are defined in the `vault.yml` files.
- To view or edit an encrypted `vault.yml` file, use either `trellis vault view <file>` or `trellis vault edit <file>`. Avoid using the `decrypt` command. Any time you decrypt a file, you risk forgetting to re-encrypt the file before committing changes to your repo. You may want to employ a pre-commit hook ([example](https://www.reinteractive.net/posts/167-ansible-real-life-good-practices)) for added prevention.

## Sharing a project with vault-encrypted files

Your repo with vault-encrypted files is secure from anyone being able to see or use the sensitive data in the `vault.yml` files. To grant a colleague access to the data, you will need to give your colleague your vault password to use in repeating the two password steps in the [Steps to Enable Ansible Vault](vault.md#steps-to-enable-ansible-vault) above. It is still recommended to always keep your project in a private repo.

## Disabling Ansible Vault

It is not recommended to disable Ansible Vault but you can disable it at any time. Simply run `ansible-vault decrypt <file1> <file2> <etc>`. If you then commit the unencrypted files to your repo, the sensitive data will be in your repo in plain text and will be difficult to remove from the git history. If you re-enable vault in the future, you may want to change all the sensitive data, encrypt with vault, then commit the revised and encrypted `vault.yml` files to your repo.

## Storing your password

Without your password, either entered as a string or stored in your `vault_password_file` file (usually `.vault_pass` and configured in the `ansible.cfg` file), you will not be able to access the encrypted files. The `vault_password_file` should not ever be publicly accessible, or committed to version control. It's a good practice to backup this file on another physical or virtual drive, ideally also encrypted.

## Access Recovery

Should you lose access to your vault password, you you can either spin up a new server, or recreate or regenerate the `group_vars/(environment)/vault.yml` files and, on the servers, manually update the following to match new vault strings:

  * admin root (sudo) password
    * `sudo passwd admin`
  * root mysql password
    * `UPDATE mysql.user SET Password=PASSWORD('password_in_vault_file') WHERE USER='root' AND Host='localhost';`
    * `flush privileges;`
  * wordpress database passwords
    * `UPDATE mysql.user SET Password=PASSWORD('password_in_vault_file') WHERE USER='example_com' AND Host='localhost';`
    * `flush privileges;`

## Additional resources

[ansible-toolkit](https://github.com/dellis23/ansible-toolkit#atk-git-diff) provides a `atk-git-diff` command that allows you to do a `git diff` on encrypted files.
