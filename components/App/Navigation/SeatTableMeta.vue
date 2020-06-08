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
        <div>
          <span class="caption grey--text">Brand Color</span>
          <v-color-picker
            class="mt-1 mb-4"
            v-model="meta.color"
            mode="hexa"
            hide-mode-switch
          />
        </div>
        <v-text-field
          label="Brand Icon"
          placeholder="Starts with mdi-"
          v-model="meta.icon"
          :rules="rules.icon"
        />
        <div class="grey--text mt-0 mb-4">
          <span class="subtitle-2">Choose an icon from</span>
          <a class="subtitle-2" href="https://materialdesignicons.com/">here</a>
        </div>
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
        <v-dialog v-model="isDialogOpened" max-width="360">
          <template v-slot:activator="{ on }">
            <v-btn small outlined color="error" v-on="on">
              Delete this
            </v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Are you ABSOLUTELY sure?
            </v-card-title>
            <v-card-text class="py-3">
              This action <strong>CANNOT</strong> be undone. This will delete <strong>{{ meta.name }}</strong> table.
            </v-card-text>
            <v-card-actions class="px-4">
              <v-btn
                small
                outlined
                color="primary"
                @click.stop="isDialogOpened = false"
              >
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn
                small
                outlined
                color="error"
                @click="deleteCurrentTable"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script charset="utf-8">
import { createNamespacedHelpers } from 'vuex'

const current = createNamespacedHelpers('current')

export default {
  components: {
  },

  data() {
    return {
      isDialogOpened: false,
      meta: {
        name: "",
        description: "",
        color: "#FFFFFF",
        icon: ""
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
    },

    deleteCurrentTable() {
      this.$store.commit('current/deleteTable')
      this.$router.push({
        name: 'index'
      })
    }
  },

  computed: {
    ...current.mapState([
      "name",
      "icon",
      "color",
      "description"
    ])
  },

  mounted() {
    this.meta.name = this.name || ""
    this.meta.icon = this.icon || ""
    this.meta.color = this.color || "#000000"
    this.meta.description = this.description || ""
  }
}
</script>
