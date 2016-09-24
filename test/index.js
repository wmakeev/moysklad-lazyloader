'use strict'

const test = require('blue-tape')

const createLazyLoader = require('../src')

test('LazyLoader is function', t => {
  t.equal(typeof createLazyLoader, 'function')
  t.end()
})

test('LazyLoader instance', t => {
  let lazy = createLazyLoader({})

  t.ok(lazy, 'is ok')
  t.ok(lazy.wrap, 'LazyLoader#wrap is ok')
  t.ok(typeof lazy.wrap === 'function', 'LazyLoader#wrap is function')

  t.end()
})

test('LazyLoader wrap', t => {
  let lazy = createLazyLoader({})

  let obj = {}
  let wrapped = lazy.wrap(obj)

  t.equal(typeof wrapped, 'object', 'wrap object')

  t.end()
})

test('Wrapped object', t => {
  let mockClient = {}
  let lazy = createLazyLoader(mockClient)

  let obj = {
    name: 'order_1'
  }
  let wrapped = lazy.wrap(obj)

  t.equal(wrapped.name, 'order_1', 'returns wrapped obj property')
  t.equal(typeof wrapped.foo, 'object', 'returns proxy with unknown key')
  t.equal(typeof wrapped.foo.bar, 'object', 'returns proxy chain with unknown keys')

  t.end()
})
