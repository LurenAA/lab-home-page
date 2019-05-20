const crypto  = require('crypto')

function sign(val, key) {
  const hmac = crypto.createHmac('sha256', key);
  return hmac.update(val).digest('Base64').replace(/[+/?%=#\s]/g,'')
}

function unsign(compar, val, key) {
  let buf_1 = Buffer.from(compar)
  let compar2 = sign(val, key)
  if(compar2.length !== compar.length) {
    return false
  }
  let buf_2 = Buffer.from(compar2)
  return crypto.timingSafeEqual(buf_1, buf_2)
}

exports.sign = sign
exports.unsign = unsign