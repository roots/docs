---
description: Trellis provisions the server with fail2ban, an intrusion prevention software framework that protects computer servers from brute-force attacks.
---

# The Basics

Read up on the framework, developed by Cyril Jaquier and team, in the [fail2ban wiki](https://www.fail2ban.org/wiki/index.php/Main_Page).

# Provisioning

Under the tag, `fail2ban` trellis will whitelist the IP address of the provisioning computer.

# The Basics (run as super user)

Check status: `fail2ban-client status`

Unban an ip address: `fail2ban-client get yourjailname actionunban youripaddress`, where `yourjailname` will be returned in `status`, typically `ssh`, `sshd`.

# Log File

Location: `/var/log/fail2ban.log`

Rock star search: `find /var/log -type f -name "*log" -exec grep --color -Hni "XXX.XXX.XXX.XXX" {} \;`

