import _ from 'lodash'
import Tools from '~/plugins/helpers'
import Table from '~/plugins/table'
import Storage from '~/plugins/storage'

export const state = () => ({
  uid: null,
  items: null,
  arranged: null,
  data: null
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
    state.items = payload.items
    state.arranged = payload.arranged
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
    if (!item.uid || typeof item.uid !== 'string') {
      throw TypeError("Item should contains a uid and it must be a string")
    }

    for (let index = 0; index < state.items.length; index++) {
      if (state.items[index].uid === item.uid) {
        state.items.pop(index)
        break;
      }
    }

    for (const group of state.arranged) {
      for (let index = 0; index < group.length; index++) {
        if (group[index].uid === item.uid) {
          group.pop(index)
          break;
        }
      }
    }

    Storage.update(state.uid, _.defaults({
      items: state.items,
      arranged: state.arranged
    }, state.data))

    state.data = Storage.get(state.uid)
  }
}
