const _with = (evaluate, match) => (p, v, ...pvs) => (fn, args = []) => p ?
  (ms => ms ? _with(evaluate, match)(...pvs)(fn, [...args, ...ms]) : v)(match(p, v)) :
  evaluate(fn, args)

module.exports = _with
