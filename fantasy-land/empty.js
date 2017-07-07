'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flEmpty = _require.empty;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('empty');
var unsupported = require('../helpers/unsupported-method')('empty');

var isNew = function isNew(a) {
  return typeof a[flEmpty] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flEmpty] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.empty === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.empty === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
var empty = function empty(monoid) {
  return isNew(monoid) ? monoid[flEmpty]() : isCtorNew(monoid) ? monoid.constructor[flEmpty]() : isOld(monoid) ? warn(monoid.empty()) : isCtorOld(monoid) ? warn(monoid.constructor.empty()) : /*otherwise*/unsupported(monoid);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
empty.curried = curry(1, empty); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M).() => M a
 *   where M is Monoid 
 */
empty.infix = function () {
  return empty(this);
};

module.exports = empty;