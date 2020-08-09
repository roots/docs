module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      'master/installation',
      'master/config',
      'master/guide-using-extensions',
      'master/compiling-assets',
      'master/cli',
    ],
  },
  {
    title: 'Configuration',
    collapsable: true,
    children: [
      'master/config-bundle',
      'master/config-projectPath',
      'master/config-project',
      'master/config-src',
      'master/config-srcPath',
      'master/config-dist',
      'master/config-distPath',
    ],
  },
  {
    title: 'Extensions',
    collapsable: true,
    children: [
      'master/extensions',
      'master/bud-tailwind',
      'master/bud-eslint',
      'master/bud-sass',
      'master/bud-stylelint',
    ],
  },
  {
    title: 'API',
    collapsable: true,
    children: [
      'master/api-bud',
      'master/api-bud-dependency-extraction',
      'master/api-bud-eslint',
      'master/api-bud-stylelint',
      'master/api-bud-tailwind',
      'master/api-bud-typescript',
      'master/api-bud-vue',
    ],
  },
]
