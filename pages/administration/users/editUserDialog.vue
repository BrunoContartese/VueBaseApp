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
              Editar Usuario
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-form>
                  <v-col cols="12">
                    <v-text-field
                      v-model="resource.given_name"
                      label="Nombre*"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="resource.family_name"
                      label="Apellido*"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="resource.picture"
                      label="Imagen de perfil"
                    >
                      <template #append>
                        <v-list-item>
                          <v-list-item-avatar class="px2">
                            <v-img :src="resource.picture"></v-img>
                          </v-list-item-avatar>
                        </v-list-item>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="resource.email"
                      label="Email*"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="resource.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      hint="Al menos 8 caracteres"
                      counter
                      label="Contraseña*"
                      required
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="passwordConfirmation"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      hint="Al menos 8 caracteres"
                      counter
                      label="Repita la contraseña*"
                      required
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-select
                      v-model="roles"
                      :items="profiles"
                      item-text="name"
                      item-value="name"
                      label="Perfil"
                      hide-selected
                      chips
                      deletable-chips
                      multiple
                      no-data-text="No hay opciones disponibles"
                    />
                  </v-col>
                </v-form>
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
  import User from '~/models/administration/User'
  import Role from '~/models/administration/Role'


  @Component
  export default class EditUserDialog extends Vue {

    @Prop({ required: true }) readonly user: User
    @Prop({ required: true }) readonly loading: boolean

    private resource: User = {
      email: '',
      given_name: '',
      family_name: '',
      password: '',
      picture: '/assets/images/DefaultAvatar.svg',
    }

    private roles: String[] = []

    private dialog = true

    private showDialog: Boolean = false

    private passwordConfirmation: String = ''

    private showPassword: Boolean = false

    private profiles: Role[] = []

    private mounted() {
      this.resource = {
        id: this.user.id,
        email: this.user.email, 
        given_name: this.user.given_name,
        family_name: this.user.family_name, 
        password: '',
        picture: this.user.picture 
      }

      this.roles = this.user.roles ? this.user.roles.map((role) => {
        return role.name
      }) : []

      this.getRoles()
    }

    private closeDialog() {
      this.$emit('cancel')
    }

    private updateResource() {
      this.$emit('updateResource', {
         ...this.resource, 
         password_confirmation: this.passwordConfirmation, 
         roles: this.roles
      })
    }

    private getRoles() {
      this.$axios.get('/administration/roles')
        .then((res) => {
          this.profiles = res.data
        })
    }
  }
</script>
