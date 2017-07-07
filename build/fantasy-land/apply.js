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
    ap = _require.ap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('ap');
var unsupported = require('../helpers/unsupported-method')('ap');

var isNew = function isNew(a) {
  return typeof a[ap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.ap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b, F a) => F b
 *   where F is Apply
 */
var apply = function apply(applicativeFunction, applicativeValue) {
  return isNew(applicativeValue) ? applicativeValue[ap](applicativeFunction) : isOld(applicativeFunction) ? warn(applicativeFunction.ap(applicativeValue)) : /*otherwise*/unsupported(applicativeFunction);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b) => (F a) => F b
 *   where F is Apply
 */
apply.curried = curry(2, apply); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b).(F a) => F b
 *   where F is Apply
 */
apply.infix = function (applicativeValue) {
  return apply(this, applicativeValue);
};

module.exports = apply;