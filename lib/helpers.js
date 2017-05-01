exports.either = {
  fromException: fn => (...args) => {
    try {
      return ['yea', fn(...args)]
    } catch (err) {
      return ['nay', err]
    }
  }
}
