---
ID: 7761
post_title: Installing Trellis
author: Ben Word
post_date: 2015-10-15 12:20:35
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/installing-trellis/
published: true
docs_project:
  - "19"
publish_to_discourse:
  - "0"
---
1. Download/fork/clone the [Trellis repository](https://github.com/roots/trellis) to your local machine
2. Run `ansible-galaxy install -r requirements.yml` inside your Trellis directory to install external Ansible roles/packages
3. Download/fork/clone [Bedrock](https://github.com/roots/bedrock) or have an existing Bedrock-based site ready

You should now have the following directories at the same level somewhere:

```plain
example.com/    - Primary folder for the project
├── trellis/    - Your clone of the Trellis repository
└── site/       - A Bedrock-based site
```

- You **do not** need a configured `.env` file. Trellis will automatically create and configure one.
- The full paths to these directories must not contain spaces or else [Ansible will fail](https://github.com/ansible/ansible/issues/8555).

You can find a complete working example in the [Roots Example Project](https://github.com/roots/roots-example-project.com) repository.