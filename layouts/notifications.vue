<template>
  <v-menu
    bottom
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        dark
        icon
        class="white--text"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>Esto es una notificación</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-title>Esto es otra notificación</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  
  export default class Notifications extends Vue {
  }
</script>
