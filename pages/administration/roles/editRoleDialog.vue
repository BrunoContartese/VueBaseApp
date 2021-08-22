<template>
  <div>
    <v-row
      justify="center"
    >
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        @keydown.esc="closeDialog()"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">
              Editar Rol
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="resource.name"
                    label="Nombre*"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="info"
              @click="closeDialog()"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              @click="updateResource()"
            >
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Role from '~/models/administration/Role'


  @Component
  export default class EditRoleDialog extends Vue {

    private dialog = true
    @Prop({ required: true }) readonly role: Role
    @Prop() loading

    private resource: Role = {
        id: 0,
        name: '',
    }

    private mounted(): void{
        this.resource.id = this.role.id
        this.resource.name = this.role.name
    }

    private showDialog: boolean = false

    private closeDialog() {
      this.$emit('cancel')
    }

    private updateResource() {
      this.$emit('updateResource', {
         ...this.resource
      })
    }

  }
</script>
