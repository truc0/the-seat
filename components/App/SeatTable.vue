<template>
  <div>
    <v-row align="center" justify="center" class="ma-3">
      <span class="subtitle-1 grey--text">F6E</span>
      <v-spacer></v-spacer>
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
      rearrangeOptions: [
        {
          text: 'random',
          action: () => this.rearrange('random')
        }
      ]
    }
  },

  methods: {
    newUid() {
      return this.$uuid.v4()
    },

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

    emitter(value) {
      this.$emit('input', value)
    },

    rearrange(method) {
      let arranged = this.$group[method](
        value,
        this.minPerGroup, 
        this.maxPerGroup
        )
      console.log(arranged)
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

</style>