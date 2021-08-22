<template>
  <v-navigation-drawer
    v-model="drawerData"
    app
    clipped
  >
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar class="px2">
          <v-img :src="userPicture"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h9">
            {{ userFullName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <template v-for='item in items'>
        <v-list-item
          v-if='!item.childItems && hasPermissionTo(item.permission)'
          :key="item.title"
          :to='item.to'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key='item.title'
          :value='false'
          :prepend-icon='item.icon'
          no-action
        >
          <template #activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <template
            v-for='(childItem, i) in item.childItems'
          >
            <v-list-item
              v-if='hasPermissionTo(childItem.permission)'
              :key='i'
              :to='childItem.to'
            >
              <v-list-item-icon>
                <v-icon>{{ childItem.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ childItem.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

        </v-list-group>
      </template>
    </v-list>

    <template #append>
      <div class="pa-2">
          <v-btn 
            block
            color='primary'
            @click='logout'
          >
            Cerrar sesión
          </v-btn>
        </div>
    </template>
      
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    drawer: Boolean,
  },
  data () {
    return {
      drawerData: true,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Administración',
          childItems: [
            {
              icon: 'mdi-account-group-outline',
              title: 'Usuarios',
              to: '/administration/users',
              permission: 'users.view',
            },
            {
              icon: 'mdi-lock',
              title: 'Roles',
              to: '/administration/roles',
              permission: 'roles.view',
            }
          ]
        },
      ]
    }
  },
  computed: {
    userFullName() {
      return `${this.$auth.user.given_name} ${this.$auth.user.family_name}`
    },
    userEmail() {
      return `${this.$auth.user.email}`
    },
    userPicture() {
      return `${this.$auth.user.picture}`
    },
  },
  watch: {
    drawer() {
      this.drawerData = !this.drawerData
    },
  },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
   async logout() {
      await this.$auth.logout()
      .then(() => {
        location.href = "/login"
      })
     .catch((error) => {
       console.log(error)
     })
    },
    hasPermissionTo(permission) {
      return permission ? this.$hasPermissionTo(permission) : true
    },
  },
}
</script>
