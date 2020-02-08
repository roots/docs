module.exports = {
  title: 'Roots Documentation',
  base: '/docs/',

  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
    '@vuepress/back-to-top': true,
    // 'minimal-analytics': { ga: 'UA-71591-42' },
    '@silvanite/tailwind': {
      purgecss: { enabled: true },
    },
  },

  head: [
    ['link', {
      href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,400i,500,600,800',
      rel: 'stylesheet',
      type: 'text/css',
    }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'icon', href: 'https://cdn.roots.io/apple-touch-icon.png' }],
    // ['script', { src: 'https://static.getclicky.com/js' }],
    // ['script', {}, `var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(66406668);`],
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

    // algolia: {
    //   indexName: 'roots',
    //   apiKey: '16a75919d4869134bee2b3237330a2e0',
    // },

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
      '/sage/10.x': require('../sage/10.x'),
      '/': require('./sidebar'),
    },

    versions: {
      'trellis': ['master'],
      'bedrock': ['master'],
      'sage': ['10.x', '9.x', '8.x'],
    },
  }
}
