class MatchError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MatchError'
  }
}

MatchError.raise = message => {
  throw new MatchError(message)
}

const _case = (evaluate, match) => (p, f, ...pfs) => (...vs) => p ?
  (ms => ms ? evaluate(f, ...ms) : _case(evaluate, match)(...pfs)(...vs))(match(p, vs)) :
  MatchError.raise()

_case.MatchError = MatchError
module.exports = _case
