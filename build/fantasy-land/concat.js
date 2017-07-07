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
    flConcat = _require.concat;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('concat');
var unsupported = require('../helpers/unsupported-method')('concat');

var isNewSemigroup = function isNewSemigroup(a) {
  return typeof a[flConcat] === 'function';
};
var isOldSemigroup = function isOldSemigroup(a) {
  return typeof a.concat === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => S a
 *   where S is Semigroup
 */
var concat = function concat(semigroupLeft, semigroupRight) {
  return isNewSemigroup(semigroupLeft) ? semigroupLeft[flConcat](semigroupRight) : isOldSemigroup(semigroupLeft) ? warn(semigroupLeft.concat(semigroupRight)) : /*otherwise*/unsupported(semigroupLeft);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => S a
 *   where S is Semigroup
 */
concat.curried = curry(2, function (semigroupRight, semigroupLeft) {
  return (// eslint-disable-line no-magic-numbers
    concat(semigroupLeft, semigroupRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => S a
 *   where S is Semigroup
 */
concat.infix = function (aSemigroup) {
  return concat(this, aSemigroup);
};

module.exports = concat;