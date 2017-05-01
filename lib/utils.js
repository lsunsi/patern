exports.all = list =>
  list.reduce((a, b) => a && b, true)

exports.compare = ([p, v]) =>
  (p && p.call) ? p(v) : p === v ? 1 : 0

exports.evaluate = (f, a) =>
  f === null ? a : (f && f.call) ? f(a) : f

exports.zip = (list, ...lists) =>
  list.map((a, i) => [a, ...lists.map(l => l[i])])
