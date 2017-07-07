//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const { map: flMap } = require('folktale/helpers/fantasy-land');
const curry = require('folktale/core/lambda/curry');
const warn = require('folktale/helpers/warn-deprecated-method')('map');
const unsupported = require('folktale/helpers/unsupported-method')('map');


const isNew = (a) => typeof a[flMap] === 'function';
const isOld = (a) => typeof a.map === 'function';

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
const map = (functor, transformation) =>
  isNew(functor) ?  functor[flMap](transformation)
: isOld(functor) ?  warn(functor.map(transformation))
: /*otherwise*/     unsupported(functor);


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
map.curried = curry(2, (transformation, functor) =>     // eslint-disable-line no-magic-numbers
  map(functor, transformation)
);


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
map.infix = function(transformation) {
  return map(this, transformation);
};


module.exports = map;
