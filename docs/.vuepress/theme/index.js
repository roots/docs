const path = require('path')
const { merge } = require('lodash')
const { category, route, date } = require('./utils')

module.exports = (options, context) => ({
  alias() {
    const { themeConfig, siteConfig } = context;

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
    const { siteConfig, themeConfig } = page._context;

    if (!page.path || !page.title) {
      return;
    }

    const meta = merge({
      image: page.frontmatter.image && ((themeConfig.domain || '') + page.frontmatter.image),
      locale: 'en_US',
      type: 'article',
      title: `${category(page)}: ${page.title} | ${siteConfig.title}`,
      description: page.frontmatter.description,
      excerpt: page.frontmatter.excerpt,
      url: (themeConfig.domain || siteConfig.base) + page.path,
      siteName: siteConfig.title,
      facebook: {
        url: false,
        appId: false,
      },
      twitter: {
        username: false,
        card: 'summary_large_image',
      },
      date: {
        published: (page.frontmatter.date || page.lastUpdated) && date(page.frontmatter.date || page.lastUpdated),
        modified: page.lastUpdated && date(page.lastUpdated)
      },
    }, themeConfig.seo || {});

    page.frontmatter.metaTitle = meta.title;
    page.frontmatter.description = meta.description;
    page.frontmatter.meta = [
      { property: 'og:image', content: meta.image },
      { property: 'og:locale', content: meta.locale },
      { property: 'og:type', content: meta.type },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:url', content: meta.url },
      { property: 'og:site_name', content: meta.siteName },
      { property: 'og:updated_time', content: meta.date.modified },
      { property: 'fb:app_id', content: meta.facebook.appId },
      { property: 'article:publisher', content: meta.facebook.url },
      { property: 'article:published_time', content: meta.date.published },
      { property: 'article:modified_time', content: meta.date.modified },
      { name: 'twitter:site', content: meta.twitter.username },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:url', content: meta.url },
      { name: 'twitter:card', content: meta.twitter.card },
      { name: 'twitter:image', content: meta.image },
    ].filter(item => item.content);

    page.excerpt = meta.excerpt;
    page.routes = route(page);
  },

  plugins: {
    '@vuepress/back-to-top': true,
    '@silvanite/tailwind': { purgecss: { enabled: false } },
  },

  extend: '@vuepress/theme-default',
});
