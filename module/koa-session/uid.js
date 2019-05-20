const {randomBytes} = require('crypto')

const safechars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function uid(len) {
  let buf, str = ''
  try {
    buf = randomBytes(len);
  } catch (err) {
    console.error(err)
    return uid(len)
  }
  for (const b of buf) {
    str += safechars[b % safechars.length]
  }
  return str
}

module.exports = uid