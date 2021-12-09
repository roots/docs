<template>
  <ParentLayout>
    <template #sidebar-top>
      <Version />
    </template>
    <template #sidebar-bottom>
      <Sponsors />
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue';
import Version from '@theme/components/Version.vue';
import Sponsors from '@theme/components/Sponsors.vue';

export default {
  name: 'Layout',
  components: {
    ParentLayout,
    Version,
    Sponsors,
  },
};
</script>
