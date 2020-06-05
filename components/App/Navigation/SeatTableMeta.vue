<template>
  <v-expansion-panel>
    <v-expansion-panel-header>General</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form @submit.prevent="updateMeta">
        <v-text-field
          label="Name"
          required
          :value="name"
          @input="updateProp('name', $event)"
        />
        <v-text-field
          label="Description"
          :value="description"
          @input="updateProp('description', $event)"
          :rules="rules.description"
        />
        <span class="caption grey--text">Brand Color</span>
        <v-color-picker
          class="mt-1 mb-4"
          v-model="meta.color"
          mode="hexa"
          hide-mode-switch
        />
        <v-alert
          v-show="flash.visibility"
          :type="flash.type"
          transition="fade-transition"
          dense
          outlined
          dismissible
        >
          {{ flash.msg }}
        </v-alert>
        <v-btn small outlined type="submit" color="primary">
          Update
        </v-btn>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script charset="utf-8">
import { createNamespacedHelpers } from 'vuex'

const current = createNamespacedHelpers('current')

export default {
  data() {
    return {
      meta: {
        "name": "",
        "description": "",
        "color": "#FFFFFF"
      },
      flash: {
        msg: "",
        type: "info",
        visibility: false
      },
      rules: {
        description: [
          v => v.length <= 40
        ]
      }
    }
  },

  methods: {
    updateProp(key, value) {
      if (this.meta[key] === undefined) {
        return
      }

      this.meta[key] = value
    },

    updateMeta() {
      if (this.meta.description.length > 40) {
        this.flashAlert("Description should be less than 40 letters", "error")
        return
      }

      this.$store.commit('current/updateMeta', this.meta)
      this.flashAlert("Updated!", "success")
    },

    flashAlert(msg, type="info", time=1000) {
      this.flash.msg = msg
      this.flash.type = type
      this.flash.visibility = true

      setTimeout(() => {
        this.flash.visibility = false
      }, time);
    }
  },

  computed: {
    ...current.mapState([
      "name",
      "color",
      "description"
    ])
  },

  mounted() {
    this.meta.name = this.name || ""
    this.meta.color = this.color || "#000000"
    this.meta.description = this.description || ""
  }
}
</script>
