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

  delete(id) {
    if(id) {
      delete this.space[id]
    }
  }

  refresh() {
    if(!Object.keys(this.space).length) {
      return 
    }
    let now = Date.now(), content
    for(let key in this.space) {
      content = JSON.parse(this.space[key])
      new Date(content.expires) < now &&  delete this.space[key]
    }
  }
}

module.exports = Store