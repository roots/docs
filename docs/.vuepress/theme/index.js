// const path = require('path');
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
    const { _context, path, frontmatter, title } = page;

    if (!path || !title) {
      return;
    }

    const current = path.split('/')[1] || false;
    const version = path.split('/')[2] || false;
    const versions = _context.themeConfig.versions[current] || false;

    if (!version || !versions) {
      return;
    }

    const prefix = version === 'master' ? startCase(toLower(current)) : `${startCase(toLower(current))} ${version}`;

    frontmatter.metaTitle = `${prefix}: ${(frontmatter.metaTitle || title)} | ${_context.siteConfig.title}`;
  },
  extend: '@vuepress/theme-default'
});
