<template>
  <div>
    <v-row>
      <v-col
        cols='12'
      >
        <v-card
          elevation='12'
        >
          <v-card-text>
            <search-resource-component
              @search='search'
              @openCreationDialog='creationDialog = true'
            />

            <noResultsComponent
              v-if='resources.length === 0'
            />

            <template
              v-for="resource in resources"
              v-else
            >
              <v-container
                :key="resource.id"
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
                      :class="resource.deleted_at !== null ? 'mt-4 text-center deleted' :  'mt-4 text-center'"
                      elevation='12'
                    >
                      <v-img
                        class="rounded-circle elevation-6 mt-n12 d-inline-block"
                        :src="resource.picture ? resource.picture : '/assets/images/LoginAvatar.png'"
                        width="128"
                      />
                      <v-card-text class="text-center">
                        <h6 class="text-h6 mb-2 text--secondary">
                          <template v-for="role in resource.roles">
                            <p
                              :key="role.name"
                            >
                              <v-chip class="info">
                                {{ role.name }}
                              </v-chip>
                            </p>
                          </template>
                        </h6>
                        <h3 class="text-h3 mb-3 text--primary">
                          {{ resource.given_name }} {{ resource.family_name }}
                        </h3>
                        <v-row>
                          <v-col
                            cols="12"
                            class="text-md-justify"
                          >
                            <p><span class="text--primary text-h6">Correo electrónico: </span> <span class="text-h6 mb-2 text--secondary">{{ resource.email }} </span></p>
                            <p><span class="text--primary text-h6">Fecha de alta: </span> <span class="text-h6 mb-2 text--secondary">{{ resource.created_at | formatDate }} </span></p>
                            <p v-if="resource.deleted_at !== null">
                        <span class="red--text text-h6 ">
                          Usuario dado de baja el:
                        </span>
                              <span class="text-h6 mb-2 red--text">
                          {{ resource.deleted_at | formatDate }} <span v-if="resource.destroyer !== null">por {{ resource.destroyer.given_name }} {{ resource.destroyer.family_name }}</span>
                        </span>
                            </p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-btn
                              class="mr-0"
                              color="primary"
                              min-width="100"
                              rounded
                              @click="editResource(resource)"
                            >
                              Editar
                            </v-btn>
                          </v-col>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-btn
                              v-if="resource.deleted_at === null"
                              class="mr-0"
                              color="primary"
                              min-width="100"
                              rounded
                              @click="askForDelete(resource)"
                            >
                              Dar de baja
                            </v-btn>
                            <v-btn
                              v-else
                              class="mr-0"
                              color="success"
                              min-width="100"
                              rounded
                              @click="restore(resource)"
                            >
                              Dar de alta
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
            <v-row>
              <v-container>
                <div class="text-center">
                  <v-pagination
                    v-model="currentPage"
                    :length="lastPage"
                    @input="getResources"
                  ></v-pagination>
                </div>
              </v-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <SnackBarComponent
      v-if='showSnackbar'
      :text='snackBarMessage'
      :color='snackbarColor'
      @timeout='showSnackbar = false'
    />
    <create-user-dialog
      v-if='creationDialog'
      :loading="loading"
      @cancel='creationDialog = false'
      @storeResource='storeResource'
    />
    
    <edit-user-dialog
      v-if='updateDialog'
      :loading="loading"
      :user='selectedResource'
      @cancel='updateDialog = false'
      @updateResource='updateResource'
    />

    <ask-for-delete-component
      v-if='askForDeleteComponent'
      :resource="selectedResource"
      :text='askForDeleteText'
      @confirm='destroy'
      @timeout='askForDeleteComponent = false'
    />

  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import SnackBarComponent from '@/components/snackBarComponent.vue'
  import NoResultsComponent from '@/components/noResultsComponent.vue'
  import AskForDeleteComponent from '@/components/askForDeleteComponent.vue'
  import SearchResourceComponent from '@/components/searchResourceComponent.vue'
  import User from '@/models/administration/User'
  import CreateUserDialog from './createUserDialog.vue'
  import EditUserDialog from './editUserDialog.vue'
  
  @Component({
    components: {  
      CreateUserDialog,
      NoResultsComponent,
      SearchResourceComponent,
      SnackBarComponent,
      EditUserDialog,
      AskForDeleteComponent
    }
  })
  
  export default class Users extends Vue {
    [x: string]: any
    private resources: Array<User> = []
    private currentPage: Number = 1
    private lastPage: Number = 1
    private searchQuery: String = ''
    private selectedResource: Object = {}
    private updateDialog: Boolean = false
    private creationDialog: Boolean = false
    private showSnackbar: Boolean = false
    public snackbarColor: string = ''
    private snackBarMessage: string = ''
    private askForDeleteText : string
    private askForDeleteComponent: Boolean = false
    private loading = false

    private mounted() {
      this.getResources()
    }

    private getResources() : void {
      this.loading = true
      const params= {
          q: this.searchQuery,
          page: this.currentPage,
          pageSize: 5
      }

      this.$usersService.paginated(params).then(res => {
          this.resources = res.data.data
          this.lastPage = res.data.last_page
      }).finally(() => {
        this.loading = false
      })
    }

    public search(query : any) : void {
      this.searchQuery = query
      this.currentPage = 1
      this.getResources()
    }

    private destroy(resource: User) : void {
     this.$usersService.destroy(resource.id)
        .then(() => {
          this.message('success', 'Usuario dado de baja con éxito!')
          this.getResources()
        })
    }

    private restore(resource: User) : void {
      this.$usersService.restore(resource.id)
        .then(() => {
          this.message('success', 'Usuario restaurado con éxito!')
          this.getResources()
        })
    }

    private storeResource(resource: User) : void {
      this.loading = true
      this.$usersService.store(resource)
        .then(() => {
          this.creationDialog = false
          this.message('success', 'Usuario creado con èxito!')
          this.getResources()
        })
        .catch((errors) => {
          this.message('error', errors)
        }).finally(() => {
          this.loading = false
        })
    }

    private editResource(resource: User) : void {
      this.selectedResource = resource
      this.updateDialog = true
    }

    private updateResource(resource: User) : void{
      this.loading = true
      this.$usersService.update({ user: resource, userId: resource.id } )
        .then(() => {
          this.updateDialog = false
          this.message('success', 'Usuario actualizado con éxito!')
          this.getResources()
        })
        .catch((errors) => {
          this.message('error', errors)
        }).finally(() => {
          this.loading = false
        })
    }

    private askForDelete(resource: User) : void {
      this.selectedResource = resource
      this.askForDeleteText = `¿Está seguro de que desea eliminar el usuario de ${resource.given_name} ${resource.family_name}?`
      this.askForDeleteComponent = true
    }

    private message(className: string = 'error', message: string) : void {
      this.snackbarColor = className
      this.snackBarMessage = message
      this.showSnackbar = true
    }

  }

</script>
<style>
.deleted {
  border: 4px solid red !important;
}
</style>