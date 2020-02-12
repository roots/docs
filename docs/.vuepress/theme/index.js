const path = require('path')
const { Category, Route } = require('./utils')

module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx;

    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      );

    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    };
  },

  extendPageData(page) {
    if (!page.path || !page.title) {
      return;
    }

    page.routes = Route(page);
    page.frontmatter.metaTitle = `${Category(page)}: ${page.title} | ${page._context.siteConfig.title}`;
  },

  plugins: {
    'seo': {
      title: page => {
        if (!page.path) {
          return page.title;
        }

        return `${Category(page)}: ${page.title}`;
      },
    },

    '@silvanite/tailwind': {
      purgecss: { enabled: true },
    },

    '@vuepress/back-to-top': true,
  },

  extend: '@vuepress/theme-default',
});
