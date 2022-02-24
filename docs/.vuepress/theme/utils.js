/**
 * Returns an object containing the split route paths.
 *
 * @param  {object} page
 * @return {object}
 */
const route = page => {
  if (!page.path) {
    return;
  }

  return {
    path: page.path,
    category: page.path.split('/')[1] || false,
    version: page.path.split('/')[2] || 'master',
    current: page.path.split('/')[3] || false,
  };
}

/**
 * Returns a title-cased category and version.
 *
 * @param  {object} page
 * @return {string}
 */
const category = page => {
  const { startCase, toLower } = require('lodash');

  let category = route(page).category;

  if (! category) {
    return null;
  }

  category = startCase(toLower(category));

  if (!route(page).current || route(page).version === 'master') {
    return category;
  }

  return `${category} ${route(page).version}`;
}

/**
 * Converts a timestamp into an ISO string.
 *
 * @param  {mixed} value
 * @return {string}
 */
const date = value => {
  return value && (new Date(value)).toISOString();
}

module.exports = {
  category,
  route,
  date,
}
