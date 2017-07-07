'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var __metamagical_withMeta = function metamagical_withMeta(object, meta) {
  var parent = Object.getPrototypeOf(object);var oldMeta = object[Symbol.for('@@meta:magical')] || {};if (parent && parent[Symbol.for('@@meta:magical')] === oldMeta) {
    oldMeta = {};
  }Object.keys(meta).forEach(function (key) {
    if (/^~/.test(key)) {
      oldMeta[key.slice(1)] = meta[key];
    } else {
      oldMeta[key] = meta[key];
    }
  });object[Symbol.for('@@meta:magical')] = oldMeta;return object;
},
    _Object$assign;

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

var Task = __metamagical_withMeta(function () {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11;

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


  __metamagical_withMeta(Task, {
    'name': 'Task',
    'source': 'constructor(computation) {\n    this._computation = computation;\n  }',
    'signature': 'Task(computation)',
    'location': {
      'filename': 'source/concurrency/task/_task.js',
      'start': {
        'line': 36,
        'column': 2
      },
      'end': {
        'line': 38,
        'column': 3
      }
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall value, reason:\n  new (\n    ({\n       resolve: (value) => Void,\n       reject: (reason) => Void,\n       cancel: () => Void,\n       cleanup: (() => Void) => Void,\n       onCancelled: (() => Void) => Void,\n       get isCancelled: Boolean\n     }) => Void\n  ) => Task value reason\n \n'
  });

  _createClass(Task, [(_ref = {
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
  }, __metamagical_withMeta(_ref['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v1, v2:\n  (Task e v1).((v1) => Task e v2) => Task e v2\n \n'
  }), _ref), (_ref2 = {
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
  }, __metamagical_withMeta(_ref2['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v1, v2:\n  (Task e v1).((v1) => v2) => Task e v2\n \n'
  }), _ref2), (_ref3 = {
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
  }, __metamagical_withMeta(_ref3['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e1, e2, v:\n  (Task e1 v).((e1) => e2) => Task e2 v\n \n'
  }), _ref3), (_ref4 = {
    key: 'apply',
    value: function apply(task) {
      return this.chain(function (f) {
        return task.map(f);
      });
    }
  }, __metamagical_withMeta(_ref4['value'], {
    'name': 'value',
    'signature': 'value(task)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v1, v2:\n  (Task e ((v1) => v2)).(Task e v1) => Task e v2\n \n'
  }), _ref4), (_ref5 = {
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
  }, __metamagical_withMeta(_ref5['value'], {
    'name': 'value',
    'signature': 'value(rejectionTransformation, successTransformation)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e1, e2, v1, v2:\n  (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2\n \n'
  }), _ref5), (_ref6 = {
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
  }, __metamagical_withMeta(_ref6['value'], {
    'name': 'value',
    'signature': 'value(pattern)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e1, e2, v1, v2:\n  type Pattern = { row |\n    Cancelled: ()  => Task e2 v2,\n    Resolved:  (b) => Task e2 v2,\n    Rejected:  (a) => Task e2 v2\n  }\n\n  (Task e1 v1).(Pattern) => Task e2 v2\n \n'
  }), _ref6), (_ref7 = {
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
  }, __metamagical_withMeta(_ref7['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v: (Task e v).() => Task v e\n \n'
  }), _ref7), (_ref8 = {
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
  }, __metamagical_withMeta(_ref8['value'], {
    'name': 'value',
    'signature': 'value(handler)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, e2, v:\n  (Task e v).((e) => Task e2 v) => Task e2 v\n \n'
  }), _ref8), (_ref9 = {
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
  }, __metamagical_withMeta(_ref9['value'], {
    'name': 'value',
    'signature': 'value(that)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v:\n  (Task e v).(Task e v) => Task e v\n \n'
  }), _ref9), (_ref10 = {
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
  }, __metamagical_withMeta(_ref10['value'], {
    'name': 'value',
    'signature': 'value(that)',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v1, v2:\n  (Task e v1).(Task e v2) => Task e (v1, v2)\n \n'
  }), _ref10), (_ref11 = {
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
  }, __metamagical_withMeta(_ref11['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/task/_task.js'
    },
    'module': 'folktale/concurrency/task/_task',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v: (Task e v).() => TaskExecution e v\n \n'
  }), _ref11)]);

  return Task;
}(), {
  'name': 'Task',
  'source': 'class Task {\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall value, reason:\n   *     new (\n   *       ({\n   *          resolve: (value) => Void,\n   *          reject: (reason) => Void,\n   *          cancel: () => Void,\n   *          cleanup: (() => Void) => Void,\n   *          onCancelled: (() => Void) => Void,\n   *          get isCancelled: Boolean\n   *        }) => Void\n   *     ) => Task value reason\n   */\n  constructor(computation) {\n    this._computation = computation;\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).((v1) => Task e v2) => Task e v2\n   */\n  chain(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => {\n          transformation(value).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).((v1) => v2) => Task e v2\n   */\n  map(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => resolver.resolve(transformation(value))\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v:\n   *     (Task e1 v).((e1) => e2) => Task e2 v\n   */\n  mapRejected(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(transformation(reason)),\n        onResolved:  resolver.resolve\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e ((v1) => v2)).(Task e v1) => Task e v2\n   */\n  apply(task) {\n    return this.chain(f => task.map(f));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v1, v2:\n   *     (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2\n   */\n  bimap(rejectionTransformation, successTransformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(rejectionTransformation(reason)),\n        onResolved:  value => resolver.resolve(successTransformation(value))\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v1, v2:\n   *     type Pattern = { row |\n   *       Cancelled: ()  => Task e2 v2,\n   *       Resolved:  (b) => Task e2 v2,\n   *       Rejected:  (a) => Task e2 v2\n   *     }\n   *\n   *     (Task e1 v1).(Pattern) => Task e2 v2\n   */\n  willMatchWith(pattern) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n      \n      const resolve = (handler) => (value) => handler(value).run().listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  resolver.resolve\n      });\n      execution.listen({\n        onCancelled: resolve(_ => pattern.Cancelled()),\n        onRejected:  resolve(pattern.Rejected),\n        onResolved:  resolve(pattern.Resolved)\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v: (Task e v).() => Task v e\n   */\n  swap() {\n    return new Task(resolver => {\n      let execution = this.run();   // eslint-disable-line prefer-const\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.resolve,\n        onResolved:  resolver.reject\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, e2, v:\n   *     (Task e v).((e) => Task e2 v) => Task e2 v\n   */\n  orElse(handler) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onResolved:  resolver.resolve,\n        onRejected:  reason => {\n          handler(reason).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v:\n   *     (Task e v).(Task e v) => Task e v\n   */\n  or(that) {\n    return new Task(resolver => {\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let done = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guard = (fn, execution) => (value) => {\n        if (!done) {\n          done = true;\n          execution.cancel();\n          fn(value);\n        }\n      };\n\n      thisExecution.listen({\n        onRejected:  guard(resolver.reject, thatExecution),\n        onCancelled: guard(resolver.cancel, thatExecution),\n        onResolved:  guard(resolver.resolve, thatExecution)\n      });\n\n      thatExecution.listen({\n        onRejected:  guard(resolver.reject, thisExecution),\n        onCancelled: guard(resolver.cancel, thisExecution),\n        onResolved:  guard(resolver.resolve, thisExecution)\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).(Task e v2) => Task e (v1, v2)\n   */\n  and(that) {\n    return new Task(resolver => {   // eslint-disable-line max-statements\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let valueLeft = null;\n      let valueRight = null;\n      let doneLeft = false;\n      let doneRight = false;\n      let cancelled = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guardResolve = (setter) => (value) => {\n        if (cancelled)  return;\n\n        setter(value);\n        if (doneLeft && doneRight) {\n          resolver.resolve([valueLeft, valueRight]);\n        }\n      };\n\n      const guardRejection = (fn, execution) => (value) => {\n        if (cancelled)  return;\n\n        cancelled = true;\n        execution.cancel();\n        fn(value);\n      };\n\n      thisExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thatExecution),\n        onCancelled: guardRejection(resolver.cancel, thatExecution),\n        onResolved:  guardResolve(x => {\n          valueLeft = x;\n          doneLeft = true;\n        })\n      });\n\n      thatExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thisExecution),\n        onCancelled: guardRejection(resolver.cancel, thisExecution),\n        onResolved:  guardResolve(x => {\n          valueRight = x;\n          doneRight = true;\n        })\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v: (Task e v).() => TaskExecution e v\n   */\n  run() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    let cleanups      = [];\n    let cancellations = [];\n    let isCancelled   = false;\n    let done          = false;\n\n    deferred.listen({\n      onCancelled: _ => {\n        done = true;\n        isCancelled = true;\n        cancellations.forEach(f => f());\n        cleanups.forEach(f => f());\n        cancellations = [];\n        cleanups = [];\n      },\n\n      onResolved: _value => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      },\n\n      onRejected: _reason => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      }\n    });\n\n    const resources = this._computation({\n      reject:  error => { deferred.reject(error) },\n      resolve: value => { deferred.resolve(value) },\n      cancel:  _     => { deferred.maybeCancel() },\n\n      get isCancelled() { return isCancelled },\n      cleanup(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cleanup handler after the task is settled.\');\n        }\n        cleanups.push(f);\n      },\n      onCancelled(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cancellation handler after the task is settled.\');\n        }\n        cancellations.push(f);\n      }\n    });\n\n    return new TaskExecution(this, deferred);\n  }\n}',
  'location': {
    'filename': 'source/concurrency/task/_task.js'
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

__metamagical_withMeta(Task.prototype['run'], {
  'name': 'run',
  'source': 'run() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    let cleanups      = [];\n    let cancellations = [];\n    let isCancelled   = false;\n    let done          = false;\n\n    deferred.listen({\n      onCancelled: _ => {\n        done = true;\n        isCancelled = true;\n        cancellations.forEach(f => f());\n        cleanups.forEach(f => f());\n        cancellations = [];\n        cleanups = [];\n      },\n\n      onResolved: _value => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      },\n\n      onRejected: _reason => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      }\n    });\n\n    const resources = this._computation({\n      reject:  error => { deferred.reject(error) },\n      resolve: value => { deferred.resolve(value) },\n      cancel:  _     => { deferred.maybeCancel() },\n\n      get isCancelled() { return isCancelled },\n      cleanup(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cleanup handler after the task is settled.\');\n        }\n        cleanups.push(f);\n      },\n      onCancelled(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cancellation handler after the task is settled.\');\n        }\n        cancellations.push(f);\n      }\n    });\n\n    return new TaskExecution(this, deferred);\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v: (Task e v).() => TaskExecution e v\n \n'
});

__metamagical_withMeta(Task.prototype['and'], {
  'name': 'and',
  'source': 'and(that) {\n    return new Task(resolver => {   // eslint-disable-line max-statements\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let valueLeft = null;\n      let valueRight = null;\n      let doneLeft = false;\n      let doneRight = false;\n      let cancelled = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guardResolve = (setter) => (value) => {\n        if (cancelled)  return;\n\n        setter(value);\n        if (doneLeft && doneRight) {\n          resolver.resolve([valueLeft, valueRight]);\n        }\n      };\n\n      const guardRejection = (fn, execution) => (value) => {\n        if (cancelled)  return;\n\n        cancelled = true;\n        execution.cancel();\n        fn(value);\n      };\n\n      thisExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thatExecution),\n        onCancelled: guardRejection(resolver.cancel, thatExecution),\n        onResolved:  guardResolve(x => {\n          valueLeft = x;\n          doneLeft = true;\n        })\n      });\n\n      thatExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thisExecution),\n        onCancelled: guardRejection(resolver.cancel, thisExecution),\n        onResolved:  guardResolve(x => {\n          valueRight = x;\n          doneRight = true;\n        })\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v1, v2:\n  (Task e v1).(Task e v2) => Task e (v1, v2)\n \n'
});

__metamagical_withMeta(Task.prototype['or'], {
  'name': 'or',
  'source': 'or(that) {\n    return new Task(resolver => {\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let done = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guard = (fn, execution) => (value) => {\n        if (!done) {\n          done = true;\n          execution.cancel();\n          fn(value);\n        }\n      };\n\n      thisExecution.listen({\n        onRejected:  guard(resolver.reject, thatExecution),\n        onCancelled: guard(resolver.cancel, thatExecution),\n        onResolved:  guard(resolver.resolve, thatExecution)\n      });\n\n      thatExecution.listen({\n        onRejected:  guard(resolver.reject, thisExecution),\n        onCancelled: guard(resolver.cancel, thisExecution),\n        onResolved:  guard(resolver.resolve, thisExecution)\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v:\n  (Task e v).(Task e v) => Task e v\n \n'
});

__metamagical_withMeta(Task.prototype['orElse'], {
  'name': 'orElse',
  'source': 'orElse(handler) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onResolved:  resolver.resolve,\n        onRejected:  reason => {\n          handler(reason).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, e2, v:\n  (Task e v).((e) => Task e2 v) => Task e2 v\n \n'
});

__metamagical_withMeta(Task.prototype['swap'], {
  'name': 'swap',
  'source': 'swap() {\n    return new Task(resolver => {\n      let execution = this.run();   // eslint-disable-line prefer-const\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.resolve,\n        onResolved:  resolver.reject\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v: (Task e v).() => Task v e\n \n'
});

__metamagical_withMeta(Task.prototype['willMatchWith'], {
  'name': 'willMatchWith',
  'source': 'willMatchWith(pattern) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n      \n      const resolve = (handler) => (value) => handler(value).run().listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  resolver.resolve\n      });\n      execution.listen({\n        onCancelled: resolve(_ => pattern.Cancelled()),\n        onRejected:  resolve(pattern.Rejected),\n        onResolved:  resolve(pattern.Resolved)\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e1, e2, v1, v2:\n  type Pattern = { row |\n    Cancelled: ()  => Task e2 v2,\n    Resolved:  (b) => Task e2 v2,\n    Rejected:  (a) => Task e2 v2\n  }\n\n  (Task e1 v1).(Pattern) => Task e2 v2\n \n'
});

__metamagical_withMeta(Task.prototype['bimap'], {
  'name': 'bimap',
  'source': 'bimap(rejectionTransformation, successTransformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(rejectionTransformation(reason)),\n        onResolved:  value => resolver.resolve(successTransformation(value))\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e1, e2, v1, v2:\n  (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2\n \n'
});

__metamagical_withMeta(Task.prototype['apply'], {
  'name': 'apply',
  'source': 'apply(task) {\n    return this.chain(f => task.map(f));\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v1, v2:\n  (Task e ((v1) => v2)).(Task e v1) => Task e v2\n \n'
});

__metamagical_withMeta(Task.prototype['mapRejected'], {
  'name': 'mapRejected',
  'source': 'mapRejected(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(transformation(reason)),\n        onResolved:  resolver.resolve\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e1, e2, v:\n  (Task e1 v).((e1) => e2) => Task e2 v\n \n'
});

__metamagical_withMeta(Task.prototype['map'], {
  'name': 'map',
  'source': 'map(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => resolver.resolve(transformation(value))\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v1, v2:\n  (Task e v1).((v1) => v2) => Task e v2\n \n'
});

__metamagical_withMeta(Task.prototype['chain'], {
  'name': 'chain',
  'source': 'chain(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => {\n          transformation(value).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v1, v2:\n  (Task e v1).((v1) => Task e v2) => Task e v2\n \n'
});

__metamagical_withMeta(Task.prototype['constructor'], {
  'name': 'constructor',
  'source': 'constructor(computation) {\n    this._computation = computation;\n  }',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall value, reason:\n  new (\n    ({\n       resolve: (value) => Void,\n       reject: (reason) => Void,\n       cancel: () => Void,\n       cleanup: (() => Void) => Void,\n       onCancelled: (() => Void) => Void,\n       get isCancelled: Boolean\n     }) => Void\n  ) => Task value reason\n \n'
});

__metamagical_withMeta(Task, {
  'name': 'Task',
  'source': 'class Task {\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall value, reason:\n   *     new (\n   *       ({\n   *          resolve: (value) => Void,\n   *          reject: (reason) => Void,\n   *          cancel: () => Void,\n   *          cleanup: (() => Void) => Void,\n   *          onCancelled: (() => Void) => Void,\n   *          get isCancelled: Boolean\n   *        }) => Void\n   *     ) => Task value reason\n   */\n  constructor(computation) {\n    this._computation = computation;\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).((v1) => Task e v2) => Task e v2\n   */\n  chain(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => {\n          transformation(value).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).((v1) => v2) => Task e v2\n   */\n  map(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  value => resolver.resolve(transformation(value))\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v:\n   *     (Task e1 v).((e1) => e2) => Task e2 v\n   */\n  mapRejected(transformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(transformation(reason)),\n        onResolved:  resolver.resolve\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e ((v1) => v2)).(Task e v1) => Task e v2\n   */\n  apply(task) {\n    return this.chain(f => task.map(f));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v1, v2:\n   *     (Task e1 v1).((e1) => e2, (v1) => v2) => Task e2 v2\n   */\n  bimap(rejectionTransformation, successTransformation) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  reason => resolver.reject(rejectionTransformation(reason)),\n        onResolved:  value => resolver.resolve(successTransformation(value))\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e1, e2, v1, v2:\n   *     type Pattern = { row |\n   *       Cancelled: ()  => Task e2 v2,\n   *       Resolved:  (b) => Task e2 v2,\n   *       Rejected:  (a) => Task e2 v2\n   *     }\n   *\n   *     (Task e1 v1).(Pattern) => Task e2 v2\n   */\n  willMatchWith(pattern) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n      \n      const resolve = (handler) => (value) => handler(value).run().listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.reject,\n        onResolved:  resolver.resolve\n      });\n      execution.listen({\n        onCancelled: resolve(_ => pattern.Cancelled()),\n        onRejected:  resolve(pattern.Rejected),\n        onResolved:  resolve(pattern.Resolved)\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v: (Task e v).() => Task v e\n   */\n  swap() {\n    return new Task(resolver => {\n      let execution = this.run();   // eslint-disable-line prefer-const\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onRejected:  resolver.resolve,\n        onResolved:  resolver.reject\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, e2, v:\n   *     (Task e v).((e) => Task e2 v) => Task e2 v\n   */\n  orElse(handler) {\n    return new Task(resolver => {\n      const execution = this.run();\n      resolver.onCancelled(() => execution.cancel());\n\n      execution.listen({\n        onCancelled: resolver.cancel,\n        onResolved:  resolver.resolve,\n        onRejected:  reason => {\n          handler(reason).run().listen({\n            onCancelled: resolver.cancel,\n            onRejected:  resolver.reject,\n            onResolved:  resolver.resolve\n          });\n        }\n      });\n    });\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v:\n   *     (Task e v).(Task e v) => Task e v\n   */\n  or(that) {\n    return new Task(resolver => {\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let done = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guard = (fn, execution) => (value) => {\n        if (!done) {\n          done = true;\n          execution.cancel();\n          fn(value);\n        }\n      };\n\n      thisExecution.listen({\n        onRejected:  guard(resolver.reject, thatExecution),\n        onCancelled: guard(resolver.cancel, thatExecution),\n        onResolved:  guard(resolver.resolve, thatExecution)\n      });\n\n      thatExecution.listen({\n        onRejected:  guard(resolver.reject, thisExecution),\n        onCancelled: guard(resolver.cancel, thisExecution),\n        onResolved:  guard(resolver.resolve, thisExecution)\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v1, v2:\n   *     (Task e v1).(Task e v2) => Task e (v1, v2)\n   */\n  and(that) {\n    return new Task(resolver => {   // eslint-disable-line max-statements\n      let thisExecution = this.run();   // eslint-disable-line prefer-const\n      let thatExecution = that.run();   // eslint-disable-line prefer-const\n      let valueLeft = null;\n      let valueRight = null;\n      let doneLeft = false;\n      let doneRight = false;\n      let cancelled = false;\n\n      resolver.onCancelled(() => {\n        thisExecution.cancel();\n        thatExecution.cancel();\n      });\n\n      const guardResolve = (setter) => (value) => {\n        if (cancelled)  return;\n\n        setter(value);\n        if (doneLeft && doneRight) {\n          resolver.resolve([valueLeft, valueRight]);\n        }\n      };\n\n      const guardRejection = (fn, execution) => (value) => {\n        if (cancelled)  return;\n\n        cancelled = true;\n        execution.cancel();\n        fn(value);\n      };\n\n      thisExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thatExecution),\n        onCancelled: guardRejection(resolver.cancel, thatExecution),\n        onResolved:  guardResolve(x => {\n          valueLeft = x;\n          doneLeft = true;\n        })\n      });\n\n      thatExecution.listen({\n        onRejected:  guardRejection(resolver.reject, thisExecution),\n        onCancelled: guardRejection(resolver.cancel, thisExecution),\n        onResolved:  guardResolve(x => {\n          valueRight = x;\n          doneRight = true;\n        })\n      });\n    });\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v: (Task e v).() => TaskExecution e v\n   */\n  run() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    let cleanups      = [];\n    let cancellations = [];\n    let isCancelled   = false;\n    let done          = false;\n\n    deferred.listen({\n      onCancelled: _ => {\n        done = true;\n        isCancelled = true;\n        cancellations.forEach(f => f());\n        cleanups.forEach(f => f());\n        cancellations = [];\n        cleanups = [];\n      },\n\n      onResolved: _value => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      },\n\n      onRejected: _reason => {\n        done = true;\n        cleanups.forEach(f => f());\n        cleanups = [];\n        cancellations = [];\n      }\n    });\n\n    const resources = this._computation({\n      reject:  error => { deferred.reject(error) },\n      resolve: value => { deferred.resolve(value) },\n      cancel:  _     => { deferred.maybeCancel() },\n\n      get isCancelled() { return isCancelled },\n      cleanup(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cleanup handler after the task is settled.\');\n        }\n        cleanups.push(f);\n      },\n      onCancelled(f) {\n        if (done) {\n          throw new Error(\'Can\\\'t attach a cancellation handler after the task is settled.\');\n        }\n        cancellations.push(f);\n      }\n    });\n\n    return new TaskExecution(this, deferred);\n  }\n}',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 362,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

Object.assign(Task, (_Object$assign = {
  of: function of(value) {
    return new Task(function (resolver) {
      return resolver.resolve(value);
    });
  },
  rejected: function rejected(reason) {
    return new Task(function (resolver) {
      return resolver.reject(reason);
    });
  }
}, __metamagical_withMeta(_Object$assign['of'], {
  'name': 'of',
  'source': 'of(value) {\n    return new Task(resolver => resolver.resolve(value));\n  }',
  'signature': 'of(value)',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 365,
      'column': 20
    },
    'end': {
      'line': 383,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v: (v) => Task e v\n \n'
}), __metamagical_withMeta(_Object$assign['rejected'], {
  'name': 'rejected',
  'source': 'rejected(reason) {\n    return new Task(resolver => resolver.reject(reason));\n  }',
  'signature': 'rejected(reason)',
  'location': {
    'filename': 'source/concurrency/task/_task.js',
    'start': {
      'line': 365,
      'column': 20
    },
    'end': {
      'line': 383,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task/_task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v: (e) => Task e v\n \n'
}), _Object$assign));

provideAliases(Task);
provideAliases(Task.prototype);

module.exports = Task;