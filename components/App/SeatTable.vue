<template>
  <v-container class="seats">
    <draggable 
      v-model="seats"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group 
        class="row"
        type="transition"
        name="!drag ? 'flip-list' : null"
      >
        <v-col
          cols="4" 
          v-for="i in seats" 
          :key="i.id"
        >
          <v-btn outlined color="primary">
            {{ i.name }}
          </v-btn>
        </v-col>
      </transition-group>
    </draggable>
    <!-- <draggable
      class="list-group"
      tag="ul"
      v-model="list"
      
      
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      </transition-group>
    </draggable> -->
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
      drag: false,
      cnt: 0
    }
  },

  methods: {
  },

  computed: {
    seats: {
      get() {
        return this.$store.state.current.seats
      },
      set(val) {
        return this.$store.dispatch('current/setSeats', { val: val })
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
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