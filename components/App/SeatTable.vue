<template>
  <div>
    <v-row align="center" justify="center" class="ma-3">
      <span class="subtitle-1 grey--text">F6E</span>
      <v-spacer></v-spacer>
      <input
        type="file"
        ref="upload"
        class="upload"
        @change="upload"
      />
      <label for="upload">
        <v-btn
          depressed
          text
          @click="dispatchUpload"
        >
          <v-icon
            small
            left
            class="grey--text"
          >
            mdi-upload
          </v-icon>
          <span class="grey--text">Upload</span>
        </v-btn>
      </label>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            text
            v-on="on"
          >
            <v-icon
              small
              left
              class="grey--text"
            >
              mdi-cached
            </v-icon>
            <span class="grey--text">ReArrange</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in rearrangeOptions"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <!-- END navigation -->
    <div class="seats">
      <draggable
        group="group"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :value="value"
        @input="emitter"
      >
        <transition-group
          class="row"
          type="transition"
          name="!drag ? 'flip-list' : null"
        >
          <v-col
            class="group"
            cols="4"
            v-for="(group, index) in value"
            :key="group.uid"
          >
            <draggable
              class="row mx-0 pa-3 light-blue-lighten-5 justify-space-around align-center elevation-4"
              group="item"
              v-bind="dragOptions"
              :value="group.data"
              @input="applyGroupChange(index, $event)"
            >
              <div
                class="pa-0"
                group="item"
                v-for="item in group.data"
                :key="item.uid ? item.uid : newUid()"
              >
                <v-btn
                  outlined
                  :color="getColor(item.gender)"
                  class="text-wrap"
                >
                  {{ item.name }}
                </v-btn>
              </div>
            </draggable>
          </v-col>
          <v-col
            cols="4"
            @click="addNewBlock"
            :key="newUid()"
          >
            <v-row class="add mx-0 pa-3 justify-center align-center light-blue-lighten-5">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-row>
          </v-col>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import draggable from 'vuedraggable'

import Queues from '~/plugins/queue'
const { TaskQueue } = Queues

export default {
  props: {
    value: {
      required: true,
      // type: Array,
      default: null
    },
  },

  components: {
    draggable
  },

  data() {
    return {
      drag: false,
      cnt: 0,
      genderToColor: {
        male: "primary",
        female: "pink",
        unknown: "indigo"
      },
      maxPerGroup: 3,
      minPerGroup:2,
      actions: [
        {
          icon: 'mdi-cached',
          text: 'ReArrange',
          options: [
            {
              text: 'random',
              action: () => this.rearrange('random')
            },
            {
              text: 'sequential',
              action: () => this.rearrange('sequential')
            }
          ]
        }
      ],
      rearrangeOptions: [
        {
          text: 'random',
          action: () => this.rearrange('random')
        },
        {
          text: 'sequential',
          action: () => this.rearrange('sequential')
        }
      ],
      queue: null
    }
  },

  methods: {
    /**
     * @return a uuid version 4
     */
    newUid() {
      return this.$tools.uuid.v4()
    },

    initData() {
      if (!this.data) {
        this.data = _.cloneDeep(this.value)
      }
    },

    /**
     * @param {string} gender gender represent in string
     * @return coresponding color of gender
     */
    getColor(gender) {
      let res = this.$gender.getGender(gender)

      if (res === this.$gender.Male) {
        return this.genderToColor.male
      }

      if (res === this.$gender.Female) {
        return this.genderToColor.female
      }

      if (res === this.$gender.Unknown) {
        return this.genderToColor.unknown
      }
    },

    /**
     * emit value for v-model
     * @param {*} value the value to be emitted
     * @return undefined
     */
    emitter(value) {
      this.$emit('input', value)
    },


    /**
     * emit value of specific group
     * @param {number} index the index of group in arranged
     * @return function a function that emit the value
     */
    applyGroupChange(index, data) {
      this.queue.push(() => {
        let _v = _.cloneDeep(this.value)
        _v[index].data = data
        this.emitter(_v)
      })

      if (!this.queue.hasWorker()) {
        this.queue.work()
      }
    },

    /**
     * rearrange data with given method and emit rearranged array
     * @param {string} method method used to rearrange people
     * @return undefined
     */
    rearrange(method) {
      let arranged = this.$group[method](
        [...this.value].flat(),
        this.minPerGroup,
        this.maxPerGroup
        )
      this.emitter(this.data)
    },

    /**
     * add new block to existed table
     * @return undefined
     */
    addNewBlock() {
      let _v = [...this.value, this.$table.createBlock()]
      this.emitter(_v)
    },

    /**
     * dispatch upload event
     * @return undefined
     */
    dispatchUpload() {
      let click = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
      })
      this.$refs.upload.dispatchEvent(click)
    },

    /**
     * Partly copy from https://github.com/SheetJS/sheetjs/blob/master/demos/vue/SheetJS-vue.js
     * Under **Apache-2.0 License**
     */
    upload(evt) {
      let file
      let files = evt.target.files

      if (!files || files.length == 0) return;

      file = files[0];

      let reader = new FileReader()

      new Promise((resolve, reject) => {
        reader.onload = this.$upload.xlsx(resolve, reject)
        reader.readAsArrayBuffer(file);
      }).then(data => this.$group.standardize(data))
        .then(data => this.$group.sequential(data, this.minPerGroup, this.maxPerGroup))
        .then(data => this.emitter(data))
		}
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },

  mounted() {
    this.queue = new TaskQueue()
  }
}
</script>


<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.upload {
  display: none;
}

.group {
  border-radius: $border-radius-root;

  &>div {
    height: 100%;
  }
}

.add {
  cursor: pointer;
  border: 4px dashed #eee;
}
</style>
