import _ from 'lodash'
import Vue from 'vue'
import Gender from '~/plugins/gender'
import Tools from '~/plugins/helpers'

const Table = {
  template: {
    block: {
      uid: '',
      data: []
    },

    item: {
      uid: '',
      gender: Gender.Unknown,
      name: ''
    }
  },

  createBlock(data) {
    let block = _.cloneDeep(this.template.block)

    block.uid = Tools.uuid.v4()

    if (data) {
      if (Array.isArray(data)) {
        block.data = data
      } else {
        throw TypeError("data should be an array or undefined")
      }
    }

    return block
  },

  createItem(data) {
    let item = _.cloneDeep(this.template.item)
    if (data) {
      return _.defaults(data, item)
    }
    return item
  }
}

Vue.prototype.$table = Table

export default Table
