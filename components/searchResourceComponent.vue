<template>
  <v-container>
    <v-row>
        <v-text-field
          v-model="query"
          placeholder="Buscar..."
          hint="Buscar..."
          prepend-icon="mdi-magnify"
          type="search"
          clearable
          @keyup="search()"
          @clear:append='search()'
        />
        <v-spacer/>
        <v-btn
          color="primary"
          class='mt-5'
          title="Nuevo Usuario"
          @click="openCreationDialog()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class SearchResourceComponent extends Vue {
    private query: string = ''

    private openCreationDialog() {
      this.$emit('openCreationDialog')
    }

    private search() {
      setTimeout(() => {
        this.$emit('search', this.query)
      }, 400)
    }
  }
</script>
