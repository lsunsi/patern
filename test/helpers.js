const test = require('ava')
const {eitherFromException} = require('../lib/helpers')

test('either fromException', t => {
  const err = new Error(':(')
  const throws = n => {
    if (n < 0) {
      throw err
    }
    return ':)'
  }

  const eithers = eitherFromException(throws)

  t.deepEqual(t.throws(throws.bind(null, -1)), err)
  t.deepEqual(eithers(-1), ['nay', err])
  t.deepEqual(throws(1), ':)')
  t.deepEqual(eithers(1), ['yea', ':)'])
})
