'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/future/_execution-state'),
    Cancelled = _require.Cancelled;

/*~
 * stability: experimental
 * type: |
 *   forall e, v:
 *     (Future e v) => Promise v e
 */


var futureToPromise = function futureToPromise(aFuture) {
  return new Promise(function (resolve, reject) {
    aFuture.listen({
      onResolved: function onResolved(value) {
        return resolve(value);
      },
      onRejected: function onRejected(error) {
        return reject(error);
      },
      onCancelled: function onCancelled() {
        return reject(Cancelled());
      }
    });
  });
};

module.exports = futureToPromise;