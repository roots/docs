module.exports = {
  title: 'Roots Documentation',
  base: '/',
  dest: './docs/.vuepress/dist',

  plugins: {
    'vuepress-plugin-clean-urls': {
      normalSuffix: '/',
      indexSuffix: '/',
      notFoundPath: '/404.html',
    },
    'sitemap': {
      hostname: 'https://docs.roots.io',
      changefreq: 'weekly',
    },
    'vuepress-plugin-canonical': {
      baseURL: 'https://docs.roots.io',
    },
    'minimal-analytics': { ga: 'UA-71591-42' },
    'code-switcher': {},
    'check-md': {},
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
    ['script', {}, `var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(66406668);`],
    ['script', { src: 'https://static.getclicky.com/js' }],
  ],

  themeConfig: {
    domain: 'https://docs.roots.io',
    logo: '/logo.svg',
    searchPlaceholder: 'Search Docs',

    repoLabel: 'GitHub',
    repo: 'roots/docs',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'docs',
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
    },

    algolia: {
      indexName: 'roots',
      apiKey: '16a75919d4869134bee2b3237330a2e0',
    },

    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      {
        text: 'Projects', ariaLabel: 'Projects Menu', link: '/', items: [
          { text: 'Acorn', link: '/acorn/' },
          { text: 'Bedrock', link: '/bedrock/' },
          { text: 'Bud', link: 'https://bud.js.org/' },
          { text: 'Sage', link: '/sage/' },
          { text: 'Trellis', link: '/trellis/' },
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
      '/acorn/2.x': require('../acorn/2.x'),
      '/getting-started': require('./sidebar'),
    },

    versions: {
      'trellis': ['master'],
      'bedrock': ['master'],
      'sage': ['10.x', '9.x', '8.x'],
      'acorn': ['2.x'],
    },
  },

  extraWatchFiles: [
    '.vuepress/theme',
  ]
}
