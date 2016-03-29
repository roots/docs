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
  - 'a:1:{i:0;s:2:"18";}'
publish_to_discourse:
  - 'a:1:{i:0;s:1:"0";}'
---
Bedrock tries to separate config from code as much as possible and environment variables are used to achieve this. The benefit is there's a single place (`.env`) to keep settings like database or other 3rd party credentials that isn't committed to your repository.

[PHP dotenv](https://github.com/vlucas/phpdotenv) is used to load the `.env` file. All variables are then available in your app by the built-in `getenv`, `$_SERVER`, or `$_ENV` methods.

However, we use the [env](https://github.com/oscarotero/env) library and its `env` function which handles simple type coercion (such as converting the string `'True'` to the boolean `true`). We recommend you use `env` as well for reading environment variables.

Currently, the following env vars are required:

* `DB_USER`
* `DB_NAME`
* `DB_PASSWORD`
* `WP_HOME`
* `WP_SITEURL`