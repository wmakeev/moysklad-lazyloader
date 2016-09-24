'use strict'

const flowright = require('lodash.flowright')

// const refLoader = require('./handlers/refLoader')

const symbols = {
  type: Symbol('type'),
  key: Symbol('key'),
  path: Symbol('path'),
  parent: Symbol('parent')
}

// let next = (target, key, receiver) => Reflect.get(target, key, receiver)

// let handleGet = flowright([refLoader])(next)

// Mock check
let getPropType = (type, propName) => propName

let createProxy

let handler = {
  get (target, key, receiver) {
    // Если ключ есть сразу возвращаем значение
    if (key in target) {
      return Reflect.get(target, key, receiver)
    }

    // Необходимо вернуть значение для свой-ва
    if (key === 'then') {
      // Proxy
      if (target.hasOwnProperty(symbols.key)) {
        let promise = Promise.resolve(target[symbols.path].join('.'))
        return promise.then.bind(promise)
      } else { // Root
        return Reflect.get(target, key, receiver)
      }
    }

    // TODO Нужен safe режим? Чтобы не прерывать цепочку и возвращать ошибку в конце.
    // Определяем тип запрашиваемого свойства
    let propType
    // let targetType = target.TYPE_NAME || target[symbols.type]
    // if (targetType) {
    //   propType = getPropType(targetType, key)
    // }
    // // Если тип не найден (св-во не соотв. схеме) возвращаем станд. значение
    // if (!propType) {
    //   return Reflect.get(target, key, receiver)
    // }

    let chainObj = {
      [symbols.type]: propType,
      [symbols.parent]: target,
      [symbols.key]: key,
      [symbols.path]: target[symbols.path] ? target[symbols.path].concat([key]) : [key]
    }

    return createProxy(chainObj)
  }
}

createProxy = obj => {
  return new Proxy(obj, handler)
}

function createLazyLoader () {
  return {
    wrap (obj) {
      return createProxy(obj)
    }
  }
}

module.exports = createLazyLoader
