# Theme Deployment

To deploy a Sage theme you'll need to make sure two things are covered:

1. Run `composer install` from the theme directory on the remote server
2. Copy over production theme assets (the `dist/` folder)

Generate production ready assets with `yarn build:production`, which will build your assets with versioned filenames to the `dist/` folder.

## Deploying Sage with Trellis

If you use [Trellis](/trellis/), you can build your assets locally (or on a CI server), then copy them to the remote server during deployment. [See the `build-before.yml` example hook](https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml) in Trellis.

## Deploying Sage on Kinsta

[Kinsta supports Bedrock and Trellis](https://kinsta.com/blog/bedrock-trellis/?kaid=OFDHAJIXUDIV), so deploying Sage with Trellis on [Kinsta](?kaid=OFDHAJIXUDIV) is possible by following a few extra steps. 

## Deploying Sage on WP Engine

The [Sage 9 on WP Engine](https://discourse.roots.io/t/sage-9-on-wpengine/9090) thread on Roots Discourse covers how to work around limitations on WP Engine to deploy your theme.

We do not officially recommend or support this and suggest using a WordPress host that supports SSH, Git, Composer, and the latest PHP versions.

## Deploying Sage via FTP

If you don't have permission to run `composer` on the production server and/or are using a shared hosting service, you may want to deploy Sage with FTP. To do so, [compile your assets for production](https://roots.io/sage/docs/theme-development-and-building/#available-build-commands) and run `composer install --no-dev` in your theme directory. Upload all files and folders in your theme except the `node_modules` directory to your host.
