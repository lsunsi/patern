const test = require('ava')
const {any, some} = require('../lib/matchers')

test('any', t => {
  t.is(any(), 1)
  t.is(any(1), 1)
  t.is(any([]), 1)
  t.is(any(null), 1)
  t.is(any(false), 1)
  t.is(any(() => false), 1)
  t.is(any(Symbol('s')), 1)
})

test('some', t => {
  t.is(some(), 0)
  t.is(some(1), 2)
  t.is(some([]), 2)
  t.is(some(null), 0)
  t.is(some(false), 2)
  t.is(some(() => false), 2)
  t.is(some(Symbol('s')), 2)
})
