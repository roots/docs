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

The `$signature` property uses a specific syntax to define your command:

### Basic command
```php
protected $signature = 'newsletter:send';
```

### With arguments
```php
protected $signature = 'user:create {name} {email}';
```

### With optional arguments
```php
protected $signature = 'user:create {name} {email?}';
```

### With options
```php
protected $signature = 'seo:audit
                        {--post-type=post : Post type to audit}
                        {--limit=20 : Number of posts to audit}';
```

### With option shortcuts
```php
protected $signature = 'cache:clear {--f|force : Force cache clearing}';
```

## Running your commands

Once created, your commands are automatically available through WP-CLI:

```bash
# Run your SEO audit command
$ wp acorn seo:audit

# Run with options
$ wp acorn seo:audit --post-type=page --limit=50

# Get help for a command
$ wp acorn help seo:audit
```

### Example output

Here's what the SEO audit command output looks like:

```
Post #1056: Announcing Allow SVG
https://roots.io/announcing-allow-svg/
  ! SEO title too short (20 chars, recommended 30-60)
  ℹ Content too short (233 words, recommended 300+)
  ℹ No images or featured image

Post #1053: Announcing Acorn Post Types
https://roots.io/announcing-acorn-post-types/
  ! SEO title too short (27 chars, recommended 30-60)
  ℹ Content too short (196 words, recommended 300+)
  ℹ No images or featured image

Post #1037: Sage v11 and Acorn v5 Released
https://roots.io/sage-v11-and-acorn-v5-released/
  ! Meta description too short (76 chars, recommended 120-160)
  ℹ No images or featured image
```

## Console output components

Acorn provides various output components for better user experience:

### Basic output
```php
$this->info('Success message');
$this->error('Error message');
$this->warn('Warning message');
$this->line('Regular text');
```

### Interactive components
```php
// Ask for input
$name = $this->components->ask('What is your name?');

// Ask with default
$email = $this->components->ask('Email address?', 'admin@example.com');

// Confirmation
$confirmed = $this->components->confirm('Continue?');

// Choice selection
$role = $this->components->choice('Select role', ['admin', 'editor', 'author']);
```

### Progress bars
```php
$users = get_users();
$progress = $this->output->createProgressBar(count($users));
$progress->start();

foreach ($users as $user) {
    // Process user
    $progress->advance();
}

$progress->finish();
```

### Tables
```php
$this->table(['Name', 'Email'], [
    ['John Doe', 'john@example.com'],
    ['Jane Smith', 'jane@example.com'],
]);
```

## Integration with WordPress

Your commands have full access to WordPress functions and data:

```php
public function handle()
{
    // WordPress functions
    $posts = get_posts(['numberposts' => 10]);

    // WordPress options
    $siteTitle = get_option('blogname');

    // Custom post types
    $products = get_posts(['post_type' => 'product']);

    // User data
    $users = get_users(['role' => 'subscriber']);
}
```

## Error handling

Always include proper error handling in your commands:

```php
public function handle()
{
    try {
        // Command logic here
        $this->components->info('Operation completed successfully!');
        return 0; // Success
    } catch (\Exception $e) {
        $this->components->error('Operation failed: ' . $e->getMessage());
        return 1; // Error
    }
}
```
