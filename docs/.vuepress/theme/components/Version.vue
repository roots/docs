<template>
  <div class="sidebar-version" v-if="versions">
    <div class="sidebar-current">
      {{ this.current }} docs
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
      const path = this.$withBase(this.path.replace(
        this.version,
        event.target.value
      ));

      window.location.href = path.substring(0, path.lastIndexOf('/')) + '/installation.html';
    },
  },

  computed: {
    versions() {
      const versions = this.$site.themeConfig.versions;

      if (!versions[this.current]) {
        return;
      }

      return (
        Object.keys(versions[this.current]).map(version => {
          return {
            label: versions[this.current][version],
            active: versions[this.current][version] === this.version
          };
        }) || false
      );
    },

    path() {
      return this.$page.path;
    },

    current() {
      return this.path.split('/')[1] || false;
    },

    version() {
      return this.path.split('/')[2] || false;
    },
  },
};
</script>
