<template>
  <div>
    <v-container
      fluid
      class="mt-5"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
        >
          <v-card
            class="mt-4 text-center"
            elevation='12'
          >
            <v-card-title>
              <v-row justify="center">
                <v-icon
                  size="100px"
                  color='error'
                >
                  mdi-alert-circle
                </v-icon>
              </v-row>
            </v-card-title>
            <v-card-text class="text-center">
              <h4 class="text-h4 mb-3 text--primary">
                No se han encontrado resultados
              </h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class NoResultsComponent extends Vue {

  }
</script>
