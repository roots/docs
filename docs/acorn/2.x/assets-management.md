# Assets Management

Acorn's asset management system is meant to make handling your assets easier and more fluent. It also integrates with the build process, automatically handling things like cache-busting filenames, manifests, chunking, etc.

## Helper Functions

Although you can interact directly with the [underlying systems](https://github.com/roots/acorn/tree/2.x/src/Roots/Acorn/Assets) if you like, Acorn makes some helper functions available to you in the `Roots` namesspace:

## asset()

`asset(string $asset, ?string $manifest): Asset` - This returns an Asset object, which you can chain off of in several ways. `Roots\asset()` is the function to use if you want to deal with a single file, such as an image in your theme.
  
```
$name = 'sandwich.png';

echo asset($name)->uri(); // https://tasty.food/theme/kitchen/assets/sandwich.png
echo asset($name)->path(); // /srv/www/site/app/themes/kitchent/assets/sandwich.ong

// When treated as a string, and Asset will return the URI of its asset:
echo asset($name); // https://tasty.food/theme/kitchen/assets/sandwich.png
```

Asset has many chainable methods:

- `uri(): string` - The public URI (which you may know collquially as a URL) of the asset.
- `path(): string` - The filesystem path of the asset on your server.
- `exists(): bool` - Whether the asset exists.
- `contents(): string` - The raw content of the asset. Useful for SVGs and the like; less useful for a PNG.
- `base64(): string` - The raw content, but encoded in base64.
- `dataUrl(): string` - The asset in data URL form, like you might use in CSS.
- `dataUri(): string` - Alias of `dataUrl()`.
- `contentType(): string|false` - The data type of the asset if it can be determined; `false` otherwise.
- `mimeType(): string|false` - The MIME type of the asset, if it can be determined; `false` otherwise.
- `file(): SplFileInfo` - An [SplFileInfo](https://www.php.net/manual/en/class.splfileinfo.php) instance of the asset. If you don't know what that is, you probably don't need it.

## bundle()

`bundel(string $bundle, ?string $manifest = null): Bundle` - This returns a Bundle object, which you can use to enqueue and interact with your JS and CSS depencencies.

```
$name = 'app';

// Enqueues all of the JS and CSS dependencies in the `app` bundle.
add_action('wp_enqueue_scripts, function() {
  bundle($name)->enqueue();
}, 100);

// Enqueues only the CSS dependencies in the `app` bundle.
add_action('wp_enqueue_scripts' function() {
  bundle($app)->enqueueCss();
}, 100);
  



[Source] in the meantime.
