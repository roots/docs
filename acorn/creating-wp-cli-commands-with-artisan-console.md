---
date_modified: 2025-09-28 00:00
date_published: 2025-09-28 00:00
description: Create custom WP-CLI commands using Laravel's Artisan Console system with Acorn. Extend WordPress CLI with powerful Laravel functionality.
title: Creating WP-CLI Commands with Artisan Console
authors:
  - ben
---

# Creating WP-CLI Commands with Artisan Console

Acorn brings Laravel's powerful Artisan Console system to WordPress, allowing you to create custom WP-CLI commands with the same elegance and functionality you'd expect from Laravel. This enables you to build sophisticated command-line tools that integrate seamlessly with both WordPress and Laravel features.

We recommend referencing the [Laravel docs on Artisan Console](https://laravel.com/docs/12.x/artisan) for a complete understanding of the console system.

## Creating your first command

To create a new WP-CLI command, use the `make:command` Artisan command:

```bash
$ wp acorn make:command SeoAuditCommand
```

This will create a new command file in `app/Console/Commands/` with the basic structure needed for a custom command.

### Command file structure

A typical Artisan command contains several key properties and methods:

- `$signature` - Defines the command name, arguments, and options
- `$description` - Provides a description for the command
- `handle()` - Contains the command logic

Here's a basic example for auditing SEO:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SeoAuditCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seo:audit
                            {--post-type=post : Post type to audit}
                            {--limit=20 : Number of posts to audit}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Audit SEO issues across posts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $postType = $this->option('post-type');
        $limit = (int) $this->option('limit');

        $this->components->info("Auditing {$postType} posts for SEO issues...");

        $posts = get_posts([
            'post_type' => $postType,
            'post_status' => 'publish',
            'numberposts' => $limit,
        ]);

        if (empty($posts)) {
            $this->components->warn('No posts found to audit.');
            return 0;
        }

        $issues = [];

        foreach ($posts as $post) {
            $postIssues = $this->auditPost($post);
            if (!empty($postIssues)) {
                $issues[$post->ID] = [
                    'title' => $post->post_title,
                    'issues' => $postIssues,
                ];
            }
        }

        if (empty($issues)) {
            $this->components->info('No SEO issues found! 🎉');
            return 0;
        }

        $this->displayIssues($issues);
        return 0;
    }

    protected function auditPost($post)
    {
        $issues = [];

        $seoTitle = get_post_meta($post->ID, '_genesis_title', true) ?: $post->post_title;
        if (strlen($seoTitle) < 30) {
            $issues[] = 'SEO title too short (< 30 chars)';
        }

        if (strlen($seoTitle) > 60) {
            $issues[] = 'SEO title too long (> 60 chars)';
        }

        $description = get_post_meta($post->ID, '_genesis_description', true);
        if (empty($description)) {
            $issues[] = 'Missing SEO meta description';
        } elseif (strlen($description) < 120) {
            $issues[] = 'Meta description too short (< 120 chars)';
        } elseif (strlen($description) > 160) {
            $issues[] = 'Meta description too long (> 160 chars)';
        }

        return $issues;
    }

    protected function displayIssues($issues)
    {
        $this->components->error('Found ' . count($issues) . ' posts with SEO issues:');
        $this->newLine();

        foreach ($issues as $postId => $data) {
            $this->components->twoColumnDetail(
                "Post #{$postId}",
                $data['title']
            );
            foreach ($data['issues'] as $issue) {
                $this->line("  → {$issue}");
            }
            $this->newLine();
        }
    }
}
```

## Command signature syntax

```php
// Basic command
protected $signature = 'newsletter:send';

// With arguments
protected $signature = 'user:create {name} {email}';

// With options
protected $signature = 'seo:audit {--post-type=post}';
```

## Running your commands

Once created, your commands are automatically available through WP-CLI:

#### Run your SEO audit command

```bash
$ wp acorn seo:audit
```

#### Run with options

```bash
$ wp acorn seo:audit --post-type=page --limit=50
```

#### Get help for a command

```bash
$ wp acorn help seo:audit
```

## Console output

```php
public function handle()
{
    $this->info('Success message');
    $this->error('Error message');

    // Ask for input
    $name = $this->components->ask('What is your name?');

    // Use WordPress functions
    $posts = get_posts(['numberposts' => 10]);

    return 0; // Success
}
```
