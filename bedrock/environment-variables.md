---
ID: 6133
post_title: Environment Variables
author: Ben Word
post_date: 2015-08-30 19:45:01
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/environment-variables/
published: true
docs_project:
  - "18"
publish_to_discourse:
  - "0"
---
Bedrock tries to separate config from code as much as possible and environment variables are used to achieve this. The benefit is there's a single place (`.env`) to keep settings like database or other 3rd party credentials that isn't committed to your repository.

[PHP dotenv](https://github.com/vlucas/phpdotenv) is used to load the `.env` file. All variables are then available in your app by `getenv`, `$_SERVER`, or `$_ENV`.

Currently, the following env vars are required:

* `DB_USER`
* `DB_NAME`
* `DB_PASSWORD`
* `WP_HOME`
* `WP_SITEURL`