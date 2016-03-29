---
ID: 6155
post_title: Mail
author: Ben Word
post_date: 2015-09-03 18:10:25
post_excerpt: ""
layout: doc
permalink: https://roots.io/trellis/docs/mail/
published: true
docs_project:
  - 'a:1:{i:0;s:2:"19";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
Trellis' mail functionality is separated between development and staging/production since you usually want different behaviour out of them.

## Development
Dealing with emails in development is never fun. The two common solutions are:

* Ignore it and hope it works fine on production
* Set up real SMTP credentials to send emails

Enter [MailHog](https://github.com/mailhog/MailHog). It’s a simple tool which captures outgoing email and lets you view them from a web UI. And after that you can optionally "release" them which would actually send the email.

![](https://roots.io/app/uploads/trellis-mailhog-preview.png)

MailHog is automatically set up in development. You can access it at `http://yourdevelopmentdomain.dev:8025` (replacing the domain with yours that you set up for the WP site host).

Note that mail will be automatically captured but you won't ever see it unless you access the MailHog UI at the address above.

Another benefit of using MailHog is that if are using real SMTP credentials in development, you can ensure you don’t accidentally send emails to real email addresses which might exist in your database.

Trellis is using the [MailHog role on Ansible Galaxy](https://galaxy.ansible.com/list#/roles/2434). See that `README` for any extra configuration options although none should be required as Trellis integrates it automatically.

## Remote servers (staging/production)

Outgoing mail is done by the sSMTP role. sSMTP is a lightweight SMTP mail relay basically. In order to send external emails, you'll need to configure an SMTP server.

We always suggest using an external email service rather than your own because it's very difficult to setup a proper email server.

Some suggested services:

* [Sendgrid](https://sendgrid.com/)
* [Mailgun](http://www.mailgun.com/)
* [Amazon SES](http://aws.amazon.com/ses/)

All of these offer around 10k+ emails for free per month. Once you have SMTP credentials, configure them in `group_vars/all/mail.yml`.

* `mail_smtp_server`: hostname:port
* `mail_hostname`: hostname for mail delivery
* `mail_user`: username
* `mail_password`: password or API key (define in `group_vars/all/vault.yml`)

### Example

```yml
mail_smtp_server: smtp.example.com:587
mail_hostname: example.com
mail_user: admin@example.com
mail_password: "{{ vault_mail_password }}" # Define this in group_vars/all/vault.yml
```

If your SMTP settings are invalid, WordPress will return the following error message:

```txt
Could not instantiate mail function.
```

To fix this error, update your SMTP settings so that they're valid and then re-provision the remote server.