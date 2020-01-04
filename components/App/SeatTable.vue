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
          v-for="(s, index) in seats"
          :key="index + newUid()"
        >
          {{ JSON.stringify(s) }}
        </v-col>
      </transition-group>
    </draggable>
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
    newUid() {
      return this.$uuid.v4()
    }
  },

  computed: {
    seats: {
      get() {
        return this.$store.state.current.arranged
      },
      set(seats) {
        return this.$store.commit('current/setArranged', { arranged: seats })
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
