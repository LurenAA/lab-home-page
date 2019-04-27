const http = require('http')

const methodsList = [
  "get",
  "head",
  "post",
  "put",
  "delete",
  "connect",
  "options",
  "trace",
  "patch"
]

function getCurrentNodeMethods() {
  return http.METHODS && http.METHODS.map(function (item) {
    return item.toLowerCase()
  })
}

module.exports = getCurrentNodeMethods() || methodsList