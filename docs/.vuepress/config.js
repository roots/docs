module.exports = {
  title: 'Roots Documentation',
  base: '/docs/',
  dest: './docs/.vuepress/dist/docs',

  plugins: {
    'vuepress-plugin-clean-urls': {
      normalSuffix: '/',
      indexSuffix: '/',
      notFoundPath: '/404.html',
    },
    'sitemap': {
      hostname: 'https://roots.io/docs',
      changefreq: 'weekly',
    },
    'vuepress-plugin-canonical': {
      baseURL: 'https://roots.io/docs',
    },
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
    'minimal-analytics': { ga: 'UA-71591-42' },
  },

  head: [
    ['link', { rel: 'icon', href: 'https://cdn.roots.io/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://cdn.roots.io/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,400i,500,600,800',
      rel: 'stylesheet',
      type: 'text/css',
    }],
    ['script', { src: 'https://static.getclicky.com/js' }],
    ['script', {}, `var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(66406668);`],
  ],

  themeConfig: {
    domain: 'https://roots.io/docs',
    logo: '/logo.svg',
    searchPlaceholder: 'Search Docs',

    repoLabel: 'GitHub',
    repo: 'roots/docs',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'master',
    editLinkText: 'Help us improve this page.',
    lastUpdated: 'Last Updated',

    seo: {
      locale: 'en_US',
      type: 'article',
      image: 'https://cdn.roots.io/app/uploads/roots-og-updated.png',
      twitter: {
        username: '@rootswp',
        card: 'summary_large_image',
      },
      facebook: {
        url: 'https://www.facebook.com/rootswp',
        appId: '1022828784420871',
      },
    },

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
      '/': require('./sidebar'),
    },

    versions: {
      'trellis': ['master'],
      'bedrock': ['master'],
      'sage': ['9.x', '8.x'],
    },
  },

  extraWatchFiles: [
    '.vuepress/theme',
  ]
}
