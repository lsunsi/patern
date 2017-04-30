const test = require('ava')
const {all, compare, zip} = require('../lib/utils')
const match = require('../lib/match')(all, compare, zip)

test('match # diff lengths', t => {
  const l1 = [1]
  const l2 = [1, 2]

  t.false(match(l1, l2))
  t.false(match(l2, l1))
})

test('match # constants', t => {
  const l1 = [1, 2]
  const l2 = [2, 1]

  t.true(match(l1, l1))
  t.true(match(l2, l2))
  t.false(match(l1, l2))
  t.false(match(l2, l1))
})

test('match # functions', t => {
  const pos = n => n > 0
  const neg = n => n < 0
  const not = n => !n

  const pattern = [neg, not, pos]

  t.true(match(pattern, [-1, 0, 1]))
  t.false(match(pattern, [0, 0, 1]))
  t.false(match(pattern, [-1, 0, 0]))
  t.false(match(pattern, [-1, 1, 1]))
})
