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
    flOf = _require.of;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('of');
var unsupported = require('../helpers/unsupported-method')('of');

var isNew = function isNew(a) {
  return typeof a[flOf] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flOf] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.of === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.of === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F, a) => F a
 *   where F is Applicative
 */
var of = function of(applicative, value) {
  return isNew(applicative) ? applicative[flOf](value) : isCtorNew(applicative) ? applicative.constructor[flOf](value) : isOld(applicative) ? warn(applicative.of(value)) : isCtorOld(applicative) ? warn(applicative.constructor.of(value)) : /*otherwise*/unsupported(applicative);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F) => (a) => F a
 *   where F is Applicative
 */
of.curried = curry(2, of); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F).(a) => F a
 *   where F is Applicative
 */
of.infix = function (value) {
  return of(this, value);
};

module.exports = of;