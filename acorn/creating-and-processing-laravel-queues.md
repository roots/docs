---
date_modified: 2026-03-04 00:00
date_published: 2025-09-29 00:00
description: Use Laravel's queue system in WordPress through Acorn. Process background jobs, handle async tasks, and schedule recurring operations efficiently.
title: Creating and Processing Laravel Queues
authors:
  - ben
---

# Creating and Processing Laravel Queues

Acorn brings Laravel's robust queue system to WordPress, enabling you to defer time-consuming tasks like image processing, email sending, or API calls to background jobs. This improves your application's response time and user experience by handling heavy operations asynchronously.

We recommend referencing the [Laravel docs on Queues](https://laravel.com/docs/12.x/queues) for a complete understanding of the queue system.

## Setting up the queue system

Before you can start using queues, you need to create the necessary database tables to store jobs and track their status.

### 1. Generate queue tables

Create the migration files for queue functionality:

#### Generate the jobs table migration

```bash
$ wp acorn queue:table
```

#### Generate the job batches table (optional, for batch processing)

```bash
$ wp acorn queue:batches-table
```

### 2. Run migrations

Apply the migrations to create the required tables:

```bash
$ wp acorn migrate
```

This will create:
- A `jobs` table to store queued jobs
- A `job_batches` table for batch job processing (if generated)
- A `failed_jobs` table to track failed job attempts

## Creating your first job

To create a new job class, use the `make:job` command:

```bash
$ wp acorn make:job ProcessImageOptimization
```

This creates a new job file in `app/Jobs/` with the basic structure needed for a queue job.

### Job file structure

A typical job class contains several key components:

```php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessImageOptimization implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Number of times the job may be attempted
     */
    public $tries = 3;

    /**
     * Number of seconds to wait before retrying
     */
    public $backoff = [30, 60, 120];

    /**
     * Number of seconds the job can run before timing out
     */
    public $timeout = 180;

    /**
     * The attachment ID to process
     */
    protected int $attachmentId;

    /**
     * Create a new job instance
     */
    public function __construct(int $attachmentId)
    {
        $this->attachmentId = $attachmentId;
    }

    /**
     * Execute the job
     */
    public function handle(): void
    {
        Log::info("Processing image optimization for attachment: {$this->attachmentId}");

        $attachment = get_post($this->attachmentId);

        if (!$attachment || $attachment->post_type !== 'attachment') {
            Log::error("Invalid attachment ID: {$this->attachmentId}");
            return;
        }

        $file_path = get_attached_file($this->attachmentId);

        // Your image optimization logic here
        // For example, using an image optimization library

        // Mark as processed using post meta
        update_post_meta($this->attachmentId, '_processed', true);
        update_post_meta($this->attachmentId, '_processed_at', current_time('timestamp'));

        Log::info("Successfully optimized image: {$this->attachmentId}");
    }

    /**
     * Handle a job failure
     */
    public function failed(\Throwable $exception): void
    {
        Log::error("Failed to optimize image {$this->attachmentId}: {$exception->getMessage()}");

        // Notify administrators or take other actions
    }
}
```

## Dispatching jobs

Once you've created a job, you can dispatch it from anywhere in your application:

### Basic dispatching

```php
use App\Jobs\ProcessImageOptimization;

// Dispatch a job to the default queue
ProcessImageOptimization::dispatch($attachmentId);

// Dispatch with a delay
ProcessImageOptimization::dispatch($attachmentId)
    ->delay(now()->addMinutes(5));

// Dispatch to a specific queue
ProcessImageOptimization::dispatch($attachmentId)
    ->onQueue('images');
```

### WordPress hook integration

Integrate queue jobs with WordPress hooks for automatic processing:

```php
// In your theme's functions.php or a service provider
add_action('add_attachment', function ($attachmentId) {
    \App\Jobs\ProcessImageOptimization::dispatch($attachmentId);
});

// Process form submissions asynchronously
add_action('gform_after_submission', function ($entry, $form) {
    \App\Jobs\ProcessFormSubmission::dispatch($entry['id']);
}, 10, 2);
```

## Processing queued jobs

To process jobs in the queue, you need to run a queue worker.

### Running a queue worker

#### Process jobs continuously

```bash
$ wp acorn queue:work
```

#### Process jobs from a specific queue

```bash
$ wp acorn queue:work --queue=high,default
```

#### Process a single job and exit

```bash
$ wp acorn queue:work --once
```

#### Process jobs for a specific duration

```bash
$ wp acorn queue:work --stop-when-empty
```


## Managing failed jobs

When jobs fail after all retry attempts, they're moved to the `failed_jobs` table.

### View failed jobs

```bash
$ wp acorn queue:failed
```

### Retry all failed jobs

```bash
$ wp acorn queue:retry all
```

### Retry specific job

```bash
$ wp acorn queue:retry 5
```

### Retry multiple jobs

```bash
$ wp acorn queue:retry 5 6 7
```

### Remove all failed jobs

```bash
$ wp acorn queue:flush
```

### Remove a specific failed job

```bash
$ wp acorn queue:forget 5
```

## Running queues in production

### Keeping the worker running with Supervisor

In production, use a process monitor like [Supervisor](http://supervisord.org/) to keep the queue worker running permanently:

```ini
[program:acorn-worker]
process_name=%(program_name)s_%(process_num)02d
command=wp acorn queue:work --sleep=3 --tries=3 --max-time=3600
directory=/path/to/your/site
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/your/site/worker.log
stopwaitsecs=3600
```

### Restarting workers during deployment

Long-running `queue:work` processes keep the application booted in memory, so they won't pick up code changes after a deployment. Use `queue:restart` to gracefully restart all workers:

```bash
$ wp acorn queue:restart
```

This signals workers to exit after finishing their current job, allowing Supervisor to start fresh instances with the updated code. Add this to your deployment script to ensure workers always run the latest version of your code.

### Pausing and resuming workers

You can pause and resume queue processing without stopping the worker processes:

```bash
# Pause processing
$ wp acorn queue:pause

# Resume processing
$ wp acorn queue:resume
```

### Monitoring queue sizes

Monitor queue sizes to detect backlogs:

```bash
$ wp acorn queue:monitor
```
