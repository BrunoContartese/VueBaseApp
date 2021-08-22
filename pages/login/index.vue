<template>
  <v-container fill-height fluid>
    <v-row
      justify='center'
      align="center"
    >
      <v-col
        cols='12'
        md='4'
        lg='4'
        xl='4'
        align='center'
        align-self='center'
      >
        <v-col
          cols='12'
        >
        <v-card
          color="#fff"
          flat
          tile
          elevation="0"
        >
        <v-card-title>
          <v-spacer/>
            <b id="loginText">Iniciar Sesión</b>
          <v-spacer/>
        </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="login.email"
              solo
              label="Correo electrónico"
              prepend-inner-icon="mdi-email-outline"
              type="text"
            />

            <v-text-field
              v-model="login.password"
              solo
              prepend-inner-icon="mdi-lock-open-variant-outline"
              label="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              @keyup:enter='userLogin()'
            />

          <v-btn
            color='primary'
            block
            @click='userLogin()'
          >
            <b>Ingresar</b>
          </v-btn>
          </v-card-text>
        </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import vuetify from 'vuetify'

  @Component({
    layout: 'login'
  })
  export default class Login extends Vue {

    private login : any = {
      email: '',
      password: ''
    }

    private showPassword : Boolean = false

    async userLogin() {
      const data = {
          email: this.login.email,
          password: this.login.password
        }
        await this.$auth.loginWith('local', { data })
        .catch((error) => {
          console.log(error);
        })
    }

    private isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    }

  }
</script>
<style>

.v-application--wrap {
  background-color: #E5E5E5;
}

#loginText {
  color: #000 !important;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  font-family: Inter;
}
</style>
