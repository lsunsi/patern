const wth = (evaluate, match) => (p, v, ...pvs) => (fn, args = []) => p ?
  (ms => ms ? wth(evaluate, match)(...pvs)(fn, [...args, ...ms]) : v)(match(p, v)) :
  evaluate(fn, args)

module.exports = wth
