/* Answers
0: not-match
1: match-exclude
2: match-include
*/

exports.any = () => 1

exports.some = a =>
  (a !== null && a !== undefined) ?
  2 : 0
