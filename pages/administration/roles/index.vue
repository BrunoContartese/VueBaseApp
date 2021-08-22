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
                      class='mt-4 text-center'
                      elevation='12'
                    >
                      <v-icon
                        class="rounded-circle elevation-6 mt-n12 d-inline-block"
                        size="100"
                      >
                      mdi-shield-check
                      </v-icon>
                      <v-card-text class="text-center">
                        <h3 class="text-h3 mb-3 text--primary">
                          {{ resource.name }}
                        </h3>
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
                              class="mr-0"
                              color="info"
                              min-width="100"
                              rounded
                              @click="editPermissions(resource)"
                            >
                              Editar permisos
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
    <create-role-dialog
      v-if='creationDialog'
      :loading="loading"
      @cancel='creationDialog = false'
      @storeResource='storeResource'
    />
    <SnackBarComponent
      v-if='showSnackbar'
      :text='snackBarMessage'
      :color='snackbarColor'
      @timeout='showSnackbar = false'
    />
    <edit-role-dialog
      v-if='updateDialog'
      :loading="loading"
      :role='selectedResource'
      @cancel='updateDialog = false'
      @updateResource='updateResource'
    />

    <edit-role-permissions-dialog
      v-if='permissionsDialog'
      :loading="loading"
      :role='selectedResource'
      @cancel='permissionsDialog = false'
      @updatePermissions='updatePermissions'
    />

  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import NoResultsComponent from '@/components/noResultsComponent.vue'
  import SnackBarComponent from '../../../components/snackBarComponent.vue';
  import CreateRoleDialog from './createRoleDialog.vue';
  import EditRoleDialog from './editRoleDialog.vue';
  import EditRolePermissionsDialog from './editRolePermissionsDialog.vue';
  import Role from '~/models/administration/Role'
  
  
  @Component({
    components: {  
      NoResultsComponent,
      CreateRoleDialog,
      SnackBarComponent,
      EditRoleDialog,
      EditRolePermissionsDialog
    }
  })
  
  export default class Roles extends Vue {
    [x: string]: any
    private resources: Array<Role> = []
    private currentPage: Number = 1
    private lastPage: Number = 1
    private creationDialog: boolean = false;
    private searchQuery: string = ''
    private showSnackbar: Boolean = false
    public snackbarColor: string = ''
    private snackBarMessage: string = ''
    private updateDialog = false
    private selectedResource: Role
    private permissionsDialog = false

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

      this.$rolesService.paginated(params).then(res => {
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

    private storeResource(resource: Role) : void {
      this.loading = true
      this.$rolesService.store(resource)
        .then(() => {
          this.creationDialog = false
          this.message('success', 'Rol creado con èxito!')
          this.getResources()
        })
        .catch((errors) => {
          this.message('error', errors)
        }).finally(() => {
          this.loading = false
        })
    }

    private message(className: string = 'error', message: string) : void {
      this.snackbarColor = className
      this.snackBarMessage = message
      this.showSnackbar = true
    }

    private editResource(resource: Role) : void {
      this.selectedResource = resource
      this.updateDialog = true
    }

    private updateResource(resource: Role) : void{
      this.loading = true
      this.$rolesService.update({ resource })
        .then(() => {
          this.updateDialog = false
          this.message('success', 'Rol actualizado con éxito!')
          this.getResources()
        })
        .catch((errors) => {
          this.message('error', errors)
        }).finally(() => {
          this.loading = false
        })
    }

    private editPermissions(resource: Role) : void {
      this.selectedResource = resource
      this.permissionsDialog = true
    }

    private updatePermissions(resource: Role): void {
      this.loading = true
      this.$rolesService.updatePermissions(resource).then((res) => {
        this.permissionsDialog = false
        this.message('success', 'Permisos actualizados con éxito!')
        this.getResources()
      }).catch((errors) => {
        this.message('error', errors)
      }).finally(() => {
          this.loading = false
      })
    }

  }

</script>
<style>
.deleted {
  border: 4px solid red !important;
}
</style>