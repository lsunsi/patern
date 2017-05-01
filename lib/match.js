module.exports = (all, compare, zip) => (pattern, values) =>
  (comparison =>
    pattern.length === values.length && all(comparison) ?
      values.filter((v, i) => comparison[i] === 2) : false
  )(zip(pattern, values).map(compare))
