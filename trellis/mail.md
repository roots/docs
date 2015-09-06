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
  - "19"
publish_to_discourse:
  - "0"
---
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
* `mail_password`: password (or API key)