module.exports = function thenify(fn) {
  if(!fn.toString().includes('callback')) {
    return fn
  }
  return function () {
    let theArguments = arguments;
    return new Promise(function (resolve, reject) {
      let newArguments = Array.prototype.slice.call(theArguments, 0);
      if(typeof newArguments[newArguments.length - 1] === "function") {
        newArguments.splice(newArguments.length - 1, 1);
      }
      let func = callbackFunc(resolve, reject);
      fn(...newArguments, func);
    })
  }
}

function callbackFunc(resolve, reject) {
  return function () {
    if (arguments[0]) {
      return reject(arguments[0])
    }
    if (arguments.length === 2) {
      return resolve(arguments[1])
    } else {
      return resolve(Array.prototype.slice(arguments, 1))
    }
  }
}