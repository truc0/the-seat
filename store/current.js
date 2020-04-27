export const state = () => ({
  uid: null,
  items: null,
  arranged: null
})

export const mutations = {
  init(state, payload) {
    state.uid = payload.uid
    state.items = payload.items
    state.arranged = payload.arranged
  },

  setArranged(state, value) {
    state.arranged = value
  }
}
