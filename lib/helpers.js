exports.eitherFromException =
  fn => (...args) => {
    try {
      return ['yea', fn(...args)]
    } catch (err) {
      return ['nay', err]
    }
  }
