module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      'master/installation',
      'master/existing-projects',
      'master/deployments',
    ],
  },
  {
    title: 'The Basics',
    collapsable: false,
    children: [
      'master/wordpress-sites',
      'master/multisite',
      'master/passwords',
      'master/local-development',
      'master/remote-server-setup',
      'master/database-access',
      'master/vagrantfile',
    ],
  },
  {
    title: 'Digging Deeper',
    collapsable: false,
    children: [
      'master/mail',
      'master/nginx-includes',
      'master/fastcgi-caching',
    ],
  },
  {
    title: 'Security',
    collapsable: false,
    children: [
      'master/security',
      'master/vault',
      'master/ssh-keys',
      'master/ssl',
    ],
  },
  {
    title: 'Troubleshooting',
    collapsable: false,
    children: [
      'master/troubleshooting',
      'master/debugging-php',
    ],
  },
  {
    title: 'Extensions',
    children: [
      'master/user-contributed-extensions'
    ],
  },
];
