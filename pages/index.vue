<template>
  <div>
    <seat-table
      v-model="seats"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
import Arrange from '~/plugins/arrange.js'
import Tools from '~/plugins/helpers'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('current')

import SeatTable from "~/components/App/SeatTable"


export default {
  async asyncData(ctx) {
    return ctx.$axios.$get('/demo.json')
            .then(data => Tools.standardize(data))
            .then(data => ({
              info: {
                title: 'SeatTable'
              },
              items: data,
              arranged: Arrange['random'](data, 2, 3)
            }))
  },

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
  },

  computed: {
  }
}
</script>

<style>

</style>
