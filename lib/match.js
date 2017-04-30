module.exports = (all, compare, zip) => (pattern, values) =>
  pattern.length === values.length &&
  all(zip(pattern, values).map(compare))
