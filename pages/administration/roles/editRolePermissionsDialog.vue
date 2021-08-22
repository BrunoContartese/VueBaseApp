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
              Permisos del rol: {{ role.name }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-select
                    v-model="resource.permissions"
                    :items="permissions"
                    item-text="show_name"
                    return-object
                    label="Permisos"
                    hide-selected
                    chips
                    deletable-chips
                    multiple
                    no-data-text="No hay opciones disponibles"
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
              @click="updatePermissions()"
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
  import RolePermission from '../../../models/administration/RolePermission';
  import Role from '~/models/administration/Role'


  @Component
  export default class EditRolePermissionsDialog extends Vue {
    [x: string]: any
    private dialog = true
    private permissions: RolePermission[] = []

    @Prop({ required: true }) readonly role: Role
    @Prop() loading

    private resource: Role = {
        id: 0,
        name: '',
        permissions: []
    }

    private mounted(): void{
        this.resource.id = this.role.id
        this.resource.name = this.role.name
        this.resource.permissions = this.role.permissions
        this.getPermissions()
    }

    private getPermissions()
    {
      this.$permissionsService.index().then((res) => {
        this.permissions = res.data
      })
    }

    private showDialog: boolean = false

    private closeDialog() {
      this.$emit('cancel')
    }

    private updatePermissions() {
      this.$emit('updatePermissions', this.resource)
    }

  }
</script>
