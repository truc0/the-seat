<template>
  <div>
    <seat-table
      v-model="seats"
    />
  </div>
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
      updateInterval: null,
      seats: null
    }
  },

  created() {
    this.get()
  },

  mounted() {
    this.updateInterval = setInterval(() => {
      this.seats = [...this.arranged]

      if (this.seats) {
        clearInterval(this.updateInterval)
      }
    }, 1000)
  },

  methods: {
    ...mapActions({
      get: 'get'
    })
  },

  computed: {
    ...mapState({
      info: 'info',
      arranged: 'arranged'
    })
  }
}
</script>

<style>

</style>