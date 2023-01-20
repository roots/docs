---
description: There are many ways to add private or paid WordPress plugins to your Bedrock-based project. In this guide, we go over using private Git repositories.
---

# Private or Commercial WordPress Plugins as Composer Dependencies

Bedrock (and by extension Trellis) uses Composer to manage its dependencies, which includes WordPress themes and plugins. This is great for version control as many WordPress plugins are easily available via [WordPress Packagist](https://wpackagist.org/), but what happens when you need to add a private, commercial, or paid plugin to your site? This guide will explain a simple way to add private plugins to your site via Composer.

There are many ways to add private or paid plugins to your Bedrock-based project. Popular methods include:

* Private Git repositories
* [SatisPress](https://github.com/blazersix/satispress)
* [Private Packagist](https://packagist.com/)
* [Toran Proxy](https://toranproxy.com/)

For the purposes of this document we will focus only on the first option: **private Git repositories**. We welcome contributed guides covering these methods or others.

**Note:** We recommend hosting private and commercial plugins in private Git repositories. GitHub [offers private repositories](https://github.com/pricing) for free and BitBucket includes them in its [limited free plan](https://bitbucket.org/product/pricing). The following guide assumes you’re using a GitHub private repository.

## Create a private GitHub repository for your plugin

[Create the repository](https://help.github.com/articles/create-a-repo/) as normal and clone the empty repository to your computer.

```shell
git clone git@github.com:YourGitHubUsername/example-plugin.git
```

## Create `composer.json`

In your empty repository, create a file named `composer.json` with the following content (edited to include your correct user, repository, and plugin information):

```json
{
  "name": "YourGithubUsername/example-plugin",
  "description": "",
  "keywords": ["wordpress", "plugin"],
  "homepage": "https://github.com/YourGitHubUsername/example-plugin",
  "authors": [
    {
      "name": "Original Plugin Author's Name",
      "homepage": "https://originalpluginurl.com"
    }
  ],
  "type": "wordpress-plugin",
  "require": {
    "php": ">=8.0"
  }
}
```

::: tip
Composer can create a skeleton `composer.json` for you: Just run `composer init` in your empty directory.
:::

## Copy plugin files into your repository

Copy all the plugin’s files into your new repository.

## Commit your plugin to Git and push your changes to GitHub

Run each of the following commands from your repository directory:

Add all of your plugin’s files to Git.

```shell
git add .
```    

Commit your changes

::: tip
Include the plugin’s version number in your commit message so that you can easily reference it later!
:::

```shell
git commit .
```

## Tag the release

Composer will need a way to know the version of a plugin. Fortunately, it understands [git tags](https://getcomposer.org/doc/articles/versions.md#tags) and can interpret them correctly if they use [semantic versioning](https://semver.org/), so we’ll be using those.

Let’s assume you’re pushing SearchWP version 2.9.14. That means we’ll be creating the 2.9.14 tag. Remember, tags are tied to commits, so be sure to commit all your changes _before_ creating the tag.

```shell
git tag 2.9.14
```

Push your changes, and your tags to GitHub:

```shell
git push --tags
```    

::: tip
Tags pushed to GitHub will automatically be turned into “Releases,” a feature of GitHub. You can also [create releases](https://help.github.com/articles/creating-releases/) manually on the GitHub website.
:::

## Edit your Bedrock `composer.json` file, add your repository and plugin

In your Bedrock site’s `composer.json`

* Add a new your GitHub repository to the `repositories` section referencing your GitHub repository:

```json
  "repositories": [

  ...

    {
      "type": "vcs",
      "url": "git@github.com:YourGitHubUsername/example-plugin.git"
    }

  ...

  ],
```

* Add your plugin to the `require` section using the version number you named your `release` after:

```json
  "require": {

  ...

    "YourGitHubUsername/example-plugin": "2.9.14",

  ...

  },
```

## Update your dependencies

Run `composer update` in your Bedrock directory to get your new plugin.

[**Join the discussion on Roots Discourse**](https://discourse.roots.io/t/private-or-commercial-plugins-as-composer-dependencies/13247)

* * *

This guide was contributed by [@MWDelaney](https://discourse.roots.io/u/MWDelaney)
