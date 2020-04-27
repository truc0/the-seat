import _ from 'lodash'
import Storage from '~/plugins/storage'

export const state = () => ({
  uid: null,
  items: null,
  arranged: null,
  data: null
})

export const mutations = {
  init(state, payload) {
    state.uid = payload.uid
    state.data = payload.data
    state.items = payload.items
    state.arranged = payload.arranged
  },

  setArranged(state, value) {
    state.arranged = value
    Storage.update(state.uid, _.defaults({
      arranged: state.arranged
    }, state.data))
    state.data = Storage.get(state.uid)
  }
}
