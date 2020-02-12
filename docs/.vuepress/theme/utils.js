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

const category = page => {
  const { startCase, toLower } = require('lodash');

  const category = startCase(
    toLower(route(page).category)
  );

  if (!route(page).current || route(page).version === 'master') {
    return category;
  }

  return `${category} ${route(page).version}`;
}

const date = value => {
  return value && (new Date(value)).toISOString;
}

module.exports = {
  category,
  route,
  date,
}
