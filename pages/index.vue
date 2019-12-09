<template>
  <v-container>
    <v-row>
      <span class="subtitle-2 mb-3 grey--text">{{ info.title }}</span>
    </v-row>
    <seat-table></seat-table>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import SeatTable from "~/components/App/SeatTable"

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('current')

export default {
  components: {
    SeatTable
  },

  data() {
    return {

    }
  },

  mounted() {
    this.get()
  },

  methods: {
    ...mapMutations({
      set: 'set',
      add: 'add'
    }),

    ...mapActions({
      get: 'get'
    })
  },

  computed: {
    ...mapState({
      info: 'info',
      seats: 'seats'
    })
  }
}
</script>

<style>

</style>