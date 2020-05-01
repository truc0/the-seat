<template>
  <v-app>
    <v-navigation-drawer
      v-if="showDrawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-expansion-panels>
        <item-list />
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon
        v-show="showDrawer"
        @click.stop="drawer = !drawer"
      />
        <v-toolbar-title>
          <span class="grey--text">The</span>
          <span class="grey--text font-weight-medium">Seat</span>
        </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import ItemList from '~/components/App/Navigation/ItemList'

const { mapState } = createNamespacedHelpers('global')

export default {
  components: {
    ItemList
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TheSeat'
    }
  },

  computed: {
    ...mapState([
      'showDrawer'
    ])
  }
}
</script>
