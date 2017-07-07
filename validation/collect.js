'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var _require = require('./validation'),
    Success = _require.Success;

/*~
 * stability: experimental
 * type: |
 *   forall a, b: (Array (Validation a b)) => Validation a b
 *   where a is Semigroup
 */


var collect = function collect(validations) {
  return validations.reduce(function (a, b) {
    return a.concat(b);
  }, Success());
};

module.exports = collect;