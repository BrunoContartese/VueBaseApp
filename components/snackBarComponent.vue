<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      :timeout='5000'
      :color="color"
      top
      left
    >
      <div v-html='text'/>

      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Watch} from 'vue-property-decorator'

  @Component
  export default class SnackBarComponent extends Vue {
    @Prop({ default: '' }) readonly text: string
    @Prop({ default: '' }) readonly color: string

    private snackbar = true

    @Watch('snackbar')
      timeout() {
        this.$emit('timeout')
      }
  }
</script>
