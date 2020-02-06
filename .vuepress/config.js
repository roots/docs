module.exports = {
  title: 'Roots',
  description: 'The official documentation for the WordPress Roots stack.',
  base: '/docs/',

  serviceWorker: true,

  plugins: [
    '@vuepress/pwa',
    '@vuepress/back-to-top',
    ['vuepress-plugin-redirect', {
      redirectors: [
        { base: '/sage/', alternative: ['master/installation', '9.x/installation'] },
        { base: '/bedrock/', alternative: ['master/installation'] },
        { base: '/trellis/', alternative: ['master/installation'] },
      ]
    }]
  ],

  head: [
    [
      'link', {
        href: 'https://fonts.googleapis.com/css?family=Nunito:300,400,400i,500,600,800',
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
    repoLabel: 'GitHub',
    repo: 'roots/docs',
    editLinks: true,
    docsBranch: 'master',
    editLinkText: 'Help us improve this page.',

    nav: [
      {
        text: 'Ecosystem', ariaLabel: 'Ecosystem Menu', items: [
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
    },

    versions: {
      'trellis': ['master'],
      'bedrock': ['master'],
      'sage': ['10.x', '9.x', '8.x'],
    },
  }
}

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
