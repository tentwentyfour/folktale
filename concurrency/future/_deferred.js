'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]--------------------------------------------------
var define = require('../../helpers/define');
var thunk = require('../../helpers/thunk');

var Future = thunk(function (_) {
  return require('./_future');
});

var _require = require('./_execution-state'),
    Pending = _require.Pending,
    Cancelled = _require.Cancelled,
    Rejected = _require.Rejected,
    Resolved = _require.Resolved;

// --[ Helpers ]-------------------------------------------------------

/*~
 * type: |
 *   ('a: Deferred 'f 's, ExecutionState 'f 's) => Void :: mutates 'a
 */


var moveToState = function moveToState(deferred, newState) {
  if (!Pending.hasInstance(deferred._state)) {
    var description = newState.matchWith({
      Resolved: function Resolved(_) {
        return 'resolved';
      },
      Rejected: function Rejected(_) {
        return 'rejected';
      },
      Cancelled: function Cancelled(_) {
        return 'cancelled';
      }
    });
    throw new Error('Only pending deferreds can be ' + description + ', this deferred is already ' + description + '.');
  }

  deferred._state = newState;

  var listeners = deferred._listeners;

  var _loop = function _loop(i) {
    newState.matchWith({
      Resolved: function Resolved(_ref) {
        var value = _ref.value;
        return listeners[i].onResolved(value);
      },
      Rejected: function Rejected(_ref2) {
        var reason = _ref2.reason;
        return listeners[i].onRejected(reason);
      },
      Cancelled: function Cancelled(_) {
        return listeners[i].onCancelled();
      }
    });
  };

  for (var i = 0; i < listeners.length; ++i) {
    _loop(i);
  }
  deferred._listeners = [];
};

// --[ Implementation ]------------------------------------------------
/*~
 * stability: experimental
 */
function Deferred() {
  define(this, '_state', Pending());
  define(this, '_listeners', []);
}

Deferred.prototype = _defineProperty({
  // ---[ State and configuration ]------------------------------------
  /*~
   * isRequired: true
   * type: |
   *   get (Deferred 'f 's) => ExecutionState 'f 's
   */
  get _state() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._state.');
  },

  /*~
   * isRequired: true
   * type: |
   *   get (Deferred 'f 's) => Array (DeferredListener 'f 's)
   */
  get _listeners() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._listeners');
  },

  // ---[ Resolving a deferred ]---------------------------------------
  /*~
   * type: |
   *   ('a: Deferred 'f 's).('s) => 'a :: mutates 'a
   */
  resolve: function resolve(value) {
    moveToState(this, Resolved(value));
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).('f) => 'a :: mutates 'a
   */
  reject: function reject(reason) {
    moveToState(this, Rejected(reason));
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).() => 'a :: mutates 'a
   */
  cancel: function cancel() {
    moveToState(this, Cancelled());
    return this;
  },


  /*~
   * type: |
   *   ('a: Deferred 'f 's).() => 'a :: mutates 'a
   */
  maybeCancel: function maybeCancel() {
    if (Pending.hasInstance(this._state)) {
      this.cancel();
    }
    return this;
  },


  // ---[ Reacting to events in a deferred ]---------------------------
  /*~
   * type: |
   *   ('a: Deferred 'f 's).(DeferredListener 'f 's) => Void
   */
  listen: function listen(pattern) {
    var _this = this;

    this._state.matchWith({
      Pending: function Pending(_) {
        return _this._listeners.push(pattern);
      },
      Cancelled: function Cancelled(_) {
        return pattern.onCancelled();
      },
      Resolved: function Resolved(_ref3) {
        var value = _ref3.value;
        return pattern.onResolved(value);
      },
      Rejected: function Rejected(_ref4) {
        var reason = _ref4.reason;
        return pattern.onRejected(reason);
      }
    });
    return this;
  },


  // ---[ Working with deferred values ]-------------------------------
  /*~
   * type: |
   *   (Deferred 'f 's).() => Promise 'f 's
   */
  promise: function promise() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.listen({
        onCancelled: function onCancelled(_) {
          return reject(Cancelled());
        },
        onResolved: resolve,
        onRejected: reject
      });
    });
  },


  /*~
   * type: |
   *   (Deferred 'f 's).() => Future 'f 's
   */
  future: function future() {
    var future = new (Future())(); // eslint-disable-line prefer-const
    this.listen({
      onCancelled: function onCancelled(_) {
        return moveToState(future, Cancelled());
      },
      onRejected: function onRejected(reason) {
        return moveToState(future, Rejected(reason));
      },
      onResolved: function onResolved(value) {
        return moveToState(future, Resolved(value));
      }
    });

    return future;
  },


  // ---[ Debugging ]--------------------------------------------------
  /*~
   * type: |
   *   (Deferred 'f 's).() => String
   */
  toString: function toString() {
    var listeners = this._listeners.length;
    var state = this._state;

    return 'folktale:Deferred(' + state + ', ' + listeners + ' listeners)';
  },


  /*~
   * type: |
   *   (Deferred 'f 's).() => String
   */
  inspect: function inspect() {
    return this.toString();
  }
}, Symbol.toStringTag, 'folktale:Deferred');

// --[ Exports ]-------------------------------------------------------
module.exports = Deferred;