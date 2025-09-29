---
date_modified: 2025-09-29 00:00
date_published: 2025-09-29 00:00
description: Learn how to use Laravel's queue system with Acorn for background processing, async tasks, and job scheduling in WordPress.
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

```bash
# Generate the jobs table migration
$ wp acorn queue:table

# Generate the job batches table (optional, for batch processing)
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

```bash
# Process jobs continuously
$ wp acorn queue:work

# Process jobs from a specific queue
$ wp acorn queue:work --queue=high,default

# Process a single job and exit
$ wp acorn queue:work --once

# Process jobs for a specific duration
$ wp acorn queue:work --stop-when-empty
```

### Queue worker options

| Option | Description |
|--------|-------------|
| `--queue` | Specify queue priorities (comma-separated) |
| `--once` | Process a single job and exit |
| `--stop-when-empty` | Stop when the queue is empty |
| `--max-jobs` | Number of jobs to process before stopping |
| `--max-time` | Maximum time in seconds to run |
| `--sleep` | Seconds to sleep when no jobs are available |
| `--timeout` | Timeout for each job in seconds |

### Production deployment

For production environments, use a process supervisor like Supervisor or systemd to keep queue workers running:

```ini
# /etc/supervisor/conf.d/acorn-worker.conf
[program:acorn-worker]
process_name=%(program_name)s_%(process_num)02d
command=wp acorn queue:work --sleep=3 --tries=3 --max-time=3600
directory=/srv/www/example.com/current
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/acorn-worker.log
```

## Batch processing

For processing multiple related jobs, use batch processing:

```php
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use App\Jobs\ProcessImageOptimization;

$attachmentIds = [123, 456, 789];

$batch = Bus::batch([])
    ->then(function (Batch $batch) {
        Log::info('All images optimized successfully');
    })
    ->catch(function (Batch $batch, \Throwable $e) {
        Log::error('Batch processing failed: ' . $e->getMessage());
    })
    ->finally(function (Batch $batch) {
        Log::info('Batch processing complete');
    })
    ->name('Image Optimization Batch')
    ->dispatch();

foreach ($attachmentIds as $id) {
    $batch->add(new ProcessImageOptimization($id));
}
```

## Managing failed jobs

When jobs fail after all retry attempts, they're moved to the `failed_jobs` table.

### View failed jobs

```bash
$ wp acorn queue:failed
```

### Retry failed jobs

```bash
# Retry all failed jobs
$ wp acorn queue:retry all

# Retry specific job
$ wp acorn queue:retry 5

# Retry multiple jobs
$ wp acorn queue:retry 5 6 7
```

### Clear failed jobs

```bash
# Remove all failed jobs
$ wp acorn queue:flush

# Remove a specific failed job
$ wp acorn queue:forget 5
```

## Common use cases

### Email queue

```php
namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;

class SendWelcomeEmail implements ShouldQueue
{
    protected $user;

    public function __construct($userId)
    {
        $this->user = get_user_by('id', $userId);
    }

    public function handle(): void
    {
        if (!$this->user) {
            return;
        }

        Mail::to($this->user->user_email)
            ->send(new WelcomeEmail($this->user));
    }
}
```

### API synchronization

```php
namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;

class SyncProductToApi implements ShouldQueue
{
    public $tries = 5;
    public $backoff = [60, 120, 300, 600, 1200];

    protected $productId;

    public function __construct($productId)
    {
        $this->productId = $productId;
    }

    public function handle(): void
    {
        $product = wc_get_product($this->productId);

        if (!$product) {
            return;
        }

        $response = Http::post('https://api.example.com/products', [
            'sku' => $product->get_sku(),
            'name' => $product->get_name(),
            'price' => $product->get_price(),
            'stock' => $product->get_stock_quantity(),
        ]);

        if (!$response->successful()) {
            throw new \Exception('API sync failed: ' . $response->body());
        }
    }
}
```

### Scheduled report generation

```php
namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateMonthlyReport implements ShouldQueue
{
    public $timeout = 600; // 10 minutes

    public function handle(): void
    {
        $startDate = now()->startOfMonth()->subMonth();
        $endDate = now()->startOfMonth()->subDay();

        // Generate report data
        $orders = wc_get_orders([
            'date_created' => $startDate->timestamp . '...' . $endDate->timestamp,
            'status' => ['completed', 'processing'],
            'limit' => -1,
        ]);

        // Process and save report
        $reportData = $this->processOrderData($orders);
        $this->saveReport($reportData);

        // Email to administrators
        wp_mail(
            get_option('admin_email'),
            'Monthly Sales Report',
            'Your monthly report has been generated.',
            ['Content-Type: text/html; charset=UTF-8']
        );
    }

    protected function processOrderData($orders): array
    {
        // Report generation logic
        return [];
    }

    protected function saveReport($data): void
    {
        // Save report to database or file
    }
}
```
