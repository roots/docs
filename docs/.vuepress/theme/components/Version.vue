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

<style lang="stylus">
.sidebar
  .sidebar-current
    margin-bottom 1rem
    text-transform uppercase
    font-weight 100
    font-size 0.9rem
    color $accentColor

  .sidebar-version
    margin-top 1rem
    margin-bottom -0.5rem
    padding 0.35rem 1.5rem 0.35rem 1.25rem

    label
      text-transform uppercase
      opacity 0.65
      margin-bottom 0.4rem
      letter-spacing 2px
      font-size 0.65rem
      display block

  .sidebar-select
    display flex
    align-items center
    position relative

    select
      opacity: 0.4
      font-size 1rem
      padding-left 0.5rem
      padding-top 0.25rem
      padding-bottom 0.25rem
      display block
      width 100%
      background-color transparent
      appearance none
      cursor pointer

    .sidebar-select-arrow
      pointer-events none
      padding-left 0.5rem
      padding-right 0.5rem
      align-items center
      display flex
      position absolute
      top 0
      bottom 0
      right 0
      color #a0aec0

      svg
        width 1rem
        height 1rem
        fill currentColor

    &:hover .sidebar-select-arrow
      color $accentColor
</style>
