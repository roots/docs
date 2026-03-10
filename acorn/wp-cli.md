---
date_modified: 2026-03-10 12:00
date_published: 2021-11-19 11:58
description: Acorn provides WP-CLI commands similar to Laravel's `artisan` for managing WordPress. Clear caches, compile views, and run administrative tasks.
title: WP-CLI Commands for Acorn
authors:
  - alwaysblank
  - ben
  - QWp6t
---

# WP-CLI Commands for Acorn

Acorn comes with WP-CLI commands similar to Laravel's `artisan` CLI.

## Available commands

| Command | Description |
| --- | --- |
| `wp acorn about` | Display basic information about your application |
| `wp acorn clear-compiled` | Remove the compiled class file |
| `wp acorn completion` | Dump the shell completion script |
| `wp acorn db` | Start a new database CLI session |
| `wp acorn env` | Display the current framework environment |
| `wp acorn help` | Display help for a command |
| `wp acorn list` | List commands |
| `wp acorn migrate` | Run the database migrations |
| `wp acorn optimize` | Cache framework bootstrap, configuration, and metadata to increase performance |
| `wp acorn test` | Run the application tests |
| `wp acorn acorn:init` | Initializes required paths in the base directory |
| `wp acorn acorn:install` | Install Acorn into the application |
| `wp acorn cache:clear` | Flush the application cache |
| `wp acorn cache:forget` | Remove an item from the cache |
| `wp acorn config:cache` | Create a cache file for faster configuration loading |
| `wp acorn config:clear` | Remove the configuration cache file |
| `wp acorn db:seed` | Seed the database with records |
| `wp acorn db:table` | Display information about the given database table |
| `wp acorn db:wipe` | Drop all tables, views, and types |
| `wp acorn key:generate` | Set the application key |
| `wp acorn make:command` | Create a new Artisan command |
| `wp acorn make:component` | Create a new view component class |
| `wp acorn make:composer` | Create a new view composer class |
| `wp acorn make:controller` | Create a new controller class |
| `wp acorn make:job` | Create a new job class |
| `wp acorn make:middleware` | Create a new HTTP middleware class |
| `wp acorn make:migration` | Create a new migration file |
| `wp acorn make:model` | Create a new Eloquent model class |
| `wp acorn make:provider` | Create a new service provider class |
| `wp acorn make:queue-batches-table` | Create a migration for the batches database table |
| `wp acorn make:queue-failed-table` | Create a migration for the failed queue jobs database table |
| `wp acorn make:queue-table` | Create a migration for the queue jobs database table |
| `wp acorn make:seeder` | Create a new seeder class |
| `wp acorn migrate:fresh` | Drop all tables and re-run all migrations |
| `wp acorn migrate:install` | Create the migration repository |
| `wp acorn migrate:refresh` | Reset and re-run all migrations |
| `wp acorn migrate:reset` | Rollback all database migrations |
| `wp acorn migrate:rollback` | Rollback the last database migration |
| `wp acorn migrate:status` | Show the status of each migration |
| `wp acorn optimize:clear` | Remove the cached bootstrap files |
| `wp acorn package:discover` | Rebuild the cached package manifest |
| `wp acorn queue:clear` | Delete all of the jobs from the specified queue |
| `wp acorn queue:failed` | List all of the failed queue jobs |
| `wp acorn queue:flush` | Flush all of the failed queue jobs |
| `wp acorn queue:forget` | Delete a failed queue job |
| `wp acorn queue:listen` | Listen to a given queue |
| `wp acorn queue:monitor` | Monitor the size of the specified queues |
| `wp acorn queue:pause` | Pause job processing for a specific queue |
| `wp acorn queue:prune-batches` | Prune stale entries from the batches database |
| `wp acorn queue:prune-failed` | Prune stale entries from the failed jobs table |
| `wp acorn queue:restart` | Restart queue worker daemons after their current job |
| `wp acorn queue:resume` | Resume job processing for a paused queue |
| `wp acorn queue:retry` | Retry a failed queue job |
| `wp acorn queue:retry-batch` | Retry the failed jobs for a batch |
| `wp acorn queue:work` | Start processing jobs on the queue as a daemon |
| `wp acorn route:cache` | Create a route cache file for faster route registration |
| `wp acorn route:clear` | Remove the route cache file |
| `wp acorn route:list` | List all registered routes |
| `wp acorn schedule:clear-cache` | Delete the cached mutex files created by scheduler |
| `wp acorn schedule:interrupt` | Interrupt the current schedule run |
| `wp acorn schedule:list` | List all scheduled tasks |
| `wp acorn schedule:run` | Run the scheduled commands |
| `wp acorn schedule:test` | Run a scheduled command |
| `wp acorn schedule:work` | Start the schedule worker |
| `wp acorn vendor:publish` | Publish any publishable assets from vendor packages |
| `wp acorn view:cache` | Compile all of the application's Blade templates |
| `wp acorn view:clear` | Clear all compiled view files |
