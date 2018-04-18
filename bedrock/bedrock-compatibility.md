---
ID: 26137
post_title: Bedrock Compatibility
author: Ben Word
post_excerpt: ""
layout: doc
permalink: >
  https://roots.io/bedrock/docs/bedrock-compatibility/
published: true
post_date: 2018-04-17 21:26:26
---
Bedrock uses built-in WordPress functionality to do things like set a custom `wp-content` directory and install WordPress in a subdirectory.

When something is broken in Bedrock and not a regular WordPress install, it's likely also broken whenever [you give WordPress its own directory](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory).

Plugin and theme authors sometimes write code that breaks Bedrock and similar setups. One example is [trying to include wp-load.php](http://ottopress.com/2010/dont-include-wp-load-please/), another is assuming `wp-content` as the name as the content directory.