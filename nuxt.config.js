import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Sales CRM',
    title: 'Sales CRM',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/auth',
    '~/plugins/filters',
    '~/plugins/administration/usersService',
    '~/plugins/administration/rolesService',
    '~/plugins/administration/permissionsService',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "@nuxtjs/toast",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    common: {
      'Accept': 'application/json'
    },
    baseURL: process.env.api_url,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#F5222D",
          accent: colors.grey.darken3,
          secondary: "#00c4ff",
          info: "#6aaff5",
          warning: "#fff8e2",
          error: "#eb5757",
          success: "#27AE60"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: { babelrc: true },
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: `${process.env.api_url}/login`, method: 'post' },
          logout: { url: `${process.env.api_url}/logout`, method: 'post' },
          user: { url: `${process.env.api_url}/auth/user`, method: 'get' },
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },
  toast: {
    position: 'top-left',
    duration: 5000,
  }
}
