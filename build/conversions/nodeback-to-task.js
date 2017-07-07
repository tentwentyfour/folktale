'use strict';

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../concurrency/task'),
    task = _require.task;

/*~
 * stability: experimental
 * authors:
 *   - "@rpearce"
 * type: |
 *    forall s, e, r:
 *    ((Any..., (e, s) => Void) => Void)
 *    => (Any...)
 *    => Task e s r
 */

var nodebackToTask = function nodebackToTask(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task(function (r) {
      return fn.apply(undefined, args.concat([function (err, data) {
        return err ? r.reject(err) : r.resolve(data);
      }]));
    });
  };
};

module.exports = nodebackToTask;