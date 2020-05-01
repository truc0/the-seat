<template>
  <div>
    <seat-table
      v-model="arranged"
      :key="reComputeKey"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
import Arrange from '~/plugins/arrange'
import Tools from '~/plugins/helpers'
import Storage from '~/plugins/storage'

const global = createNamespacedHelpers('global')
const current = createNamespacedHelpers('current')

import SeatTable from "~/components/App/SeatTable"


export default {
  async asyncData(ctx) {
  /*
    return ctx.$axios.$get('/demo.json')
            .then(data => Tools.standardize(data))
            .then(data => ({
              info: {
                title: 'SeatTable'
              },
              items: data,
              arranged: Arrange['random'](data, 2, 3)
            }))
  */
    let res = {}

  },

  components: {
    SeatTable
  },

  data() {
    return {
      updateInterval: null,
    }
  },

  created() {
  },

  mounted() {
    this.enableDrawer()

    this.$storage.use('localStorage')
    this.$storage.bootstrap()

    let payload = {}

    if (!this.$route.query.uid) {
      // create a new table and redirectg
      this.$router.push({
        name: 'seat',
        query: {
          uid: Storage.create()
        }
      })
    } else {
      payload.uid = this.$route.query.uid
    }

    let data = Storage.get(payload.uid)
    payload.data = data
    payload.items = data.items
    payload.arranged = data.arranged

    this.init(payload)
  },

  methods: {
    ...global.mapMutations([
      'enableDrawer'
    ]),
    ...current.mapMutations([
      'init'
    ])
  },

  computed: {
    ...current.mapState([
      'uid',
      'items',
      'reComputeKey'
    ]),
    arranged: {
      get() {
        return this.$store.state.current.arranged
      },
      set(value) {
        return this.$store.commit('current/setArranged', value)
      }
    }
  },
}
</script>

<style>

</style>
