---
date_modified: 2026-03-08 16:05
date_published: 2026-03-08 16:05
description: Learn how to run tests in Bedrock using Pest (powered by PHPUnit), create feature tests, and run the suite locally and in CI.
title: Testing Bedrock with Pest
authors:
  - ben
---
# Testing Bedrock with Pest

Bedrock includes a minimal testing setup based on [Pest](https://pestphp.com/) (powered by PHPUnit).

## Running tests

Run the test suite from your Bedrock root:

```shell
$ composer test
```

## Default test structure

Bedrock ships with these testing files:

- `phpunit.xml.dist` - PHPUnit configuration used by Pest
- `tests/Pest.php` - Pest bootstrap and shared test configuration
- `tests/Feature/ExampleTest.php` - Example test

## Writing tests

Add tests anywhere under `tests/`:

```php
<?php

test('home URL is configured', function () {
    expect(env('WP_HOME'))->not->toBeEmpty();
});
```

Then run:

```shell
$ composer test
```

## Scope of the default setup

The default setup is intentionally minimal and framework-agnostic:

- It gives you a ready-to-run PHP testing baseline
- It does **not** include WordPress core integration test bootstrap or database test provisioning

If you need deeper WordPress integration testing, you can extend this baseline with your preferred tooling.
