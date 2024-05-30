---
date_modified: 2024-05-30 10:00
date_published: 2023-03-28 07:00
title: Installing Radicle
authors:
  - ben
---

# Installation

## What is Radicle?

[Radicle](/radicle/) is an opinionated starting point for WordPress projects with the Roots stack.

Radicle includes the preferred setup of Acorn, Bedrock, Bud, Sage, and Trellis from the creators of Roots.

### Why use Radicle?

The Roots ecosystem contains several projects and most of them are built in a way where they don't require one another. There are some exceptions to this: Sage requires Acorn and Trellis requires Bedrock.

Our WordPress starter theme, Sage, is distributed in a way that is compatible with every type of WordPress setup. Since Sage 10 and the introduction of Acorn, which allows developers to use Laravel components within WordPress, it hasn't been possible for us to easily distribute the theme with our ideal setup because it requires changes made outside of the typical `wp-content` directory.

Since the release of Acorn, we've preferred to use a more [traditional Laravel-esque structure](https://roots.io/acorn/docs/directory-structure/) from the root of the project. We've made the root of the project the area of focus, including everything related to the WordPress theme, which is a modified verison of Sage 10. All of your theme templates are located at `resources/views/`. No more navigating 7 levels deep to get to your templates — they're just 2 levels away.

[**See the full list of Radicle features**](/radicle/#features)

## Server requirements

* Your document root must be configurable (_most_ local development tools and webhosts should support this)
* PHP >= 8.2 with the following extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, Tokenizer, XML
* Composer
* WP-CLI

## Installing Radicle

Radicle requires [purchasing a Radicle license](/radicle/) to get access to the codebase. Once Radicle has been purchased, you can use the [Roots Dashboard](https://dashboard.roots.io/) to generate an invitation to the GitHub repository or download the latest release.

After you've accepted the invitation to the GitHub repository, navigate to the [releases to download the latest version of Radicle](https://github.com/roots/radicle/releases).

::: tip
Are you building new sites often? Create your own private repo with the Radicle codebase and modify it to fit your needs. Radicle should be treated as a boilerplate/starting point, and not a framework.
:::

Although it is possible to retrofit an existing project with Radicle, we recommend using Radicle on a new project.

Unzip the contents of the latest Radicle release into your new project's directory. Make sure all of the hidden files (such as `.gitignore`) are included in your project directory.
