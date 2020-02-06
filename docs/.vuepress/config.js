module.exports = {
  title: 'Roots Documentation',
  base: '/docs/',
  serviceWorker: true,

  plugins: [
    '@vuepress/pwa',
    '@vuepress/back-to-top',
    ['vuepress-plugin-redirect', {
      redirectors: [
        { base: '/sage/', storage: true, alternative: ['master/installation', '10.x/installation', '9.x/installation'] },
        { base: '/bedrock/', storage: true, alternative: ['master/installation'] },
        { base: '/trellis/', storage: true, alternative: ['master/installation'] },
        { base: '/', storage: true, alternative: ['getting-started/macos'] },
      ],
    }],
  ],

  head: [
    [
      'link', {
        href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,400i,500,600,800',
        rel: 'stylesheet',
        type: 'text/css'
      }
    ],
    [
      'link', {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ],
    [
      'link', {
        rel: 'icon',
        href: 'https://cdn.roots.io/apple-touch-icon.png'
      }
    ]
  ],

  themeConfig: {
    logo: '/logo.svg',
    searchPlaceholder: 'Search Docs',

    repoLabel: 'GitHub',
    repo: 'roots/docs',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'master',
    editLinkText: 'Help us improve this page.',
    lastUpdated: 'Last Updated',

    nav: [
      {
        text: 'Ecosystem', ariaLabel: 'Ecosystem Menu', link: '/', items: [
          { text: 'Sage', link: '/sage/' },
          { text: 'Bedrock', link: '/bedrock/' },
          { text: 'Trellis', link: '/trellis/' }
        ]
      },
      { text: 'Support', link: 'https://discourse.roots.io' },
    ],

    sidebar: {
      '/trellis/master': require('../trellis/master'),
      '/bedrock/master': require('../bedrock/master'),
      '/sage/8.x': require('../sage/8.x'),
      '/sage/9.x': require('../sage/9.x'),
      '/': require('./sidebar'),
    },

    versions: {
      'trellis': ['master'],
      'bedrock': ['master'],
      'sage': ['10.x', '9.x', '8.x'],
    },
  }
}
