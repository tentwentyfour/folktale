'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('./_task'),
    of = _require.of;

/*~
 * stability: experimental
 * type: |
 *   forall v, e: ([Task e v Any]) => Task e [v] Any
 */


var waitAll = function waitAll(tasks) {
  if (tasks.length === 0) {
    throw new Error('Task.waitAll() requires a non-empty array of tasks.');
  }

  return tasks.reduce(function (a, b) {
    return a.and(b).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          xs = _ref2[0],
          x = _ref2[1];

      return [].concat(_toConsumableArray(xs), [x]);
    });
  }, of([]));
};

module.exports = waitAll;