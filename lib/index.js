const {all, compare, zip, evaluate} = require('../lib/utils')
const match = require('../lib/match')(all, compare, zip)

exports.case = require('./case')(evaluate, match)
exports.with = require('./with')(evaluate, match)
exports.matchers = require('./matchers')
exports.helpers = require('./helpers')

exports._case = exports.case
exports._with = exports.with

exports.$ = exports.matchers.some
exports._ = exports.matchers.any
