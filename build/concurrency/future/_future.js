'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var provideAliases = require('../../helpers/provide-fantasy-land-aliases');
var Deferred = require('./_deferred');

var _require = require('./_execution-state'),
    Pending = _require.Pending,
    Resolved = _require.Resolved,
    Rejected = _require.Rejected;

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 */


var Future = function () {
  function Future() {
    _classCallCheck(this, Future);

    define(this, '_state', Pending());
    define(this, '_listeners', []);
  }

  // ---[ State and configuration ]------------------------------------
  /*~
   * isRequired: true
   * type: |
   *   get (Future 'f 's) => ExecutionState 'f 's
   */


  _createClass(Future, [{
    key: 'listen',


    // ---[ Reacting to Future events ]----------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(DeferredListener 'f 's) => Future 'f 's
     */
    value: function listen(pattern) {
      var _this = this;

      this._state.matchWith({
        Pending: function Pending() {
          return _this._listeners.push(pattern);
        },
        Cancelled: function Cancelled() {
          return pattern.onCancelled();
        },
        Resolved: function Resolved(_ref) {
          var value = _ref.value;
          return pattern.onResolved(value);
        },
        Rejected: function Rejected(_ref2) {
          var reason = _ref2.reason;
          return pattern.onRejected(reason);
        }
      });
      return this;
    }

    // --[ Transforming Futures ]----------------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('s) => Future 's2) => Future 'f 's2
     */

  }, {
    key: 'chain',
    value: function chain(transformation) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.reject(reason);
        },
        onResolved: function onResolved(value) {
          transformation(value).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onRejected: function onRejected(reason) {
              return deferred.reject(reason);
            },
            onResolved: function onResolved(value2) {
              return deferred.resolve(value2);
            }
          });
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('s) => 's2) => Future 'f 's2
     */

  }, {
    key: 'map',
    value: function map(transformation) {
      return this.chain(function (value) {
        return Future.of(transformation(value));
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(Future 'f (('s) => 's2)) => Future 'f 's2
     */

  }, {
    key: 'apply',
    value: function apply(future) {
      return this.chain(function (fn) {
        return future.map(fn);
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => 'f2, ('s) => 's2) => Future 'f2 's2
     */

  }, {
    key: 'bimap',
    value: function bimap(rejectionTransformation, successTransformation) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.reject(rejectionTransformation(reason));
        },
        onResolved: function onResolved(value) {
          return deferred.resolve(successTransformation(value));
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => 'f2) => Future 'f2 's
     */

  }, {
    key: 'mapRejected',
    value: function mapRejected(transformation) {
      return this.bimap(transformation, function (x) {
        return x;
      });
    }

    // ---[ Recovering from errors ]-------------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).(('f) => Future 'f2 's2) => Future 'f2 's
     */

  }, {
    key: 'recover',
    value: function recover(handler) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onResolved: function onResolved(value) {
          return deferred.resolve(value);
        },
        onRejected: function onRejected(reason) {
          handler(reason).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onResolved: function onResolved(value) {
              return deferred.resolve(value);
            },
            onRejected: function onRejected(newReason) {
              return deferred.reject(newReason);
            }
          });
        }
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   forall a, b, c, d:
     *     type Pattern = { r |
     *       Cancelled: ()  => Future c d,
     *       Resolved:  (b) => Future c d,
     *       Rejected:  (a) => Future c d
     *     }
     *     
     *     (Future a b).(Pattern) => Future c d 
     */

  }, {
    key: 'willMatchWith',
    value: function willMatchWith(pattern) {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      var resolve = function resolve(handler) {
        return function (value) {
          return handler(value).listen({
            onCancelled: function onCancelled() {
              return deferred.cancel();
            },
            onResolved: function onResolved(newValue) {
              return deferred.resolve(newValue);
            },
            onRejected: function onRejected(reason) {
              return deferred.reject(reason);
            }
          });
        };
      };
      this.listen({
        onCancelled: resolve(pattern.Cancelled),
        onResolved: resolve(pattern.Resolved),
        onRejected: resolve(pattern.Rejected)
      });

      return deferred.future();
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => Future 's 'f
     */

  }, {
    key: 'swap',
    value: function swap() {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      this.listen({
        onCancelled: function onCancelled() {
          return deferred.cancel();
        },
        onRejected: function onRejected(reason) {
          return deferred.resolve(reason);
        },
        onResolved: function onResolved(value) {
          return deferred.reject(value);
        }
      });

      return deferred.future();
    }

    // ---[ Debugging ]--------------------------------------------------
    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => String
     */

  }, {
    key: 'toString',
    value: function toString() {
      var listeners = this._listeners.length;
      var state = this._state;

      return 'folktale:Future(' + state + ', ' + listeners + ' listeners)';
    }

    /*~
     * stability: experimental
     * type: |
     *   (Future 'f 's).() => String
     */

  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v:
     *     (Future e v).() => Promise v e
     */

  }, {
    key: 'toPromise',
    value: function toPromise() {
      return require('../../conversions/future-to-promise')(this);
    }
  }, {
    key: '_state',
    get: function get() {
      throw new TypeError('Future.prototype._state should be implemented in an inherited object.');
    }

    /*~
     * isRequired: true
     * type: |
     *   get (Future 'f 's) => Array (DeferredListener 'f 's)
     */

  }, {
    key: '_listeners',
    get: function get() {
      throw new TypeError('Future.prototype._listeners should be implemented in an inherited object.');
    }
  }]);

  return Future;
}();

// ---[ Constructing futures ]-----------------------------------------


Object.assign(Future, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b:
   *     (Future).(b) => Future a b
   */
  of: function of(value) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Resolved(value);
    return result;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Future).(a) => Future a b
   */
  rejected: function rejected(reason) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Rejected(reason);
    return result;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (Promise v e) => Future e v
   */
  fromPromise: function fromPromise(aPromise) {
    return require('../../conversions/promise-to-future')(aPromise);
  }
});

provideAliases(Future);
provideAliases(Future.prototype);

// --[ Exports ]-------------------------------------------------------
module.exports = Future;