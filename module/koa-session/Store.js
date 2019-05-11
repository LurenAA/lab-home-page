class Store {
  constructor () {
    this.space = {}
  }

  add(key, value) {
    this.space[key] = value
  }

  isset(id) {
    return this.space[id] !== undefined
  }
}

module.exports = Store