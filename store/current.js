import _ from 'lodash'
import Tools from '~/plugins/helpers'
import Table from '~/plugins/table'
import Storage from '~/plugins/storage'

export const state = () => ({
  uid: null,
  items: null,
  arranged: null,
  data: null,
  name: null,
  color: null,
  icon: null,
  description: null,
  reComputeKey: 1
})

export const mutations = {
  /*
   * init current state
   * @param state the state object
   * @param payload the data to be init
   * @return undefined
   */
  init(state, payload) {
    state.uid = payload.uid
    state.data = payload.data
    state.name = payload.name
    state.icon= payload.icon
    state.items = payload.items
    state.color = payload.color
    state.arranged = payload.arranged
    state.description = payload.description
  },

  /*
   * update arranged in Storage
   * @param state the state object
   * @param value the new value of arranged
   * @return undefined
   */
  setArranged(state, value) {
    state.arranged = value
    Storage.update(state.uid, _.defaults({
      arranged: state.arranged
    }, state.data))
    state.data = Storage.get(state.uid)
  },

  /*
   * add an new item and persist it
   * @param state the state object
   * @param item an object contains name, gender and uid(optional)
   * @return undefined
   */
  createItem(state, item) {
    if (!item.uid) {
      item.uid = Tools.uuid.v4()
    }

    state.items.push(item)
    if (state.arranged.length === 0) {
      state.arranged.push(Table.createBlock())
    }
    state.arranged[state.arranged.length - 1].data.push(item) // update arraned
    Storage.update(state.uid, _.defaults({
      items: state.items
    }, state.data))
    state.data = Storage.get(state.uid)
  },

  /*
   * delete an item and persist
   * @param state the state object
   * @param item an object must have key `uid`
   * @return undefined
   */
  deleteItem(state, item) {
    if (Number.isInteger(item)) {
      // item is index
      let index = item
      item = state.items[index]
      state.items.splice(index, 1)
    } else if (item.uid && typeof item.uid === 'string') {
      // item contains a uid
      for (let index = 0; index < state.items.length; index++) {
        if (state.items[index].uid === item.uid) {
          state.items.splice(index, 1)
          break;
        }
      }
    } else {
      throw TypeError("Item should contains a uid and it must be a string")
    }

    for (const group of state.arranged) {
      for (let index = 0; index < group.data.length; index++) {
        if (group.data[index].uid === item.uid) {
          group.data.splice(index, 1)
          break;
        }
      }
    }

    Storage.update(state.uid, _.defaults({
      items: state.items,
      arranged: state.arranged
    }, state.data))

    state.data = Storage.get(state.uid)
  },

  /**
   * update an item and persist
   * @param state the state object
   * @param item item with updated value
   * @return undefined
   */
  updateItem(state, item) {
    for (let index = 0; index < state.items.length; index++) {
      if (state.items[index].uid === item.uid) {
        state.items[index] = item
        break;
      }
    }

    for (const group of state.arranged) {
      for (let index = 0; index < group.data.length; index++) {
        if (group.data[index].uid === item.uid) {
          group.data[index] = item
          break;
        }
      }
    }

    state.reComputeKey++
    Storage.update(state.uid, _.defaults({
      items: state.items,
      arranged: state.arranged
    }, state.data))

    state.data = Storage.get(state.uid)
  },

  /**
   * Update meta and persist
   * @param state the state object
   * @param meta meta data to be updated
   * @return undefined
   */
  updateMeta(state, meta) {
    state.name = meta.name
    state.icon = meta.icon || "mdi-account"
    state.color = meta.color || "#000000"
    state.description = meta.description || ""

    Storage.update(state.uid, _.defaults({
      name: state.name,
      icon: state.icon,
      color: state.color,
      description: state.description
    }, state.data))

    state.data = Storage.get(state.uid)
  },

  /**
   * Delete current table and persist
   * @return undefined
   */
  deleteTable(state) {
    Storage.remove(state.uid)
  }
}
