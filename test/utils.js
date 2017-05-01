const test = require('ava')
const {all, zip, compare, evaluate} = require('../lib/utils')

test('all list', t => {
  const l1 = [true, true]
  const l2 = [true, false, true]
  const l3 = []

  t.true(all(l1))
  t.false(all(l2))
  t.true(all(l3))
})

test('zip list list ...', t => {
  const l1 = [1, 2, 3]
  const l2 = [4, 5]
  const l3 = [6, 7, 8, 9]

  const lz = [[1, 4, 6], [2, 5, 7], [3, undefined, 8]]
  const res = zip(l1, l2, l3)

  t.deepEqual(lz, res)
})

test('compare val val', t => {
  t.is(compare([1, 2]), 0)
  t.is(compare([3, 3]), 1)
  t.is(compare([[], []]), 0)
  t.is(compare([{}, {}]), 0)
  t.is(compare([null, null]), 1)
})

test('compare fn, val', t => {
  const any = () => true
  const pos = a => a > 0

  t.true(compare([any, Symbol('s')]))
  t.false(compare([pos, 0]))
  t.true(compare([pos, 1]))
})

test('evaluate val', t => {
  const args = [0, 1]

  t.is(evaluate('2', args), '2')
  t.is(evaluate(args, '2'), args)
  t.is(evaluate(null, args), args)
})

test('evaluate fn', t => {
  const first = l => l[0]
  const sum = ([a, b]) => a + b
  const args = [1, 2]

  t.is(evaluate(first, args), 1)
  t.is(evaluate(sum, args), 3)
})
