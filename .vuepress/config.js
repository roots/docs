module.exports = {
  title: 'Roots',
  description: 'Empower your WordPress development workflow.',
  base: '/',

  serviceWorker: true,

  plugins: [
    '@vuepress/pwa',
    '@vuepress/back-to-top',
  ],

  head: [
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css?family=Nunito:300,400,400i,500,600,800",
        rel: "stylesheet",
        type: "text/css"
      }
    ],
    [
      "link",
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ],
    [
      "link",
      {
        rel: 'icon',
        href: 'https://cdn.roots.io/apple-touch-icon.png'
      }
    ]
  ],

  themeConfig: {
    displayAllHeaders: false,
    sidebarDepth: 2,

    nav: [
      { text: 'Support', link: 'https://discourse.roots.io' },
      { text: 'GitHub', link: 'https://github.com/roots' }
    ],

    sidebar: [
      {
        title: 'Getting Started',
        collapsable: true,
        children: prefix('getting-started', [
          'macos',
          'ubuntu-linux',
          'windows',
          'roots-example-project'
        ]),
      },
      {
        title: 'Trellis',
        collapsable: true,
        children: prefix('trellis', [
          'database-access',
          'debugging-php',
          'deploys',
          'existing-trellis-projects',
          'fastcgi-caching',
          'installation',
          'local-development',
          'mail',
          'multisite',
          'nginx-includes',
          'passwords',
          'remote-server-setup',
          'security',
          'server-logs',
          'ssh-keys',
          'ssl',
          'troubleshooting',
          'user-contributed-extensions',
          'vagrantfile',
          'vault',
          'wordpress-sites',
        ]),
      },
      {
        title: 'Bedrock',
        collapsable: true,
        children: prefix('bedrock', [
          'installation',
          'compatability',
          'composer',
          'configuration-files',
          'environment-variables',
          'folder-structure',
          'server-configuration',
          'deployment',
          'local-development',
          'mu-plugin-autoloader',
          'wp-cron',
        ])
      },
      {
        title: 'Sage',
        collapsable: true,
        children: prefix('sage', [
          'blade-templates',
          'compatibility',
          'existing-sage-projects',
          'gutenberg',
          'theme-configuration-and-setup',
          'theme-deployment',
          'theme-development-and-building',
          'theme-functionality',
          'theme-installation',
          'theme-localization',
          'theme-sidebar',
          'theme-templates',
        ]),
      },
    ],
  }
}

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
