// start end falg
function pathToReg(path, options) {

  if(path instanceof RegExp) {
    return path
  }

  if(typeof path !== 'string') {
    console.error('path must be a string')
    return 
  }

  options = Object.assign({},{
    start: true,
    end: true
  }, options)

  if(options.start) {
    path = '^' + path
  }

  let key = [], tmp
  path = path.replace(/(?<=\/)(:)?([^\/\?;\.\*]+)(\*)?/g, function (match, a, b, c) {
    tmp = ''
    if(!a) {
      tmp += b
    } else {
      key.push(b)
      tmp += '[^\\s/]+'
    }

    if(c) {
      tmp += '[^/\\s\\?]*'
    }
    return tmp
  })

  path += '(/?|(\\?[^\\/?;.*=&]+\\=[^/?;.*=&]+(&[^\\/?;.*=&]+\\=[^/?;.*=&]+)*)?)'

  if(options.end) {
    path += '$'
  }
  try {
    return new RegExp(path, options.flag)
  } catch (err) {
    console.error(err)
    return ''
  }
}

module.exports = pathToReg