---
date_modified: 2025-08-06 14:00
date_published: 2025-08-06 14:00
description: Use Laravel's migration system in WordPress through Acorn. Create, modify, and manage custom database tables with Artisan migration commands.
title: Creating and Running Laravel Migrations
authors:
  - ben
---

# Creating and Running Laravel Migrations

Acorn brings Laravel's powerful migration system to WordPress, allowing you to version control your database schema and manage custom tables with ease. Each migration contains instructions for creating or modifying database tables.

We recommend referencing the [Laravel docs on Database Migrations](https://laravel.com/docs/12.x/migrations) for a complete understanding of the migration system.

## Creating your first migration

To create a new migration, use the `make:migration` command:

```bash
$ wp acorn make:migration create_app_settings_table
```

This will create a new migration file in `database/migrations/` with a timestamp prefix, like `2025_08_06_140000_create_app_settings_table.php`.

### Migration file structure

A typical migration contains two methods:
- `up()` - Defines changes to apply
- `down()` - Defines how to reverse those changes

Here's an example migration for an app settings table:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->string('group')->default('general');
            $table->boolean('is_public')->default(false);
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index('group');
            $table->index('is_public');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_settings');
    }
};
```

## Running migrations

To run all pending migrations:

```bash
$ wp acorn migrate
```

To see the status of your migrations:

```bash
$ wp acorn migrate:status
```

To rollback the last batch of migrations:

```bash
$ wp acorn migrate:rollback
```

## Adding columns to existing tables

To add columns to an existing table, create a new migration:

```bash
$ wp acorn make:migration add_encrypted_to_app_settings_table
```

```php
public function up(): void
{
    Schema::table('app_settings', function (Blueprint $table) {
        $table->boolean('is_encrypted')->default(false)->after('is_public');
    });
}

public function down(): void
{
    Schema::table('app_settings', function (Blueprint $table) {
        $table->dropColumn('is_encrypted');
    });
}
```

## Deployment

You should run migrations as part of your deployment process. Add this to your deployment script after `wp acorn optimize`:

```bash
$ wp acorn optimize
$ wp acorn migrate --force
```

The `--force` flag runs migrations without confirmation prompts in production environments.

## Troubleshooting

If you get an error about the migrations table not existing, run:

```bash
$ wp acorn migrate:install
```
