---
ID: 6142
post_title: Folder Structure
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/folder-structure/
published: true
post_date: 2015-09-03 17:17:56
---
```shell
├── composer.json             # → Manage versions of WordPress, plugins & dependencies
├── config                    # → WordPress configuration files
│   ├── application.php       # → Primary WP config file (wp-config.php equivalent)
│   └── environments          # → Environment specific configs
│       ├── development.php   # → Development config
│       └── staging.php       # → Staging config
├── vendor                    # → Composer packages (never edit)
└── web                       # → Web root (document root on your webserver)
    ├── app                   # → wp-content equivalent
    │   ├── mu-plugins        # → Must use plugins
    │   ├── plugins           # → Plugins
    │   ├── themes            # → Themes
    │   └── uploads           # → Uploads
    ├── wp-config.php         # → Required by WP (never edit)
    ├── index.php             # → WordPress view bootstrapper
    └── wp                    # → WordPress core (never edit)
```

The organization of Bedrock is similar to putting WordPress in its own subdirectory but with some improvements:

* In order not to expose sensitive files in the web root, Bedrock moves what's required into a `web/` directory including the `wp/` source, and the `wp-content` source.
* `wp-content` has been named `app` to better reflect its contents. It contains application code and not just "static content". It also matches up with other frameworks such as Symfony and Rails.
* `wp-config.php` remains in the `web/` because it's required by WP, but it only acts as a loader. The actual configuration files have been moved to `config/` for better separation.
* `vendor/` is where the Composer managed dependencies are installed to.
* `wp/` is where WordPress core lives. It's also managed by Composer but can't be put under `vendor` due to WP limitations.