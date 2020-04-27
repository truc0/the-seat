export const state = () => ({
  showDrawer: false
})

export const mutations = {
  disableDrawer(state) {
    state.showDrawer = false
  },

  enableDrawer(state) {
    state.showDrawer = true
  },

  toggleDrawerStatus(state) {
    state.showDrawer = !state.showDrawer
  }
}
