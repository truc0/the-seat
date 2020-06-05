<template>
  <div>
    <v-row class="navigation-box ma-3" justify="center" align="center">
      <span class="grey--text subtitle-1">All tables</span>
      <v-spacer />
    </v-row>
    <v-row
      dense
    >
      <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="table in tables"
        :key="table.uid"
      >
        <v-card
          router exact :to="makeRoute(table.uid)"
          class="seat-overview row mx-0 align-center"
        >
          <v-avatar class="ml-3">
            <v-icon
              color="white"
              :style="getIconBackground(table.item.color)"
            >
              mdi-account
            </v-icon>
          </v-avatar>
          <div>
            <v-card-title class="headline">{{ table.item.name }}</v-card-title>
            <v-card-subtitle v-text="table.item.description"></v-card-subtitle>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12" sm="6" md="4" lg="3"
        class="row justify-center align-center"
      >
        <nuxt-link
          class="add mx-3 py-6"
          exact :to="makeRoute()"
        >
          <v-icon class="col">
            mdi-plus
          </v-icon>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('global')

export default {
  data() {
    return {
      tables: []
    }
  },

  mounted() {
    this.disableDrawer()

    this.$storage.use('localStorage')
    this.$storage.bootstrap()

    let data = this.$storage.get().data
    for (const key in data) {
      this.tables.push({
        uid: key,
        item: data[key]
      })
    }
  },

  methods: {
    ...mapMutations([
      'disableDrawer'
    ]),

    makeRoute(uid) {
      return {
        name: 'seat',
        query: {
          uid: uid
        }
      }
    },

    getIconBackground(color) {
      return {
        background: color
      }
    }
  }
}
</script>

<style lang="scss">
.seat-overview, .add {
  cursor: pointer;
  height: 100%;
}

.add {
  width: 100%;
  border: .5rem dashed #eee;
}
</style>
