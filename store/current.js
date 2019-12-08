export const state = () => ({
  seats: []
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