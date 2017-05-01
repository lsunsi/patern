const test = require('ava')
const {all, compare, zip, evaluate} = require('../lib/utils')
const match = require('../lib/match')(all, compare, zip)
const _case = require('../lib/case')(evaluate, match)
const {MatchError} = require('../lib/case')

test('case # fatorial', t => {
  const fat = _case(
    [], -1,
    [0], 1,
    [() => 2], n => n * fat(n - 1)
  )

  t.is(fat(), -1)
  t.is(fat(0), 1)
  t.is(fat(5), 120)
})

test('case # quicksort', t => {
  const sort = _case(
    [a => a.length === 0 ? 1 : 0], [],
    [() => 2], ([x, ...xs]) =>
      [...sort(xs.filter(a => a < x)), x, ...sort(xs.filter(a => a > x))]
  )

  const l0 = [1, 2, 3]
  const l1 = [3, 2, 1]
  const l2 = [2, 3, 1]
  const l3 = [3, 2, 1]

  t.deepEqual(sort(l0), l0)
  t.deepEqual(sort(l1), l0)
  t.deepEqual(sort(l2), l0)
  t.deepEqual(sort(l3), l0)
})

test('case # callback', t => {
  const cb = _case(
    [() => 2], a => a.error,
    [() => 1, () => 2], null,
  )

  t.is(cb(null, ':)'), ':)')
  t.is(cb({error: ':('}), ':(')
})

test('case # non-exhaustive', t => {
  t.throws(() =>
    _case()(1)
  , MatchError)

  t.throws(() =>
    _case([0], 0, [2], 2)(1)
  , MatchError)
})
