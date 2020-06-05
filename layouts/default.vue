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
      <v-expansion-panels multiple>
        <seat-table-meta />
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
      <nuxt-link :to="{ name: 'index' }" class="ml-3">
        <v-btn depressed color="white">
          <v-icon left color="grey">mdi-home</v-icon>
          <span class="grey--text">Home</span>
        </v-btn>
      </nuxt-link>
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
import SeatTableMeta from '~/components/App/Navigation/SeatTableMeta'

const { mapState } = createNamespacedHelpers('global')

export default {
  components: {
    ItemList,
    SeatTableMeta
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
