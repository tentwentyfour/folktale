'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('./result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b: (() => b :: throws a) => Result a b
 */


var _try = function _try(f) {
  try {
    return Ok(f());
  } catch (e) {
    return Error(e);
  }
};

module.exports = _try;