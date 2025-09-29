---
date_modified: 2025-10-24 12:00
date_published: 2025-10-24 12:00
description: Enable Redis in Trellis for WordPress object caching. Improve site performance by caching database queries and reducing load on MySQL database servers.
title: Redis
authors:
  - ben
---

# Redis

Trellis supports two types of caching that work together:
- [**FastCGI Cache**](/trellis/docs/fastcgi-caching/) - Full page caching at the nginx level
- **Object Cache** - Database query and transient caching (Redis or Memcached)

These can be used independently or together for optimal performance.

## Configuration

### Maximum Performance (FastCGI + Object Cache)

Enable both FastCGI page caching and Redis object caching:

```yaml
wordpress_sites:
  example.com:
    cache:
      enabled: true       # Enables FastCGI page caching
      duration: 30s       # FastCGI cache duration
    object_cache:
      enabled: true       # Enables object caching
      provider: redis     # Use Redis (or memcached)
      database: 0         # Redis database number
```

### FastCGI Cache Only (Default/Backward Compatible)

Existing configurations continue to work unchanged:

```yaml
cache:
  enabled: true  # FastCGI page caching only
  duration: 30s
  skip_cache_uri: /wp-admin/|/wp-json/|/xmlrpc.php
  skip_cache_cookie: comment_author|wordpress_[a-f0-9]+
  background_update: "on"
```

### Object Cache Only

If you need Redis object cache without page caching:

```yaml
cache:
  enabled: false          # Disable FastCGI page caching
object_cache:
  enabled: true           # Enable object caching
  provider: redis         # Use Redis (or memcached)
  database: 0             # Redis database number
```

## Cache Types

### FastCGI Cache (Page Caching)
- **Purpose**: Caches complete HTML pages
- **Performance**: Fastest possible page loads for cached content
- **Best for**: High-traffic sites with mostly static content
- **Location**: nginx level, bypasses PHP entirely

### Redis Object Cache
- **Purpose**: Caches database queries, transients, and objects
- **Performance**: Reduces database load significantly
- **Best for**: Database-heavy sites, complex queries
- **Features**: Persistent across page loads, shared data

### Memcached Object Cache
- **Purpose**: Alternative to Redis for object caching
- **Performance**: Similar to Redis, slightly different characteristics
- **Best for**: When Redis isn't available or preferred

## WordPress Plugin Installation

### For Redis Object Cache

Install a Redis object cache plugin in your WordPress site:

1. **Redis Object Cache** (recommended): [https://wordpress.org/plugins/redis-cache/](https://wordpress.org/plugins/redis-cache/)

```bash
composer require wpackagist-plugin/redis-cache
```

2. After deployment, activate the plugin and enable object caching:

```bash
wp plugin activate redis-cache
wp redis enable
```

### For Memcached Object Cache

Install a Memcached object cache plugin:

1. **Memcached Object Cache**: [https://wordpress.org/plugins/memcached/](https://wordpress.org/plugins/memcached/)

```bash
composer require wpackagist-plugin/memcached
```

2. The plugin typically auto-activates when it detects Memcached is available.

## Configuration Examples

### Maximum Performance Setup
```yaml
wordpress_sites:
  example.com:
    cache:
      enabled: true     # FastCGI page caching
      duration: 60s
    object_cache:
      enabled: true     # Object caching
      provider: redis   # Using Redis
      database: 0
```

### Multiple Sites with Isolated Object Caches
```yaml
# Site 1
wordpress_sites:
  site1.com:
    cache:
      enabled: true
    object_cache:
      enabled: true
      provider: redis
      database: 0      # Redis DB 0

# Site 2
wordpress_sites:
  site2.com:
    cache:
      enabled: true
    object_cache:
      enabled: true
      provider: redis  
      database: 1      # Redis DB 1
```

### Mixed Cache Strategies
```yaml
# High-traffic marketing site (page cache only)
wordpress_sites:
  marketing.com:
    cache:
      enabled: true
      duration: 300s    # 5-minute page cache

# Database-heavy app (both caches)
wordpress_sites:
  app.com:
    cache:
      enabled: true
      duration: 30s
    object_cache:
      enabled: true
      provider: redis   # Adds object caching
      database: 0
```

## Customizing Redis Configuration

### Global Redis Settings

You can customize Redis settings in `group_vars/all/main.yml`:

```yaml
# Increase memory allocation (default: 256mb)
redis_maxmemory: 512mb

# Change eviction policy (default: allkeys-lru)
redis_maxmemory_policy: allkeys-lru

# Enable Redis password
redis_requirepass: your_secure_password

# Persistence settings
redis_appendonly: "yes"  # Enable AOF persistence
```

### Advanced Configuration

For more advanced Redis configuration, you can override any setting in `group_vars/all/main.yml`:

```yaml
redis_extra_config:
  tcp-backlog: 511
  tcp-keepalive: 300
  supervised: systemd
```

## Advanced Configurations

### Custom Redis Settings per Site
```yaml
wordpress_sites:
  example.com:
    cache:
      enabled: true
    object_cache:
      enabled: true
      provider: redis
      host: 127.0.0.1
      port: 6379
      database: 0
      password: secret_password
      prefix: custom_prefix_
```

### Memcached Sessions + Redis Object Cache
```yaml
# In group_vars/all/main.yml
memcached_sessions: true  # Use Memcached for PHP sessions

# In wordpress_sites.yml
wordpress_sites:
  example.com:
    cache:
      enabled: true        # FastCGI page cache
      provider: redis      # Redis object cache
      database: 0
```

This setup uses three different cache systems:
- **Memcached**: PHP sessions
- **Redis**: WordPress object cache
- **FastCGI**: Page cache

## Monitoring

Monitor Redis usage:

```bash
# Redis CLI
redis-cli

# Inside Redis CLI
INFO memory
INFO stats

# Monitor real-time commands
redis-cli MONITOR
```
