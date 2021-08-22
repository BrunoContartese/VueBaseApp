<template>
  <v-app>

    <app-bar
      @toggle-drawer='drawer = !drawer'
    />

    <drawer
      :drawer='drawer'
    />

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import drawer from './drawer'
import appBar from './app-bar'

export default {
  name: 'DefaultLayout',
  components: { drawer, appBar },
  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Inicio',
          to: '/'
        },
        {
          icon: 'mdi-star-outline',
          title: 'Oportunidades',
          to: '/opportunities'
        },
        {
          icon: 'mdi-chart-line',
          title: 'Ventas',
          to: '/sales'
        },
        {
          icon: 'mdi-folder-outline',
          title: 'Cursos',
          to: '/administration/courses'
        },
        {
          icon: 'mdi-school-outline',
          title: 'Alumnos',
          to: '/administration/students'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Profesores',
          to: '/administration/teachers'
        },
        {
          icon: 'mdi-seal-variant',
          title: 'Certificaciones',
          to: '/administration/certifications'
        },
        {
          icon: 'mdi-chart-pie',
          title: 'Segmentación',
          to: '/reports'
        },
      ],
    }
  },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  }
}
</script>
