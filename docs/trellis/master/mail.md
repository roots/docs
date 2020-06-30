---
description: Trellis uses MailHog on development to capture outgoing email. Mail setup on remote servers is handled by variables in the mail.yml file.
---

# Mail

Trellis' mail functionality is separated between development and staging/production since you usually want different behaviour out of them.

## Development

Dealing with emails in development is never fun. The two common solutions are:

- Ignore it and hope it works fine on production
- Set up real SMTP credentials to send emails

Enter [MailHog](https://github.com/mailhog/MailHog). It’s a simple tool which captures outgoing email and lets you view them from a web UI. And after that you can optionally "release" them which would actually send the email.

![Mailhog Preview](https://cdn.roots.io/app/uploads/trellis-mailhog-preview.png)

MailHog is automatically set up in development. You can access it at `http://yourdevelopmentdomain.test:8025` (replacing the domain with yours that you set up for the WP site host).

::: warning Note
Mail will be automatically captured but you won't ever see it unless you access the MailHog UI at the address above.
:::

Another benefit of using MailHog is that if you are using real SMTP credentials in development, you can ensure you don’t accidentally send emails to real email addresses which might exist in your database.

::: warning Note
This is not the case if you have an active WordPress plugin that is configured to send mail. You'll need to disable the mail plugin on development to ensure you don't accidentally send emails to real email addresses. You could also hook into `phpmailer_init` in WordPress for non-production environments to prevent emails from being sent out. Using a service like [Mailtrap](https://mailtrap.io/) is another option.\*\*
:::

Trellis is using the [MailHog role on Ansible Galaxy](https://galaxy.ansible.com/geerlingguy/mailhog/). See that `README` for any extra configuration options although none should be required as Trellis integrates it automatically.

### MailHog and SSL with HSTS

If your WordPress site has SSL enabled with HSTS ([currently a default](https://github.com/roots/trellis/issues/741)), you'll need to disable HSTS in order to reach the MailHog site. In `group_vars/development/wordpress_sites.yml`:

```yml
ssl:
  enabled: true
  hsts_max_age: 0
```

Then reprovision your Vagrant box in order to reach MailHog at `http://yourdevelopmentdomain.test:8025`.

## Remote servers (staging/production)

Outgoing mail is done by the sSMTP role. sSMTP is a lightweight SMTP mail relay basically. In order to send external emails, you'll need to configure an SMTP server.

We always suggest using an external email service rather than your own because it's very difficult to set up a proper email server.

Some suggested services:

- [Sendgrid](https://sendgrid.com/)
- [Mailgun](http://www.mailgun.com/)
- [Amazon SES](http://aws.amazon.com/ses/)

All of these offer around 10k+ emails for free per month. Once you have SMTP credentials, configure them in `group_vars/all/mail.yml`.

- `mail_smtp_server`: hostname:port
- `mail_hostname`: hostname for mail delivery
- `mail_user`: username
- `mail_password`: password or API key (define in `group_vars/all/vault.yml`)

### Example

::: v-pre

```yml
mail_smtp_server: smtp.example.com:587
mail_hostname: example.com
mail_user: admin@example.com
mail_password: '{{ vault_mail_password }}' # Define this in group_vars/all/vault.yml
```

:::

If your SMTP settings are invalid, WordPress will return the following error message:

```
Could not instantiate mail function.
```

To fix this error, update your SMTP settings so that they're valid and then re-provision the remote server.

### Revaliases

By default some system daemons, like `cron` send email from the hostname like this: `root@mydroplet-ubuntu-s-1cpu-1gb-nyc3`. To avoid blocked or spammed messages, configure sSMTP "revaliases" in `trellis/roles/ssmtp/defaults/main.yml`, and deploy the `mail` tasks, which will populate the `/etc/ssmtp/revaliases` file on the server.

