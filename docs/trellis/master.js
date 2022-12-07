module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      'master/installation',
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
      'master/passwords',
      'master/database-access',
      'master/server-logs',
      'master/multisite',
      'master/vagrant',
      'master/existing-projects',
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
      'master/fail2ban'
    ],
  },
  {
    title: 'Digging Deeper',
    collapsable: false,
    children: [
      'master/ansible',
      'master/composer-http-basic-authentication',
      'master/mail',
      'master/nginx-includes',
      'master/fastcgi-caching',
      'master/sage-integration',
    ],
  },
  {
    title: 'Troubleshooting',
    collapsable: false,
    children: [
      'master/python',
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
  {
    title: 'Guides',
    children: [
      'master/guides/deploy-to-digitalocean',
      'master/guides/install-wordpress-language-files',
    ],
  },
];
