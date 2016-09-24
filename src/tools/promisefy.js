'use strict'

function promisefyFunction (func, context) {
  return function () {
    let args = Array.prototype.slice.call(arguments, 0)
    return new Promise(function (resolve, reject) {
      var cb = function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
      func.apply(context, args.concat([cb]))
    })
  }
}

module.exports = function promisefy (methods, context) {
  if (typeof methods === 'function') {
    return promisefyFunction(methods, context)
  } else if (methods instanceof Array) {
    if (!context) {
      throw new Error('context must to be defined with array of methods')
    }
    return methods.reduce(function (res, m) {
      res[m] = promisefyFunction(context[m], context)
      return res
    }, {})
  } else {
    throw new Error('method must to be array or function')
  }
}
