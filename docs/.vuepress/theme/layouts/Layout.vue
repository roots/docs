
<template>
  <ParentLayout>
    <template #sidebar-top>
      <Version />
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
