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
    flMap = _require.map;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('map');
var unsupported = require('../helpers/unsupported-method')('map');

var isNew = function isNew(a) {
  return typeof a[flMap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.map === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a, (a) => b) => F b
 *   where F is Functor
 */
var map = function map(functor, transformation) {
  return isNew(functor) ? functor[flMap](transformation) : isOld(functor) ? warn(functor.map(transformation)) : /*otherwise*/unsupported(functor);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     ((a) => b) => (F a) => F b
 *   where F is Functor
 */
map.curried = curry(2, function (transformation, functor) {
  return (// eslint-disable-line no-magic-numbers
    map(functor, transformation)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a).((a) => b) => F b
 *   where F is Functor
 */
map.infix = function (transformation) {
  return map(this, transformation);
};

module.exports = map;