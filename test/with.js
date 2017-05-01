const test = require('ava')
const {all, compare, zip, evaluate} = require('../lib/utils')
const match = require('../lib/match')(all, compare, zip)
const _with = require('../lib/with')(evaluate, match)

const $ = () => 2
const float = s => (res => isNaN(res) ? ['nay', s] : ['aye', res])(parseFloat(s))

test('with # ayes', t => {
  const f0 = _with(
    ['aye', $], float('1.2'),
    ['aye', $], float('2.1')
  )(([f1, f2]) => f1 + f2)

  t.is(f0, 3.3)
})

test('with # nays', t => {
  const f0 = _with(
    ['aye', $], float(':('),
    ['aye', $], float(':[')
  )(([f1, f2]) => f1 + f2)

  t.deepEqual(f0, ['nay', ':('])
})

test('with # both', t => {
  const f0 = _with(
    ['aye', $], float('1.2'),
    ['aye', $], float(':[')
  )(([f1, f2]) => f1 + f2)

  t.deepEqual(f0, ['nay', ':['])
})

test('with # none', t => {
  const a = _with()(() => ':)')

  t.is(a, ':)')
})
