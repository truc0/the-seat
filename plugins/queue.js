class Queue {
  constructor() {
    this.data = []
  }

  push(item) {
    return this.data.push(item)
  }

  pop(item) {
    return this.data.shift()
  }

  isEmpty() {
    return (this.data.length === 0)
  }
}

/**
 * TaskQueue receive function as Queue item
 */
class TaskQueue extends Queue {
  constructor() {
    super()
    this.worker = null
  }

  hasWorker() {
    return !!(this.worker)
  }

  async work() {
    this.worker = true
    while (!this.isEmpty()) {
      let task = this.pop()
      await task()
    }
    this.worker = null
  }
}

export default {
  Queue,
  TaskQueue
}
