<template>
  <aside class="sidebar">
    <div class="sidebar-version">
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
    <NavLinks />
    <slot name="top" />
    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from "@parent-theme/components/SidebarLinks.vue";
import NavLinks from "@parent-theme/components/NavLinks.vue";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks },

  methods: {
    onChange: event => {
      return console.log(event);

      // TODO
      // const path = this.$page.path;
      // const current = path.split("/")[1] || false;
      //
      // window.location.href = path.replace(this.current, event.target.value);
    }
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
      return this.path.split("/")[1] || false;
    },

    version() {
      return this.path.split("/")[2] || false;
    }
  },

  props: ["items"]
};
</script>

<style lang='stylus'>
.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  & > .sidebar-links {
    padding: 1.5rem 0;

    & > li > a.sidebar-link {
      font-size: 1.1em;
      line-height: 1.7;
      font-weight: bold;
    }

    & > li:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    & > .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
