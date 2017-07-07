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

var Deferred = require('../concurrency/future/_deferred');

/*~
 * stability: experimental
 * type: |
 *   forall e, v:
 *     (Promise v e) => Future e v
 */
var promiseToFuture = function promiseToFuture(aPromise) {
  var deferred = new Deferred();
  aPromise.then(function (value) {
    return deferred.resolve(value);
  }, function (error) {
    if (Cancelled.hasInstance(error)) {
      deferred.cancel();
    } else {
      deferred.reject(error);
    }
  });
  return deferred.future();
};

module.exports = promiseToFuture;