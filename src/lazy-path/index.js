'use strict'

let isPromise = require('is-promise')

const getVirtualProperty = require('./getVirtualProperty')

function getProperty (obj, propName) {
  if (propName in obj) {
    return obj[propName]
  } else {
    return getVirtualProperty(obj, propName)
  }
}

module.exports = client => {
  // Кеш загруженных объектов для текущего экземпляра LazyLoader'a
  let entityCacheMap = new Map()

  return function getDeepProperty (src, path) {
    if (!(path instanceof Array || path.length > 0)) {
      throw new Error('path must to be an array')
    }

    let head = path[0]
    let tail = path.slice(1, path.length)

    let getTailPathProperty = obj => {
      let prop = getProperty(obj, head)
      if (tail.length === 0) {
        return prop
      } else {
        return getDeepProperty(prop, tail)
      }
    }

    return isPromise(src)
      ? src.then(getTailPathProperty)
      : getTailPathProperty(src)
  }
}
