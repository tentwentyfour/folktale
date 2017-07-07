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
    flEquals = _require.equals;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('equals');
var unsupported = require('../helpers/unsupported-method')('equals');

var isNew = function isNew(a) {
  return typeof a[flEquals] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.equals === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => Boolean
 *   where S is Setoid
 */
var equals = function equals(setoidLeft, setoidRight) {
  return isNew(setoidLeft) ? setoidLeft[flEquals](setoidRight) : isOld(setoidLeft) ? warn(setoidLeft.equals(setoidRight)) : /*otherwise*/unsupported(setoidLeft);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => Boolean
 *   where S is Setoid
 */
equals.curried = curry(2, function (setoidRight, setoidLeft) {
  return (// eslint-disable-line no-magic-numbers
    equals(setoidLeft, setoidRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => Boolean
 *   where S is Setoid
 */
equals.infix = function (aSetoid) {
  return equals(this, aSetoid);
};

module.exports = equals;