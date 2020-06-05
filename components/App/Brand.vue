<template>
  <v-card
    router exact :to="makeRoute(uid)"
    class="seat-overview row mx-0 align-center"
  >
    <v-avatar class="ml-3">
      <v-icon
        color="white"
        :style="styleObj"
      >
      {{ icon || "mdi-account" }}
      </v-icon>
    </v-avatar>
    <div>
      <v-card-title class="headline">{{ name }}</v-card-title>
      <v-card-subtitle v-text="description"></v-card-subtitle>
    </div>
  </v-card>
</template>

<script charset="utf-8">
import colors from 'vuetify/es5/util/colors'

export default {
  props: {
    color: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    icon: {
      type: String,
      default: () => {
        return "mdi-account"
      }
    },
    uid: {
      type: String
    }
  },

  methods: {
    makeRoute(uid) {
      if (!uid) {
        return null
      }

      return {
        name: 'seat',
        query: {
          uid: uid
        }
      }
    },
  },

  computed: {
    styleObj() {
      if (this.color.startsWith('#') || !colors[this.color]) {
        // hex or custom color
        return {
          background: this.color
        }
      } else {
        // name of color
        return {
          background: colors[this.color].base
        }
      }
    }
  }
}
</script>
