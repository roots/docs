---
ID: 7761
post_title: Installing Trellis
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/trellis/docs/installing-trellis/
published: true
post_date: 2015-10-15 12:20:35
---
## Install requirements

Trellis relies on a few other software tools. Make sure all dependencies have been installed before moving on:

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads) >= 4.3.10
* [Vagrant](https://www.vagrantup.com/downloads.html) >= 1.8.5

<div class="well well-trellis-alt module">

This is the minimum requirements for a development server. Vagrant automatically takes care of the Ansible dependency for us by default.

To speed up future dev VM provisioning, or for remote servers, you'll need to install Ansible locally on your host machine.

See [Requirements](https://roots.io/trellis/docs/remote-server-setup/#requirements) under Remote Server Setup.
</div>

## Create a project

The recommended directory structure for a Trellis project looks like:

```shell
example.com/      # → Root folder for the project
├── trellis/      # → Your clone of this repository
└── site/         # → A Bedrock-based WordPress site
    └── web/
        ├── app/  # → WordPress content directory (themes, plugins, etc.)
        └── wp/   # → WordPress core (don't touch!)
```

See a complete working example in the [roots-example-project.com repo](https://github.com/roots/roots-example-project.com).

Pick a descriptive name for your project and use it instead of the default `example.com`. We recommend the domain of the site for convenience.

1. Create a new project directory:
```plain
mkdir example.com && cd example.com
```
2. Create an empty repo (on Github/Bitbucket/Gitlab/etc) and keep a note of the "remote" URL: 
```plain
git@github.com:USERNAME/example-com-trellis.git
```
3. Clone Trellis:
```plain
git clone --depth=1 git@github.com:roots/trellis.git
git remote set-url origin git@github.com:USERNAME/example-com-trellis.git
git remote set-url roots git@github.com:roots/trellis.git
```
4. Create another empty repo for Bedrock: 
```plain
git@github.com:USERNAME/example-com-bedrock.git
```
5. Clone Trellis:
```plain
git clone --depth=1 git@github.com:roots/bedrock.git
git remote set-url origin git@github.com:USERNAME/example-com-bedrock.git
git remote set-url roots git@github.com:roots/bedrock.git
```

Now any time you'd like to update trellis/bedrock:
```plain
git fetch
git rebase --committer-date-is-author-date roots/master
```

Note:
`--committer-date-is-author-date` goes around git's annoying rewriting of commit dates during a rebase.

Bonus:

If you imagine using Trellis for multiple projects, you should consider forking trellis. Creating a project-template branch would allow you to make general customizations to trellis instead of applying them manually to each project. The only change to your setup would be to set your example-com-trellis upstream/remote as `USERNAME/trellis` instead of `roots/trellis`. To keep all of your repos up-to-date with trellis you would run `git rebase --committer-date-is-author-date roots/trellis` in your `USERNAME/trellis` repo.

Windows user? [Read the Windows docs](https://roots.io/trellis/docs/windows/) for slightly different installation instructions.
