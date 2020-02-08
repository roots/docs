const { startCase, toLower } = require('lodash');

module.exports = (options, ctx) => ({
  // alias() {
  //   const { themeConfig, siteConfig } = ctx;
  //
  //   const isAlgoliaSearch =
  //     themeConfig.algolia ||
  //     Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
  //       base => themeConfig.locales[base].algolia
  //     );
  //
  //   return {
  //     '@AlgoliaSearchBox': isAlgoliaSearch
  //       ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
  //       : path.resolve(__dirname, 'noopModule.js')
  //   };
  // },

  extendPageData(page) {
    if (!page.path || !page.title) {
      return;
    }

    const category = page.path.split('/')[1] || false;
    const version = page.path.split('/')[2] || false;
    const current = page.path.split('/')[3] || false;
    const versions = page._context.themeConfig.versions[category] || false;

    const prefix = !current || !version || version === 'master' ? startCase(toLower(category)) : `${startCase(toLower(category))} ${version}`;

    page.frontmatter.metaTitle = `${prefix}: ${page.title} | ${page._context.siteConfig.title}`;
  },

  plugins: {
    'seo': {
      title: page => {
        if (!page.path) {
          return page.title;
        }

        const current = page.path.split('/')[1] || false;
        const version = page.path.split('/')[2] || false;
        const versions = page._context.themeConfig.versions[current] || false;

        const prefix = !version || version === 'master' ? startCase(toLower(current)) : `${startCase(toLower(current))} ${version}`;

        return `${prefix}: ${page.title}`;
      },
    },
  },

  extend: '@vuepress/theme-default',
});
