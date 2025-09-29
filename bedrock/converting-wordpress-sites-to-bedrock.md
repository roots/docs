---
date_modified: 2025-10-24 12:00
date_published: 2025-10-24 12:00
description: Convert traditional WordPress sites to Bedrock using Lithify. Automatically updates database references and file paths for Bedrock's directory structure.
title: Converting WordPress Sites to Bedrock
authors:
  - ben
  - MWDelaney
---

# Converting WordPress Sites to Bedrock

[Lithify](https://github.com/MWDelaney/lithify) is a WordPress plugin that adds a WP-CLI command to convert traditional WordPress sites into Bedrock-style installations. Created by [MWDelaney](https://github.com/MWDelaney), Lithify automates the database changes needed to make your existing WordPress site work with Bedrock's improved folder structure.

Converting an existing WordPress site to Bedrock typically involves manual database updates and file path changes. Lithify handles this conversion process automatically, updating your database to work seamlessly with Bedrock's modern architecture.

## Prerequisites

Before starting the conversion, you'll need:

- A fresh Bedrock installation
- A database backup of your existing WordPress site  
- Your existing site's plugins, themes, and uploads directories

## Create a new Bedrock site

Create a new Bedrock installation:

```bash
$ composer create-project roots/bedrock example.com
$ cd example.com
```

## Update WordPress version

Update Bedrock's WordPress version to match your current installation. For example, if your site runs WordPress 6.8.2, update `composer.json`:

```json
"roots/wordpress": "6.8.2"
```

## Copy your content files

Copy your WordPress `plugins`, `themes`, `mu-plugins`, and `uploads` directories into the Bedrock `web/app` directory.

## Add Lithify as a dependency

Install Lithify using Composer:

```bash
$ composer require mwdelaney/lithify
```

## Import your database

Navigate to your Bedrock directory and import your WordPress database:

```bash
$ wp db import example.sql
```

## Run the conversion

Activate Lithify and run the conversion command:

```bash
$ wp plugin activate lithify
$ wp lithify
```

### What Lithify does

When you run `wp lithify`, the plugin:

- Updates file path references from `wp-content` to `app`
- Adjusts plugin and theme paths to match Bedrock's structure
- Ensures upload paths work correctly with the new organization  
- Verifies that WordPress core references point to the correct locations

The conversion is non-destructive—your existing content and configuration remain intact while gaining all the benefits of Bedrock's modern development workflow.
