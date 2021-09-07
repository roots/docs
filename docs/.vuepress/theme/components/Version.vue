<template>
  <div class="sidebar-version" v-if="versions">
    <div class="sidebar-current">
      {{ this.route.category }} <span>docs</span>
    </div>

    <label>Version</label>

    <div class="sidebar-select">
      <select name="version" @change="onChange($event)">
        <option
          v-for="item in versions"
          v-bind:value="item.label"
          :selected="item.active"
        >{{ item.label }}</option>
      </select>

      <div class="sidebar-select-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onChange(item) {
      const path = this.$withBase(
        this.route.path.replace(
          this.route.version,
          event.target.value
        )
      );
      
      window.location.href = path.substring(0, path.lastIndexOf('/')) + '/installation.html';
    },
  },

  computed: {
   versions() {
     const versions = this.$site.themeConfig.versions;

     if (!this.route || !versions[this.route.category]) {
       return;
     }

     return (
       Object.keys(versions[this.route.category]).map(version => {
         return {
           label: versions[this.route.category][version],
           active: versions[this.route.category][version] === this.route.version
         };
       }) || false
     );
   },

    route() {
      return this.$page.routes;
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  .sidebar-current {
    @apply .mb-4 .uppercase .font-thin .tracking-wide .text-md .text-brand-500;

    span {
      @apply .text-gray-600;
    }
  }

  .sidebar-version {
    @apply .mt-4 .-mb-2 .py-2 .pr-6 .pl-5;

    label {
      @apply .uppercase .opacity-75 .mb-2 .tracking-widest .text-xxs .block;
    }
  }

  .sidebar-select {
    @apply .flex .items-center .relative;

    select {
      @apply .opacity-50 .text-md .pl-2 .py-1 .block .w-full .bg-transparent .appearance-none .cursor-pointer .border .border-gray-400;
    }

    .sidebar-select-arrow {
      @apply .pointer-events-none .pr-1 .flex .items-center .absolute .inset-y-0 .right-0 .text-gray-500;

      svg {
        @apply .w-4 .h-4 .fill-current;
      }
    }

    &:hover .sidebar-select-arrow {
      @apply .text-brand-500;
    }
  }
}
</style>
