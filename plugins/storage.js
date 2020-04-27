import Vue from 'vue'
import Tools from '~/plugins/helpers.js'

class StorageDriverNotFoundError extends Error {}

let localStorage = {}
let Storage = {
  driver: null,
  availableDrivers: {
    'localStorage': localStorage
  },

  get(...args) {
    if (!this.driver) {
      throw StorageDriverNotFoundError(
        "Driver is not available, perhaps it is not bootstraped"
      )
    }
    return this.driver.get(...args)
  },

  update(...args) {
    if (!this.driver) {
      throw StorageDriverNotFoundError(
        "Driver is not available, perhaps it is not bootstraped"
      )
    }
    return this.driver.update(...args)
  },

  remove(...args) {
    if (!this.driver) {
      throw StorageDriverNotFoundError(
        "Driver is not available, perhaps it is not bootstraped"
      )
    }
    return this.driver.remove(...args)
  },

  create(...args) {
    if (!this.driver) {
      throw StorageDriverNotFoundError(
        "Driver is not available, perhaps it is not bootstraped"
      )
    }
    return this.driver.create(...args)
  },

  bootstrap(...args) {
    if (!this.driver) {
      throw StorageDriverNotFoundError(
        "Driver is not available, perhaps it is not bootstraped"
      )
    }
    return this.driver.bootstrap(...args)
  },

  use(driver) {
    if (!this.availableDrivers[driver]) {
      return false
    } else {
      this.driver = this.availableDrivers[driver]
      return true
    }
  }
}

localStorage = {
  name: 'the-seat-data',
  data: null,
  template: {
    full: {
      data: {}
    },
    item: {
      name: null,
      description: null,
      color: null,
      icon: null
    }
  },

  get(uid = null) {
    if (uid === null) {
      return this.data
    } else {
      return this.data.data[uid]
    }
  },

  update(uid = null, value) {
    if (uid === null) {
      // reset all
      this.data = value
    } else {
      this.data.data[uid] = value
    }
    this.save()
    return uid
  },

  remove(uid, value) {
    if (this.data.data[uid]) {
      delete this.data.data[uid]
      return true
    } else {
      return false
    }
  },

  create() {
    let uid = Tools.uuid.v4()
    this.data.data[uid] = this.template.item
    this.save()
    return uid
  },

  bootstrap() {
    this.data = localStorage.getItem(this.name)
    if (!this.data) {
      // create new record
      this.data = this.template.full
      this.save()
    }
  },

  save() {
    localStorage.setItem(this.name, JSON.stringify(this.data))
  }
}

Vue.prototype.$storage = Storage

export { Storage }
