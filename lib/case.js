class MatchError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MatchError'
  }
}

MatchError.raise = message => {
  throw new MatchError(message)
}

const caze = (evaluate, match) => (p, f, ...pfs) => (...vs) => p ?
  (ms => ms ? evaluate(f, ...ms) : caze(evaluate, match)(...pfs)(...vs))(match(p, vs)) :
  MatchError.raise()

caze.MatchError = MatchError
module.exports = caze
