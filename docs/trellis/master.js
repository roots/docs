module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      'master/installation',
      'master/existing-projects',
    ],
  },
  {
    title: 'The Basics',
    collapsable: false,
    children: [
      'master/wordpress-sites',
      'master/local-development',
      'master/remote-server-setup',
      'master/deployments',
      'master/multisite',
      'master/passwords',
      'master/database-access',
      'master/server-logs',
      'master/vagrantfile',
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
    title: 'Digging Deeper',
    collapsable: false,
    children: [
      'master/mail',
      'master/nginx-includes',
      'master/fastcgi-caching',
      'master/bedrock-integration',
      'master/sage-integration',
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
