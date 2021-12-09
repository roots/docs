<template>
  <div class="sponsors">
    <h2>Sponsors</h2>

    <ul class="sponsors-list">
      <li><a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="73" height="55"></a></li>
      <li><a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="73" height="55"></a></li>
      <li><a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="73" height="55"></a></li>
      <li><a href="https://www.c21redwood.com/"><img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="73" height="55"></a></li>
      <li><a href="https://wordpress.com/"><img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="73" height="55"></a></li>
      <li><a href="https://pantheon.io/"><img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="73" height="55"></a></li>
    </ul>

    <p>If you have the capability, please consider donating using the links below:</p>
    <p><a href="https://github.com/sponsors/roots"><img src="https://camo.githubusercontent.com/8101e842fb1349342acf1ef9059ce73bf16e7eb2426a7a4e5f8443b6fc20634b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f6c6162656c3d73706f6e736f72266d6573736167653d254532253944254134266c6f676f3d476974487562267374796c653d666c61742d737175617265" alt="Sponsor on GitHub" data-canonical-src="https://img.shields.io/static/v1?label=sponsor&amp;message=%E2%9D%A4&amp;logo=GitHub&amp;style=flat-square" style="max-width: 100%;"></a> <a href="https://www.patreon.com/rootsdev" rel="nofollow"><img src="https://camo.githubusercontent.com/e66682e59ff4b27cfb07515d6ec220af03ae23f2a3593b9e01798dfd959f8c1e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f73706f6e736f722d70617472656f6e2d6f72616e67652e7376673f7374796c653d666c61742d737175617265266c6f676f3d70617472656f6e253232" alt="Sponsor on Patreon" data-canonical-src="https://img.shields.io/badge/sponsor-patreon-orange.svg?style=flat-square&amp;logo=patreon%22" style="max-width: 100%;"></a> <a href="https://www.paypal.me/rootsdev" rel="nofollow"><img src="https://camo.githubusercontent.com/36f832e7b26e69a36b49b3b97633d3fb87b4537f6f15fb1fc88ade2aac5de468/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f6e6174652d70617970616c2d626c75652e7376673f7374796c653d666c61742d737175617265266c6f676f3d70617970616c" alt="Donate via PayPal" data-canonical-src="https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square&amp;logo=paypal" style="max-width: 100%;"></a></p>
  </div>
</template>

<script>
export default {
  name: 'Sponsors',
};
</script>

<style lang="scss">
.sponsors {
  @apply .p-5;
}

.sponsors h2 {
  @apply .text-xs;
}

.sponsors-list {
  list-style: none;

  li {
    display: inline-block;
  }
}

.sponsors-list img {
  width: auto;
  height: 49px;

  @media (min-width: 960px) {
    height: 63px;
  }
}

.sponsors p {
  @apply .text-xs;
}
</style>