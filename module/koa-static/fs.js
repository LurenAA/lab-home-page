let thenify = require('../thenify/index')
let fs = require('fs')
let {
  sep
} = require('path')

function isHidden(root = '', path) {
  path = path.substr(root.length).split(sep)
  for(let i = 0, len = path.length; i < len; i++) {
    if(path[i][0] === '.') {
      return true
    }
  }
  return false
}

function thenifyAll() {
  let keys = Object.keys(fs), des = {}
  keys.forEach(function (value) {
    if(typeof fs[value] !== 'function' || 
    value.charCodeAt(0) < 90 || value[0] === '.') {
      return 
    }
    des[value] = thenify(fs[value])
  })

  return des
}

let promise_fs = thenifyAll()

module.exports = {
  fs: promise_fs,
  isHidden
}