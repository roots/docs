---
ID: 7767
post_title: Installing Bedrock
author: Ben Word
post_date: 2015-10-15 12:29:33
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/installing-bedrock/
published: true
docs_project:
  - "18"
publish_to_discourse:
  - "0"
---
1. Clone the git repo - `git clone https://github.com/roots/bedrock.git`
2. Run `composer install`
3. Copy `.env.example` to `.env` and update environment variables:
  * `DB_NAME` - Database name
  * `DB_USER` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `WP_HOME` - Full URL to WordPress home (http://example.com)
  * `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
4. Add theme(s) in `web/app/themes` as you would for a normal WordPress site.
5. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
6. Access WP admin at `http://example.com/wp/wp-admin`