<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      color='error'
      top
      timeout="-1"
      center
      vertical
    >
      <div v-html='text'/>

      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="confirmation(true)"
        >
          Confirmar
        </v-btn>
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="confirmation(false)"
        >
          Cancelar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch} from 'vue-property-decorator'

  @Component
  export default class AskForDeleteComponent extends Vue {
    @Prop() readonly text: string
    @Prop() readonly resource : any

    private snackbar = true

    private confirmation(status) {
        if(status) {
          this.$emit('confirm', this.resource)
        }
        this.snackbar = false
    }

    @Watch('snackbar')
      timeout() {
        this.$emit('timeout')
      }

  }
</script>
