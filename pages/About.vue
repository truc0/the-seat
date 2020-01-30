<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          About
        </v-card-title>
        <v-card-text>
          <p>
            <a href="https://nuxtjs.org">Nuxtjs</a> and <a href="https://vuetifyjs.org">Vuetify</a> are used to build this beautiful app.
          </p>
          <p>
            This project can be found in <a href="https://github.com/wozuishuai13768/the-seat">Github</a>. If you have any problem or suggestion, you can commit a issue on Github. Feature requests are welcomed!
          </p>
          <p>Enjoy yourself!</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo/Logo.vue'
import VuetifyLogo from '~/components/Logo/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
