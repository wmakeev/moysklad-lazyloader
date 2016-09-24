'use strict'

// Ref loader
module.exports = (client, opt) => next => (obj, key) => {
  if (typeof key === 'string' && `${key}Uuid` in obj) {
    return client.load(key, obj[`${key}Uuid`])
  } else {
    return next(obj, key)
  }
}
