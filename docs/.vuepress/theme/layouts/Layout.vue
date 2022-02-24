<template>
  <ParentLayout>
    <template #sidebar-top>
      <Version />
    </template>
    <template #page-bottom>
      <div style="padding: 15px; text-align: center;"><a href="https://github.com/sponsors/roots">Sponsor us on GitHub</a> to help us grow 🌱</div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue';
import Version from '@theme/components/Version.vue';

export default {
  name: 'Layout',
  components: {
    ParentLayout,
    Version,
  },
};
</script>
