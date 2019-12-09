export const state = () => ({
  seats: [],
  info: {
    title: 'SeatTable'
  }
})

export const mutations = {
  set(state, { seats }) {
    state.seats = seats
  },

  clear(state) {
    state.seats = []
  },

  add(state, { seat }) {
    state.seats.push(seat)
  },

  remove(state, { seat }) {
    let id = isNaN(seat) ? state.seats.indexOf(seat) : seat
    state.seats.pop( id )
  }
}

export const actions = {
  async get({ commit }) {
    const data = await this.$axios.$get('/demo.json')
    commit('set', { seats: data })
  },

  async setSeats({ commit }, { val }) {
    commit('set', { seats: val })
  }
}