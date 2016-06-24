---
ID: 6143
post_title: mu-plugins Autoloader
author: Ben Word
post_date: 2015-09-03 17:18:35
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/mu-plugins-autoloader/
published: true
docs_project:
  - "18"
saved_flag:
  - 'a:1:{i:0;s:1:"1";}'
publish_to_discourse:
  - 'a:1:{i:0;s:36:"a:1:{i:0;s:18:"a:1:{i:0;s:1:"0";}";}";}'
---
Bedrock includes an autoloader that enables standard plugins to be required just like must-use plugins. 

The autoloaded plugins are included after all mu-plugins and standard plugins have been loaded. An asterisk (*) next to the name of the plugin designates the plugins that have been autoloaded. To remove this functionality, just delete `web/app/mu-plugins/bedrock-autoloader.php`.

This enables the use of mu-plugins through Composer if their package type is `wordpress-muplugin`. You can also override a plugin's type like the following example:

```json
"installer-paths": {
  "web/app/mu-plugins/{$name}/": ["type:wordpress-muplugin", "roots/soil"],
  "web/app/plugins/{$name}/": ["type:wordpress-plugin"],
  "web/app/themes/{$name}/": ["type:wordpress-theme"]
},
```

[Soil](https://github.com/roots/soil) is a package with its type set to `wordpress-plugin`. Since it implements `composer/installers` we can override its type.