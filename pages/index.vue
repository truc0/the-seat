<template>
  <div>
    <v-row
      dense
    >
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card router exact to="" class="seat-overview row mx-0 align-center">
          <v-avatar class="ml-3">
            <v-icon class="indigo" color="white">mdi-account</v-icon>
          </v-avatar>
          <div>
            <v-card-title class="headline">F6E</v-card-title>
            <v-card-subtitle v-text="description"></v-card-subtitle>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12" sm="6" md="4" lg="3"
        class="row justify-center align-center"
      >
        <v-icon class="add col mx-3 py-6">
          mdi-plus
        </v-icon>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('global')

export default {
  async asyncData(ctx) {

  },

  data() {
    return {
      description: "Description comes here"
    }
  },

  mounted() {
    this.disableDrawer()
  },

  methods: {
    ...mapMutations([
      'disableDrawer'
    ])
  }
}
</script>

<style lang="scss">
.seat-overview, .add {
  cursor: pointer;
}

.add {
  border: .5rem dashed #eee;
}
</style>
