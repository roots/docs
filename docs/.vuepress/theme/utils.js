const Route = page => {
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

const Category = page => {
  const { startCase, toLower } = require('lodash');

  const category = startCase(
    toLower(Route(page).category)
  );

  if (!Route(page).current || Route(page).version === 'master') {
    return category;
  }

  return `${category} ${Route(page).version}`;
}

module.exports = {
  Category,
  Route
}
