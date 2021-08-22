<template>
  <v-app-bar
    :clipped-left="true"
    fixed
    app
    color="primary"
  >
    <v-app-bar-nav-icon
      class="white--text"
      @click='toggleDrawer()'
    />
    <v-toolbar-title
      class="mr-4"
    >
      <v-img
        content-class="nav-logo"
        width="86"
        height="36"
        :src="logoUrl"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-spacer></v-spacer>
      <notifications />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import notifications from './notifications'
export default {
  name: 'AppBar',
  components: { notifications },
  data: () => {
    return {
      drawer: false,
      logoUrl: ''
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit('toggle-drawer')
    }
  }
}
</script>
