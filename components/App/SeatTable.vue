<template>
  <v-container class="seats">
    <v-row>
      <draggable v-model="seats">
        <transition-group type="transition">
          <v-col 
            cols="12" 
            v-for="i in seats" 
            :key="i.id"
          >
            <v-btn outlined color="primary">
              {{ i.name }}
            </v-btn>
          </v-col>
        </transition-group>
      </draggable>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('current')

export default {
  props: [],

  components: {
    draggable
  },

  data() {
    return {
    }
  },

  methods: {
    updateSeats() {

    },

    getSeats() {

    }
  },

  computed: {
    seats: {
      get() {
        return this.$store.state.current.seats
      },
      set(val) {
        return this.$store.dispatch('current/setSeats', { val: val })
      }
    }
  },

  mounted() {

  }
}
</script>

<style lang="scss">
  .seats {
    border: 1px solid #000;
    border-radius: 1rem;
  }
</style>