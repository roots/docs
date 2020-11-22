---
description: Lorem ipsum...
---

# Theme Structure

```sh
themes/your-theme-name/   # → Root of your Sage based theme
├── app/                  # → Theme PHP
│   ├── View/             # → View models
│   ├── Providers/        # → Service providers
│   ├── admin.php         # → Theme customizer setup
│   ├── filters.php       # → Theme filters
│   ├── helpers.php       # → Helper functions
│   └── setup.php         # → Theme setup
├── config/               # → Config files
│   ├── app.php           # → Application configuration
│   ├── assets.php        # → Asset configuration
│   ├── filesystems.php   # → Filesystems configuration
│   ├── logging.php       # → Logging configuration
│   └── view.php          # → View configuration
├── composer.json         # → Autoloading for `app/` files
├── composer.lock         # → Composer lock file (never edit)
├── dist/                 # → Built theme assets (never edit)
├── functions.php         # → Theme bootloader
├── index.php             # → Theme template wrapper
├── node_modules/         # → Node.js packages (never edit)
├── package.json          # → Node.js dependencies and scripts
├── resources/            # → Theme assets and templates
│   ├── assets/           # → Front-end assets
│   │   ├── fonts/        # → Theme fonts
│   │   ├── images/       # → Theme images
│   │   ├── scripts/      # → Theme javascript
│   │   └── styles/       # → Theme stylesheets
│   └── views/            # → Theme templates
│       ├── components/   # → Component templates
│       ├── form/         # → Form templates
│       ├── layouts/      # → Base templates
│       └── partials/     # → Partial templates
├── screenshot.png        # → Theme screenshot for WP admin
├── storage/              # → Storage location for cache (never edit)
├── style.css             # → Theme meta information
├── vendor/               # → Composer packages (never edit)
└── webpack.mix.js        # → Laravel Mix configuration
```
