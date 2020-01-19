import { Arrange } from '~/plugins/arrange'
import { uuid } from '~/plugins/uuid'

export const state = () => ({
  arranged: null,
  items: [],
  info: {
    title: 'SeatTable'
  },
  minPerGroup: 2,
  maxPerGroup: 3
})

export const mutations = {
  setArranged(state, { arranged }) {
    state.arranged = arranged
  },

  clear(state) {
    state.arranged = []
    state.items = []
  },

  setItems(state, { items }) {
    items.forEach(item => {
      item.uid = uuid.v4()
    })

    state.items = items
  },

  addItem(state, { item }) {
    // add uid for each item
    if (!item.uid) {
      item.uid = uuid.v4()
    }

    state.items.push(item)

    if (state.arranged) {
      state.arranged.push(item)
    }
  },

  remove(state, { item }) {
    let id = isNaN(item) ? state.items.indexOf(item) : item
    let toBeRemoved = state.items.pop(id).uid // use uid to specify item

    // delete item from arranged
    if (state.items) {
      for (let index=0; index<state.items.length; ++index) {
        let target = state.items[index].findIndex(item => {
          return item.uid === toBeRemoved
        })

        if (target !== -1) {
          // found
          state.items[index].pop(target)

          break
        }
      }
    }

  }
}

export const actions = {
  async get({ commit, dispatch }) {
    const data = await this.$axios.$get('/demo.json')
    commit('setItems', { items: data })
    dispatch('rearrange', { method: 'random' })
  },

  async rearrange({ commit, state }, { method }) {
    let items = [...state.items] // create a new object
    let arranged = Arrange[method](
      items,
      state.minPerGroup, 
      state.maxPerGroup
      )

    commit('setArranged', { arranged })
  }
}