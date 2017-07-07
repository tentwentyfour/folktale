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

var provideAliases = require('../../helpers/provide-fantasy-land-aliases');
var defer = require('../../helpers/defer');
var Deferred = require('../future/_deferred');
var TaskExecution = require('./_task-execution');

var noop = function noop() {};

/*~ stability: experimental */

var Task = function () {
  /*~
   * stability: experimental
   * type: |
   *   forall value, reason:
   *     new (
   *       ({
   *          resolve: (value) => Void,
   *          reject: (reason) => Void,
   *          cancel: () => Void,
   *          cleanup: (() => Void) => Void,
   *          onCancelled: (() => Void) => Void,
   *          get isCancelled: Boolean
   *        }) => Void
   *     ) => Task value reason
   */
  function Task(computation) {
    _classCallCheck(this, Task);

    this._computation = computation;
  }

  /*~
   * stability: experimental
   * type: |
   *   forall e, v1, v2:
   *     (Task e v1).((v1) => Task e v2) => Task e v2
   */


  _createClass(Task, [{
    key: 'chain',
    value: function chain(transformation) {
      var _this = this;

      return new Task(function (resolver) {
        var execution = _this.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.reject,
          onResolved: function onResolved(value) {
            transformation(value).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e v1).((v1) => v2) => Task e v2
     */

  }, {
    key: 'map',
    value: function map(transformation) {
      var _this2 = this;

      return new Task(function (resolver) {
        var execution = _this2.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.reject,
          onResolved: function onResolved(value) {
            return resolver.resolve(transformation(value));
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v:
     *     (Task e1 v).((e1) => e2) => Task e2 v
     */

  }, {
    key: 'mapRejected',
    value: function mapRejected(transformation) {
      var _this3 = this;

      return new Task(function (resolver) {
        var execution = _this3.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: function onRejected(reason) {
            return resolver.reject(transformation(reason));
          },
          onResolved: resolver.resolve
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e ((v1) => v2)).(Task e v1) => Task e v2
     */

  }, {
    key: 'apply',
    value: function apply(task) {
      return this.chain(function (f) {
        return task.map(f);
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v1, v2:
     *     (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2
     */

  }, {
    key: 'bimap',
    value: function bimap(rejectionTransformation, successTransformation) {
      var _this4 = this;

      return new Task(function (resolver) {
        var execution = _this4.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: function onRejected(reason) {
            return resolver.reject(rejectionTransformation(reason));
          },
          onResolved: function onResolved(value) {
            return resolver.resolve(successTransformation(value));
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e1, e2, v1, v2:
     *     type Pattern = { row |
     *       Cancelled: ()  => Task e2 v2,
     *       Resolved:  (b) => Task e2 v2,
     *       Rejected:  (a) => Task e2 v2
     *     }
     *
     *     (Task e1 v1).(Pattern) => Task e2 v2
     */

  }, {
    key: 'willMatchWith',
    value: function willMatchWith(pattern) {
      var _this5 = this;

      return new Task(function (resolver) {
        var execution = _this5.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        var resolve = function resolve(handler) {
          return function (value) {
            return handler(value).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          };
        };
        execution.listen({
          onCancelled: resolve(function (_) {
            return pattern.Cancelled();
          }),
          onRejected: resolve(pattern.Rejected),
          onResolved: resolve(pattern.Resolved)
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v: (Task e v).() => Task v e
     */

  }, {
    key: 'swap',
    value: function swap() {
      var _this6 = this;

      return new Task(function (resolver) {
        var execution = _this6.run(); // eslint-disable-line prefer-const
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onRejected: resolver.resolve,
          onResolved: resolver.reject
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, e2, v:
     *     (Task e v).((e) => Task e2 v) => Task e2 v
     */

  }, {
    key: 'orElse',
    value: function orElse(handler) {
      var _this7 = this;

      return new Task(function (resolver) {
        var execution = _this7.run();
        resolver.onCancelled(function () {
          return execution.cancel();
        });

        execution.listen({
          onCancelled: resolver.cancel,
          onResolved: resolver.resolve,
          onRejected: function onRejected(reason) {
            handler(reason).run().listen({
              onCancelled: resolver.cancel,
              onRejected: resolver.reject,
              onResolved: resolver.resolve
            });
          }
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v:
     *     (Task e v).(Task e v) => Task e v
     */

  }, {
    key: 'or',
    value: function or(that) {
      var _this8 = this;

      return new Task(function (resolver) {
        var thisExecution = _this8.run(); // eslint-disable-line prefer-const
        var thatExecution = that.run(); // eslint-disable-line prefer-const
        var done = false;

        resolver.onCancelled(function () {
          thisExecution.cancel();
          thatExecution.cancel();
        });

        var guard = function guard(fn, execution) {
          return function (value) {
            if (!done) {
              done = true;
              execution.cancel();
              fn(value);
            }
          };
        };

        thisExecution.listen({
          onRejected: guard(resolver.reject, thatExecution),
          onCancelled: guard(resolver.cancel, thatExecution),
          onResolved: guard(resolver.resolve, thatExecution)
        });

        thatExecution.listen({
          onRejected: guard(resolver.reject, thisExecution),
          onCancelled: guard(resolver.cancel, thisExecution),
          onResolved: guard(resolver.resolve, thisExecution)
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v1, v2:
     *     (Task e v1).(Task e v2) => Task e (v1, v2)
     */

  }, {
    key: 'and',
    value: function and(that) {
      var _this9 = this;

      return new Task(function (resolver) {
        // eslint-disable-line max-statements
        var thisExecution = _this9.run(); // eslint-disable-line prefer-const
        var thatExecution = that.run(); // eslint-disable-line prefer-const
        var valueLeft = null;
        var valueRight = null;
        var doneLeft = false;
        var doneRight = false;
        var cancelled = false;

        resolver.onCancelled(function () {
          thisExecution.cancel();
          thatExecution.cancel();
        });

        var guardResolve = function guardResolve(setter) {
          return function (value) {
            if (cancelled) return;

            setter(value);
            if (doneLeft && doneRight) {
              resolver.resolve([valueLeft, valueRight]);
            }
          };
        };

        var guardRejection = function guardRejection(fn, execution) {
          return function (value) {
            if (cancelled) return;

            cancelled = true;
            execution.cancel();
            fn(value);
          };
        };

        thisExecution.listen({
          onRejected: guardRejection(resolver.reject, thatExecution),
          onCancelled: guardRejection(resolver.cancel, thatExecution),
          onResolved: guardResolve(function (x) {
            valueLeft = x;
            doneLeft = true;
          })
        });

        thatExecution.listen({
          onRejected: guardRejection(resolver.reject, thisExecution),
          onCancelled: guardRejection(resolver.cancel, thisExecution),
          onResolved: guardResolve(function (x) {
            valueRight = x;
            doneRight = true;
          })
        });
      });
    }

    /*~
     * stability: experimental
     * type: |
     *   forall e, v: (Task e v).() => TaskExecution e v
     */

  }, {
    key: 'run',
    value: function run() {
      var deferred = new Deferred(); // eslint-disable-line prefer-const
      var cleanups = [];
      var cancellations = [];
      var isCancelled = false;
      var done = false;

      deferred.listen({
        onCancelled: function onCancelled(_) {
          done = true;
          isCancelled = true;
          cancellations.forEach(function (f) {
            return f();
          });
          cleanups.forEach(function (f) {
            return f();
          });
          cancellations = [];
          cleanups = [];
        },

        onResolved: function onResolved(_value) {
          done = true;
          cleanups.forEach(function (f) {
            return f();
          });
          cleanups = [];
          cancellations = [];
        },

        onRejected: function onRejected(_reason) {
          done = true;
          cleanups.forEach(function (f) {
            return f();
          });
          cleanups = [];
          cancellations = [];
        }
      });

      var resources = this._computation({
        reject: function reject(error) {
          deferred.reject(error);
        },
        resolve: function resolve(value) {
          deferred.resolve(value);
        },
        cancel: function cancel(_) {
          deferred.maybeCancel();
        },

        get isCancelled() {
          return isCancelled;
        },
        cleanup: function cleanup(f) {
          if (done) {
            throw new Error('Can\'t attach a cleanup handler after the task is settled.');
          }
          cleanups.push(f);
        },
        onCancelled: function onCancelled(f) {
          if (done) {
            throw new Error('Can\'t attach a cancellation handler after the task is settled.');
          }
          cancellations.push(f);
        }
      });

      return new TaskExecution(this, deferred);
    }
  }]);

  return Task;
}();

Object.assign(Task, {
  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (v) => Task e v
   */
  of: function of(value) {
    return new Task(function (resolver) {
      return resolver.resolve(value);
    });
  },


  /*~
   * stability: experimental
   * type: |
   *   forall e, v: (e) => Task e v
   */
  rejected: function rejected(reason) {
    return new Task(function (resolver) {
      return resolver.reject(reason);
    });
  }
});

provideAliases(Task);
provideAliases(Task.prototype);

module.exports = Task;