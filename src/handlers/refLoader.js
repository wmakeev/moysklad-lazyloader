'use strict'

// Ref loader
module.exports = next => (target, key, receiver) => {
  if (typeof key === 'string' && `${key}Uuid` in target) {
    return
  } else {
    return next(target, key, receiver)
  }
}
