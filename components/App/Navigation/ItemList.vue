<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Students</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, index) in items" :key="item.uid">
          <v-expansion-panel-header>
            <span class="caption">{{ index+1 }}</span>
            <span>{{ item.name }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form @submit.prevent="updateItem(index, $event)">
              <v-text-field
                label="Name"
                name="name"
                required
                :value="item.name"
                :rules="rules.name"
              >
              </v-text-field>
              <v-select
                label="Gender"
                name="gender"
                :rules="rules.gender"
                :items="genderOptions"
                :value="item.gender"
                required
              >
              </v-select>
              <v-btn small outlined type="submit" color="primary">
                Update
              </v-btn>
              <v-btn small outlined color="error" @click="deleteItem(item)">
                Delete
              </v-btn>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- END items loop -->
        <v-expansion-panel>
          <v-expansion-panel-header
            expand-icon="mdi-plus"
          >
            Add new
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form ref="form">
              <v-text-field
                label="Name"
                required
                v-model="name"
                :rules="rules.name"
              >
              </v-text-field>
              <v-select
                label="Gender"
                :rules="rules.gender"
                :items="genderOptions"
                required
                v-model="gender"
              >
              </v-select>
              <v-btn small outlined color="primary" @click="createItem">
                Create
              </v-btn>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script charset="utf-8">
import _ from 'lodash'

export default {
  data() {
    return {
      name: '',
      gender: '',
      genderOptions: ['Male', 'Female'],
      rules: {
        name: [
          v => !!v
        ],
        gender: [
          v => this.genderOptions.includes(v)
        ]
      }
    }
  },

  methods: {
    createItem() {
      this.$store.commit('current/createItem', {
        name: this.name,
        gender: this.gender
      })
      // reset
      this.name = ''
      this.gender = ''
    },

    updateItem(index, evt) {
      let data = new FormData(evt.target)
      let item = _.cloneDeep(this.items[index])

      item.name = data.get('name')
      item.gender = data.get('gender')

      this.$store.commit('current/updateItem', item)
      this.$forceUpdate() // a bug
    },

    deleteItem(index) {
      this.$store.commit('current/deleteItem', index)
    }
  },

  computed: {
    items() {
      return this.$store.state.current.items
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
