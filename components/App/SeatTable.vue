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
      <v-menu offset-y v-for="(opt, index) in actions" :key="newUid()+index">
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
              {{ opt.icon }}
            </v-icon>
            <span class="grey--text">{{ opt.text }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in opt.options"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
    <v-container class="seats">
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
            v-for="(s, index) in value"
            :key="index + newUid()"
          >
            <draggable
              class="row justify-center align-center"
              group="item"
              v-bind="dragOptions"
              v-model="value[index]"
            >
              <v-col
                group="item"
                v-for="item in s"
                :key="item.uid ? item.uid : newUid()"
              >
                <v-btn 
                  outlined 
                  :color="getColor(item.gender)"
                  class="text-wrap"
                >
                  {{ item.name }}
                </v-btn>
              </v-col>
            </draggable>
          </v-col>
          <v-col
            cols="4"
            class="add row align-center justify-center"
            @click="addNewBlock"  
            :key="newUid()"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-col>
        </transition-group>
      </draggable>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import draggable from 'vuedraggable'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('current')

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
      actions: [
        {
          icon: 'mdi-cached',
          text: 'ReArrange',
          options: [
            {
              text: 'random',
              action: () => this.rearrange('random')
            }
          ]
        }
      ],
    }
  },

  methods: {
    /**
     * @return a uuid version 4
     */
    newUid() {
      return this.$uuid.v4()
    },

    /**
     * @param {string} gender gender represent in string
     * @return coresponding color of gender
     */
    getColor(gender) {
      let res = this.$gender.gender(gender)

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
      this.emitter(arranged)
    },

    /**
     * add new block to existed table
     * @return undefined
     */
    addNewBlock() {
      let _v = [...this.value, []]
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
     * Copy from https://github.com/SheetJS/sheetjs/blob/master/demos/vue/SheetJS-vue.js
     * Under **Apache-2.0 License**
     */
    upload(evt) {
			let file;
			let files = evt.target.files;

			if (!files || files.length == 0) return;

			file = files[0];

			let reader = new FileReader();
			reader.onload = e => {
				// pre-process data
				let binary = "";
				let bytes = new Uint8Array(e.target.result);
				let length = bytes.byteLength;
				for (let i = 0; i < length; i++) {
					binary += String.fromCharCode(bytes[i]);
				}

				/* read workbook */
				let wb = this.$xlsx.read(binary, {type: 'binary'});

				/* grab first sheet */
				let wsname = wb.SheetNames[0];
				let ws = wb.Sheets[wsname];

        let data = this.$xlsx.utils.sheet_to_json(ws)
        console.log(data)
			};

			reader.readAsArrayBuffer(file);
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
    },

    ...mapState([
      'minPerGroup',
      'maxPerGroup'
    ])
  },

  mounted() {
  }
}
</script>


<style lang="scss">

.seats {
  border: 3px solid #ccc;
  border-radius: .3rem;
}

.upload {
  display: none;
}

.group {
  position: relative;

  &::before {
    content: '';
    position: absolute;

    left: 1%;
    top: 1%;
    height: 98%;
    width: 98%;

    border: 1px solid #ccc;
    border-radius: 3px;
  }
}

.add {
  cursor: pointer;
}

</style>