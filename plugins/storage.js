import Vue from 'vue'

let Storage = {}

Storage.template = {
  setup: null,
  isSettedUp: null,
  clear: null,
  create: null,
  delete: null,
  update: null,
  query: null,

  /* optional */
  get: null,

}

Storage.localStorage = {

  /* properties */
  prefix: 'st_',
  version: '1',
  defaultName: 'default',
  meta: {
    version: 1,
    count: 0,
    avaiable: []
  },

  /* methods */
  setPrefix(value) {
    this.prefix = value
  },

  isSettedUp() {
    return !(localStorage.getItem('meta') == undefined)
  },

  next({ name }) {
    this.meta.avaiable.push(name)

    this.meta.count += 1
    this.updateMeta()
    return this.meta.count
  },

  updateMeta() {
    localStorage.setItem('meta', JSON.stringify(this.meta))
  },

  setup() {
    if (this.isSettedUp()) {
      this.meta = JSON.parse(localStorage.getItem('meta'))
      return {
        status: true,
        msg: 'already setted'
      }
    } else {
      localStorage.setItem('meta', JSON.stringify())
      return {
        status: true,
        msg: 'new database setted'
      }
    }
  },

  create(data, name=null) {
    if (name === null) {
      if (data.name) {
        name = data.name
      } else {
        name = this.defaultName
        data.name = this.defaultName
      }
    }
    let id = this.next({ name })
    data._id = id

    localStorage.setItem(this.prefix+id, JSON.stringify(data))
  },

  delete(id) {
    if (typeof id === "string" || id instanceof String) {
      id = this.meta.avaiable.indexOf(id)
    }

    this.meta.avaiable[id] = null
    this.updateMeta()

    localStorage.removeItem(this.prefix+id)
  },

  update(id, newData) {
    this.meta.avaiable[id] = newData.name
    localStorage.setItem(this.prefix+id, JSON.stringify(newData))
  },

  get(id) {
    return JSON.parse(localStorage.getItem(this.prefix+id))
  },

  get_all() {
    let res = {
      count: 0,
      data: []
    }

    for (let i=0; i<=this.meta.avaiable.length; ++i) {
      if (this.meta.avaiable[i] === null) {
        continue
      }

      res.count += 1
      data.push(
        JSON.parse(localStorage.getItem(this.prefix+i))
      )            
    }

    return res
  },

  query(id) {
    return this.get(id)
  }

}

Vue.prototype.$save = Storage

export { Storage }