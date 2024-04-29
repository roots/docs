---
date_modified: 2024-04-29 12:00
date_published: 2024-04-29 12:00
description: Learn how to upload and serve your bud.js assets from S3.
title: Upload Build Assets to S3
authors:
  - ben
---

# Upload Build Assets to S3

bud.js supports [uploading build assets to S3](https://bud.js.org/reference/bud.fs/s3), and with a few steps you can configure your Sage theme to upload the assets and serve them from S3.

In this guide, we'll be configuring bud.js to upload the assets to S3 whenever the `WP_ENV` isn't set to `development`.

## Requirements

* S3 bucket
* AWS access key ID
* AWS secret access key

## Configure bud.js to upload assets to S3 

We are going to introduce two new functions to the bud.js config:

* `uploadConditionsMet` — For checking whether or not to upload the assets to S3
* `handleAWSUpload` — For handling the upload

We'll also be adding the following environment variables:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

Open up `bud.config.js` and replace the public path with a conditonal that changes the public path for non-development environments:

```diff
-app.setPublicPath('/app/themes/sage/public/');
+app.when(
+  uploadConditionsMet,
+  () => app.setPublicPath('https://path-to-your-s3-bucket/assets/'),
+  () => app.setPublicPath('/app/themes/sage/public/')
+);
```

Then add a conditional at the end to handle the upload:

```javascript
  app.when(
    uploadConditionsMet, // ...if function returns true
    handleAWSUpload, // do the upload
    () => console.info('skipping S3 upload') // else log that we're skipping
  );
```

Now we'll want to add the new `uploadConditionsMet` and `handleAWSUpload` functions:

```javascript
/**
 * Conditions to be met before uploading to S3
 */
const uploadConditionsMet = ({env}) => {
  return (
    env.get('WP_ENV') !== 'development' &&
    env.isString('AWS_ACCESS_KEY_ID') &&
    env.isString('AWS_SECRET_ACCESS_KEY') 
  );
}

/**
 * Handle configuring S3 and uploading assets
 */
const handleAWSUpload = ({env, fs, path}) => {
  fs.s3.config.set('credentials', {
    accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
  });
  fs.s3.config.set('region', 'us-west-2');
  fs.s3.config.set('bucket', 'your-bucket-name');
  fs.upload({
    source: path('public'),
    destination: 'assets/',
    keep: 5,
  });
};
```

::: tip
[The `keep` option allows the defined amount of builds to stay stored in the bucket](https://bud.js.org/reference/bud.fs/s3#the-keep-option)
:::

After these changes, your build should be configured to upload assets to the defined S3 bucket in a folder named `assets`.

<details>
<summary>Full modified bud.js config</summary>

```javascript
export default async (app) => {
  app
    .entry('app', ['@scripts/app', '@styles/app'])
    .entry('editor', ['@scripts/editor', '@styles/editor'])
    .assets(['images']);

  app.when(
    uploadConditionsMet,
    () => app.setPublicPath('https://path-to-your-s3-bucket/assets/'),
    () => app.setPublicPath('/app/themes/sage/public/')
  );

  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('http://example.test')
    .watch(['resources/views', 'app']);

  app.when(
    uploadConditionsMet, // ...if function returns true
    handleAWSUpload, // do the upload
    () => console.info('skipping S3 upload') // else log that we're skipping
  );

  const uploadConditionsMet = ({env}) => {
    return (
      env.get('WP_ENV') !== 'development' &&
      env.isString('AWS_ACCESS_KEY_ID') &&
      env.isString('AWS_SECRET_ACCESS_KEY') 
    );
  }

  const handleAWSUpload = ({env, fs, path}) => {
    fs.s3.config.set('credentials', {
      accessKeyId: env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
    });
    fs.s3.config.set('region', 'us-west-2');
    fs.s3.config.set('bucket', 'your-bucket-name');
    fs.upload({
      source: path('public'),
      destination: 'assets/',
      keep: 5,
    });
  };
};
```
</details>

## Configure Acorn to serve the assets from S3

Acorn's `config/assets.php` file needs to be modified to tell WordPress to serve the build assets from the S3 bucket.

::: tip
If your installation doesn't already have this file, you'll need to first run `wp acorn vendor:publish --tag=acorn` to publish the configs.
:::

```diff
    'manifests' => [
        'theme' => [
            'path' => get_theme_file_path('public'),
-            'url' => get_theme_file_uri('public'),
+            'url' => (
+                env('WP_ENV') === 'development'
+                ? get_theme_file_uri('public')
+                : 'https://path-to-your-s3-bucket/assets/'
+            ),
            'assets' => get_theme_file_path('public/manifest.json'),
            'bundles' => get_theme_file_path('public/entrypoints.json'),
        ],
    ],
```
