module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      'master/installation',
      'master/compatability',
      'master/configuration',
      'master/deployment',
    ],
  },
  {
    title: 'The Basics',
    collapsable: false,
    children: [
      'master/composer',
      'master/environment-variables',
      'master/folder-structure',
      'master/server-configuration',
      'master/local-development',
    ],
  },
  {
    title: 'Digging Deeper',
    collapsable: false,
    children: [
      'master/mu-plugin-autoloader',
      'master/wp-cron',
    ],
  },
];

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`);
}
