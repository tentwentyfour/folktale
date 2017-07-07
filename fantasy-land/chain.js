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
    flChain = _require.chain;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('chain');
var unsupported = require('../helpers/unsupported-method')('chain');

var isNew = function isNew(a) {
  return typeof a[flChain] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.chain === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a, (a) => C b) => C b
 *   where C is Chain
 */
var chain = function chain(monad, transformation) {
  return isNew(monad) ? monad[flChain](transformation) : isOld(monad) ? warn(monad.chain(transformation)) : /*otherwise*/unsupported(monad);
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     ((a) => C b) => (C a) => C b
 *   where C is Chain
 */
chain.curried = curry(2, function (transformation, monad) {
  return (// eslint-disable-line no-magic-numbers
    chain(monad, transformation)
  );
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a).((a) => C b) => C b
 *   where C is Chain
 */
chain.infix = function (transformation) {
  return chain(this, transformation);
};

module.exports = chain;