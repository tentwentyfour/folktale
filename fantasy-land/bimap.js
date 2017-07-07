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
    flBimap = _require.bimap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('bimap');
var unsupported = require('../helpers/unsupported-method')('bimap');

var isNew = function isNew(a) {
  return typeof a[flBimap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.bimap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b, (a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
var bimap = function bimap(bifunctor, transformLeft, transformRight) {
  return isNew(bifunctor) ? bifunctor[flBimap](transformLeft, transformRight) : isOld(bifunctor) ? warn(bifunctor.bimap(transformLeft, transformRight)) : /*otherwise*/unsupported(bifunctor);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     ((a) => c) => ((b) => d) => (F a b) => F c d
 *   where F is Bifunctor
 */
bimap.curried = curry(3, function (transformLeft, transformRight, bifunctor) {
  return (// eslint-disable-line no-magic-numbers
    bimap(bifunctor, transformLeft, transformRight)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b).((a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
bimap.infix = function (transformLeft, transformRight) {
  return bimap(this, transformLeft, transformRight);
};

module.exports = bimap;