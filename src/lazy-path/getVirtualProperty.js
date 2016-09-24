'use strict'

module.exports = function getVirtualProperty (object, propName) {
  return new Promise((resolve, reject) => {
    resolve('virtual:' + propName)
  })
}
