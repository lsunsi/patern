# Patern
*Pattern matching for JavaScript, because it deserves it.*

###### yarn add patern
[![Release](https://img.shields.io/badge/Release-0.1.0-blue.svg?style=flat-square)](https://github.com/lsunsi/patern/releases)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/lsunsi/patern/blob/master/LICENSE)

## Pattern & Matching
These are the two main concepts this abstraction relies on.
A **pattern** is a list of conditions to be matched against a list of values.
The **matching** process is responsible for determining if there is a match between pattern and values and capturing matched values.

For this implementation, a **pattern** is nothing more than a list of values and functions. Each item has to determine if a value is a match and if it should be captured. Capturing a value just means it's gonna be passed along to the callback function.

If an item from the pattern is a value, it'll match against values that are strictly equal (===) to it. Values are always non-capturing, so the matched value won't be available in the callback. If an item is a function, it'll be called with the value. It should return 0 to reject the value, 1 to match and not capture it and 2 to match and capture.

## What's in the box
The pattern matching is achieved with two main exported functions:
- `case` or `_case`: function used switch/case style pattern matching
- `with` or `_with`: function used for either unpacking style pattern matching

In order to help building patterns two matchers are exported:
- `$`(some): it matches against a not-null and not-undefined value and captures it
- `_`(any): it matches against any value and doesn't capture it

## Usage examples

Fatorial
```javascript
import {_case, $} from 'patern'

const fat = _case(
  [], -1,
  [0], 1,
  [$], n => n * fat(n - 1)
)

fat()  // -1
fat(0) // 1
fat(5) // 120
```

QuickSort
```javascript
import p from 'patern'

const empty = a => a.length?0:1
const smaller = x => a => a < x
const larger = x => a => a > x

const qs = p.case(
  [empty], [],
  [p.$], ([x, ...xs]) =>
    [...qs(xs.filter(smaller(x))), x, ...qs(xs.filter(larger(x)))]
)

qs([]) // []
qs([2, 1]) // [1, 2]
qs([2, 3, 1]) // [1, 2, 3]
```

Parsing
```javascript
import {_case, _with, $} from 'patern'

const float = s => _case(
  [NaN], ['nay'],
  [$], n => ['yea', n]
)(parseFloat(s))

const sum = _with(
  ['yea', $], float('1.2'),
  ['yea', $], float('2.1')
)(([f1, f2]) => f1 + f2)

sum // 3.3
```

## (: hi
how are you feeling today?
