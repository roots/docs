import '@theme/styles/index.scss';

export default ({ router }) => {
  router.addRoutes([
    { path: '/acorn/', redirect: '/acorn/2.x/installation/' },
    { path: '/bedrock/', redirect: '/bedrock/master/installation/' },
    { path: '/examples/', redirect: '/examples/roots-example-project/' },
    { path: '/getting-started/', redirect: '/getting-started/macos/' },
    { path: '/sage/', redirect: '/sage/10.x/installation/' },
    { path: '/sage/8.x', redirect: '/sage/8.x/installation/' },
    { path: '/sage/9.x', redirect: '/sage/9.x/installation/' },
    { path: '/trellis/', redirect: '/trellis/master/installation/' },
    { path: '/trellis-cli/', redirect: '/trellis-cli/master/installation/' },
  ])
}
