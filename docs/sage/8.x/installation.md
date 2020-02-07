# Installation

Install Sage by copying the project into a new folder within your WordPress themes directory.

Make sure all dependencies have been installed before moving on:

- [WordPress](https://wordpress.org/) >= 4.7
- [PHP](http://php.net/manual/en/install.php) >= 7.0 (with [`php-mbstring`](http://php.net/manual/en/book.mbstring.php) enabled)
- [Composer](https://getcomposer.org/download/)
- [Node.js](http://nodejs.org/) >= 6.9.x
- [Yarn](https://yarnpkg.com/en/docs/install)

Install Sage using Composer from your WordPress themes directory (replace `your-theme-name` below with the name of your theme):

```bash
# @ app/themes/ or wp-content/themes/
$ composer create-project roots/sage your-theme-name
```

From the command line on your host machine (not on your Vagrant box), navigate to the theme directory then run `yarn`:

```bash
# @ themes/your-theme-name/
$ yarn
```

You now have all the necessary dependencies to run the [build process](/sage/theme-development-and-building/#available-build-commands).

### Getting ready for Browsersync

If you later want to use Browsersync during `yarn run start` you need to update `devUrl` at the bottom of `assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `https://project-name.test` you would update the file to read:
```json
...
  "devUrl": "https://project-name.test",
...
```
