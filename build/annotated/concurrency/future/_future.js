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
  });object[Symbol.for('@@meta:magical')] = oldMeta;
  return object;
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

// --[ Dependencies ]--------------------------------------------------
var define = require('../../helpers/define');var provideAliases = require('../../helpers/provide-fantasy-land-aliases');
var Deferred = require('./_deferred');

var _require = require('./_execution-state'),
    Pending = _require.Pending,
    Resolved = _require.Resolved,
    Rejected = _require.Rejected;

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 */


var Future = __metamagical_withMeta(function () {
  var _ref, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16;

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


  _createClass(Future, [(_ref = {
    key: 'listen',
    value: function listen(pattern) {
      var _this = this;

      this._state.matchWith({
        Pending: function Pending() {
          return _this._listeners.push(pattern);
        },
        Cancelled: function Cancelled() {
          return pattern.onCancelled();
        },
        Resolved: function Resolved(_ref2) {
          var value = _ref2.value;
          return pattern.onResolved(value);
        },
        Rejected: function Rejected(_ref3) {
          var reason = _ref3.reason;
          return pattern.onRejected(reason);
        }
      });
      return this;
    }
  }, __metamagical_withMeta(_ref['value'], {
    'name': 'value',
    'signature': 'value(pattern)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).(DeferredListener \'f \'s) => Future \'f \'s\n \n'
  }), _ref), (_ref4 = {
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
  }, __metamagical_withMeta(_ref4['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).((\'s) => Future \'s2) => Future \'f \'s2\n \n'
  }), _ref4), (_ref5 = {
    key: 'map',
    value: function map(transformation) {
      return this.chain(function (value) {
        return Future.of(transformation(value));
      });
    }
  }, __metamagical_withMeta(_ref5['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).((\'s) => \'s2) => Future \'f \'s2\n \n'
  }), _ref5), (_ref6 = {
    key: 'apply',
    value: function apply(future) {
      return this.chain(function (fn) {
        return future.map(fn);
      });
    }
  }, __metamagical_withMeta(_ref6['value'], {
    'name': 'value',
    'signature': 'value(future)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).(Future \'f ((\'s) => \'s2)) => Future \'f \'s2\n \n'
  }), _ref6), (_ref7 = {
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
  }, __metamagical_withMeta(_ref7['value'], {
    'name': 'value',
    'signature': 'value(rejectionTransformation, successTransformation)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).((\'f) => \'f2, (\'s) => \'s2) => Future \'f2 \'s2\n \n'
  }), _ref7), (_ref8 = {
    key: 'mapRejected',
    value: function mapRejected(transformation) {
      return this.bimap(transformation, function (x) {
        return x;
      });
    }
  }, __metamagical_withMeta(_ref8['value'], {
    'name': 'value',
    'signature': 'value(transformation)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).((\'f) => \'f2) => Future \'f2 \'s\n \n'
  }), _ref8), (_ref9 = {
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
  }, __metamagical_withMeta(_ref9['value'], {
    'name': 'value',
    'signature': 'value(handler)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).((\'f) => Future \'f2 \'s2) => Future \'f2 \'s\n \n'
  }), _ref9), (_ref10 = {
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
  }, __metamagical_withMeta(_ref10['value'], {
    'name': 'value',
    'signature': 'value(pattern)',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall a, b, c, d:\n  type Pattern = { r |\n    Cancelled: ()  => Future c d,\n    Resolved:  (b) => Future c d,\n    Rejected:  (a) => Future c d\n  }\n  \n  (Future a b).(Pattern) => Future c d \n \n'
  }), _ref10), (_ref11 = {
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
  }, __metamagical_withMeta(_ref11['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).() => Future \'s \'f\n \n'
  }), _ref11), (_ref12 = {
    key: 'toString',
    value: function toString() {
      var listeners = this._listeners.length;
      var state = this._state;

      return 'folktale:Future(' + state + ', ' + listeners + ' listeners)';
    }
  }, __metamagical_withMeta(_ref12['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).() => String\n \n'
  }), _ref12), (_ref13 = {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, __metamagical_withMeta(_ref13['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': '(Future \'f \'s).() => String\n \n'
  }), _ref13), (_ref14 = {
    key: 'toPromise',
    value: function toPromise() {
      return require('../../conversions/future-to-promise')(this);
    }
  }, __metamagical_withMeta(_ref14['value'], {
    'name': 'value',
    'signature': 'value()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'stability': 'experimental',
    'type': 'forall e, v:\n  (Future e v).() => Promise v e\n \n'
  }), _ref14), (_ref15 = {
    key: '_state',
    get: function get() {
      throw new TypeError('Future.prototype._state should be implemented in an inherited object.');
    }
  }, __metamagical_withMeta(_ref15['get'], {
    'name': 'get',
    'signature': 'get()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'isRequired': true,
    'type': 'get (Future \'f \'s) => ExecutionState \'f \'s\n \n'
  }), _ref15), (_ref16 = {
    key: '_listeners',
    get: function get() {
      throw new TypeError('Future.prototype._listeners should be implemented in an inherited object.');
    }
  }, __metamagical_withMeta(_ref16['get'], {
    'name': 'get',
    'signature': 'get()',
    'location': {
      'filename': 'source/concurrency/future/_future.js'
    },
    'module': 'folktale/concurrency/future/_future',
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'isRequired': true,
    'type': 'get (Future \'f \'s) => Array (DeferredListener \'f \'s)\n \n'
  }), _ref16)]);

  return Future;
}(), {
  'name': 'Future',
  'source': 'class Future {\n  constructor() {\n    define(this, \'_state\', Pending());\n    define(this, \'_listeners\', []);\n  }\n\n\n  // ---[ State and configuration ]------------------------------------\n  /*~\n   * isRequired: true\n   * type: |\n   *   get (Future \'f \'s) => ExecutionState \'f \'s\n   */\n  get _state() {\n    throw new TypeError(\'Future.prototype._state should be implemented in an inherited object.\');\n  }\n\n  /*~\n   * isRequired: true\n   * type: |\n   *   get (Future \'f \'s) => Array (DeferredListener \'f \'s)\n   */\n  get _listeners() {\n    throw new TypeError(\'Future.prototype._listeners should be implemented in an inherited object.\');\n  }\n\n\n  // ---[ Reacting to Future events ]----------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).(DeferredListener \'f \'s) => Future \'f \'s\n   */\n  listen(pattern) {\n    this._state.matchWith({\n      Pending:   ()           => this._listeners.push(pattern),\n      Cancelled: ()           => pattern.onCancelled(), \n      Resolved:  ({ value })  => pattern.onResolved(value),\n      Rejected:  ({ reason }) => pattern.onRejected(reason)\n    });\n    return this;\n  }\n\n\n  // --[ Transforming Futures ]----------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'s) => Future \'s2) => Future \'f \'s2\n   */\n  chain(transformation) {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(reason),\n      onResolved:  value  => {\n        transformation(value).listen({\n          onCancelled: ()     => deferred.cancel(),\n          onRejected:  reason => deferred.reject(reason),\n          onResolved:  value2 => deferred.resolve(value2)\n        });\n      }\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'s) => \'s2) => Future \'f \'s2\n   */\n  map(transformation) {\n    return this.chain(value => Future.of(transformation(value)));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).(Future \'f ((\'s) => \'s2)) => Future \'f \'s2\n   */\n  apply(future) {\n    return this.chain(fn => future.map(fn));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => \'f2, (\'s) => \'s2) => Future \'f2 \'s2\n   */\n  bimap(rejectionTransformation, successTransformation) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(rejectionTransformation(reason)),\n      onResolved:  value  => deferred.resolve(successTransformation(value))\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => \'f2) => Future \'f2 \'s\n   */\n  mapRejected(transformation) {\n    return this.bimap(transformation, x => x);\n  }\n\n\n  // ---[ Recovering from errors ]-------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => Future \'f2 \'s2) => Future \'f2 \'s\n   */\n  recover(handler) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onResolved:  value  => deferred.resolve(value),\n      onRejected:  reason => {\n        handler(reason).listen({\n          onCancelled: ()        => deferred.cancel(),\n          onResolved:  value     => deferred.resolve(value),\n          onRejected:  newReason => deferred.reject(newReason)\n        });\n      }\n    });\n\n    return deferred.future();\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall a, b, c, d:\n   *     type Pattern = { r |\n   *       Cancelled: ()  => Future c d,\n   *       Resolved:  (b) => Future c d,\n   *       Rejected:  (a) => Future c d\n   *     }\n   *     \n   *     (Future a b).(Pattern) => Future c d \n   */\n  willMatchWith(pattern) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    const resolve = (handler) => (value) => handler(value).listen({\n      onCancelled: ()         => deferred.cancel(),\n      onResolved:  (newValue) => deferred.resolve(newValue),\n      onRejected:  (reason)   => deferred.reject(reason) \n    });\n    this.listen({\n      onCancelled: resolve(pattern.Cancelled),\n      onResolved:  resolve(pattern.Resolved),\n      onRejected:  resolve(pattern.Rejected)\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => Future \'s \'f\n   */\n  swap() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.resolve(reason),\n      onResolved:  value  => deferred.reject(value) \n    });\n\n    return deferred.future();\n  }\n\n\n  // ---[ Debugging ]--------------------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => String\n   */\n  toString() {\n    const listeners = this._listeners.length;\n    const state     = this._state;\n\n    return `folktale:Future(${state}, ${listeners} listeners)`;\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => String\n   */\n  inspect() {\n    return this.toString();\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v:\n   *     (Future e v).() => Promise v e\n   */\n  toPromise() {\n    return require(\'folktale/conversions/future-to-promise\')(this);\n  }\n}',
  'location': {
    'filename': 'source/concurrency/future/_future.js'
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

// ---[ Constructing futures ]-----------------------------------------


__metamagical_withMeta(Future.prototype['toPromise'], {
  'name': 'toPromise',
  'source': 'toPromise() {\n    return require(\'folktale/conversions/future-to-promise\')(this);\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v:\n  (Future e v).() => Promise v e\n \n'
});

__metamagical_withMeta(Future.prototype['inspect'], {
  'name': 'inspect',
  'source': 'inspect() {\n    return this.toString();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).() => String\n \n'
});

__metamagical_withMeta(Future.prototype['toString'], {
  'name': 'toString',
  'source': 'toString() {\n    const listeners = this._listeners.length;\n    const state     = this._state;\n\n    return `folktale:Future(${state}, ${listeners} listeners)`;\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).() => String\n \n'
});

__metamagical_withMeta(Future.prototype['swap'], {
  'name': 'swap',
  'source': 'swap() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.resolve(reason),\n      onResolved:  value  => deferred.reject(value) \n    });\n\n    return deferred.future();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).() => Future \'s \'f\n \n'
});

__metamagical_withMeta(Future.prototype['willMatchWith'], {
  'name': 'willMatchWith',
  'source': 'willMatchWith(pattern) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    const resolve = (handler) => (value) => handler(value).listen({\n      onCancelled: ()         => deferred.cancel(),\n      onResolved:  (newValue) => deferred.resolve(newValue),\n      onRejected:  (reason)   => deferred.reject(reason) \n    });\n    this.listen({\n      onCancelled: resolve(pattern.Cancelled),\n      onResolved:  resolve(pattern.Resolved),\n      onRejected:  resolve(pattern.Rejected)\n    });\n\n    return deferred.future();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c, d:\n  type Pattern = { r |\n    Cancelled: ()  => Future c d,\n    Resolved:  (b) => Future c d,\n    Rejected:  (a) => Future c d\n  }\n  \n  (Future a b).(Pattern) => Future c d \n \n'
});

__metamagical_withMeta(Future.prototype['recover'], {
  'name': 'recover',
  'source': 'recover(handler) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onResolved:  value  => deferred.resolve(value),\n      onRejected:  reason => {\n        handler(reason).listen({\n          onCancelled: ()        => deferred.cancel(),\n          onResolved:  value     => deferred.resolve(value),\n          onRejected:  newReason => deferred.reject(newReason)\n        });\n      }\n    });\n\n    return deferred.future();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).((\'f) => Future \'f2 \'s2) => Future \'f2 \'s\n \n'
});

__metamagical_withMeta(Future.prototype['mapRejected'], {
  'name': 'mapRejected',
  'source': 'mapRejected(transformation) {\n    return this.bimap(transformation, x => x);\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).((\'f) => \'f2) => Future \'f2 \'s\n \n'
});

__metamagical_withMeta(Future.prototype['bimap'], {
  'name': 'bimap',
  'source': 'bimap(rejectionTransformation, successTransformation) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(rejectionTransformation(reason)),\n      onResolved:  value  => deferred.resolve(successTransformation(value))\n    });\n\n    return deferred.future();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).((\'f) => \'f2, (\'s) => \'s2) => Future \'f2 \'s2\n \n'
});

__metamagical_withMeta(Future.prototype['apply'], {
  'name': 'apply',
  'source': 'apply(future) {\n    return this.chain(fn => future.map(fn));\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).(Future \'f ((\'s) => \'s2)) => Future \'f \'s2\n \n'
});

__metamagical_withMeta(Future.prototype['map'], {
  'name': 'map',
  'source': 'map(transformation) {\n    return this.chain(value => Future.of(transformation(value)));\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).((\'s) => \'s2) => Future \'f \'s2\n \n'
});

__metamagical_withMeta(Future.prototype['chain'], {
  'name': 'chain',
  'source': 'chain(transformation) {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(reason),\n      onResolved:  value  => {\n        transformation(value).listen({\n          onCancelled: ()     => deferred.cancel(),\n          onRejected:  reason => deferred.reject(reason),\n          onResolved:  value2 => deferred.resolve(value2)\n        });\n      }\n    });\n\n    return deferred.future();\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).((\'s) => Future \'s2) => Future \'f \'s2\n \n'
});

__metamagical_withMeta(Future.prototype['listen'], {
  'name': 'listen',
  'source': 'listen(pattern) {\n    this._state.matchWith({\n      Pending:   ()           => this._listeners.push(pattern),\n      Cancelled: ()           => pattern.onCancelled(), \n      Resolved:  ({ value })  => pattern.onResolved(value),\n      Rejected:  ({ reason }) => pattern.onRejected(reason)\n    });\n    return this;\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Future \'f \'s).(DeferredListener \'f \'s) => Future \'f \'s\n \n'
});

__metamagical_withMeta(Object.getOwnPropertyDescriptor(Future.prototype, '_listeners').get, {
  'name': '_listeners',
  'source': 'get _listeners() {\n    throw new TypeError(\'Future.prototype._listeners should be implemented in an inherited object.\');\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'get (Future \'f \'s) => Array (DeferredListener \'f \'s)\n \n'
});

__metamagical_withMeta(Object.getOwnPropertyDescriptor(Future.prototype, '_state').get, {
  'name': '_state',
  'source': 'get _state() {\n    throw new TypeError(\'Future.prototype._state should be implemented in an inherited object.\');\n  }',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'get (Future \'f \'s) => ExecutionState \'f \'s\n \n'
});

__metamagical_withMeta(Future, {
  'name': 'Future',
  'source': 'class Future {\n  constructor() {\n    define(this, \'_state\', Pending());\n    define(this, \'_listeners\', []);\n  }\n\n\n  // ---[ State and configuration ]------------------------------------\n  /*~\n   * isRequired: true\n   * type: |\n   *   get (Future \'f \'s) => ExecutionState \'f \'s\n   */\n  get _state() {\n    throw new TypeError(\'Future.prototype._state should be implemented in an inherited object.\');\n  }\n\n  /*~\n   * isRequired: true\n   * type: |\n   *   get (Future \'f \'s) => Array (DeferredListener \'f \'s)\n   */\n  get _listeners() {\n    throw new TypeError(\'Future.prototype._listeners should be implemented in an inherited object.\');\n  }\n\n\n  // ---[ Reacting to Future events ]----------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).(DeferredListener \'f \'s) => Future \'f \'s\n   */\n  listen(pattern) {\n    this._state.matchWith({\n      Pending:   ()           => this._listeners.push(pattern),\n      Cancelled: ()           => pattern.onCancelled(), \n      Resolved:  ({ value })  => pattern.onResolved(value),\n      Rejected:  ({ reason }) => pattern.onRejected(reason)\n    });\n    return this;\n  }\n\n\n  // --[ Transforming Futures ]----------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'s) => Future \'s2) => Future \'f \'s2\n   */\n  chain(transformation) {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(reason),\n      onResolved:  value  => {\n        transformation(value).listen({\n          onCancelled: ()     => deferred.cancel(),\n          onRejected:  reason => deferred.reject(reason),\n          onResolved:  value2 => deferred.resolve(value2)\n        });\n      }\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'s) => \'s2) => Future \'f \'s2\n   */\n  map(transformation) {\n    return this.chain(value => Future.of(transformation(value)));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).(Future \'f ((\'s) => \'s2)) => Future \'f \'s2\n   */\n  apply(future) {\n    return this.chain(fn => future.map(fn));\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => \'f2, (\'s) => \'s2) => Future \'f2 \'s2\n   */\n  bimap(rejectionTransformation, successTransformation) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.reject(rejectionTransformation(reason)),\n      onResolved:  value  => deferred.resolve(successTransformation(value))\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => \'f2) => Future \'f2 \'s\n   */\n  mapRejected(transformation) {\n    return this.bimap(transformation, x => x);\n  }\n\n\n  // ---[ Recovering from errors ]-------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).((\'f) => Future \'f2 \'s2) => Future \'f2 \'s\n   */\n  recover(handler) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onResolved:  value  => deferred.resolve(value),\n      onRejected:  reason => {\n        handler(reason).listen({\n          onCancelled: ()        => deferred.cancel(),\n          onResolved:  value     => deferred.resolve(value),\n          onRejected:  newReason => deferred.reject(newReason)\n        });\n      }\n    });\n\n    return deferred.future();\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall a, b, c, d:\n   *     type Pattern = { r |\n   *       Cancelled: ()  => Future c d,\n   *       Resolved:  (b) => Future c d,\n   *       Rejected:  (a) => Future c d\n   *     }\n   *     \n   *     (Future a b).(Pattern) => Future c d \n   */\n  willMatchWith(pattern) {\n    let deferred = new Deferred();      // eslint-disable-line prefer-const\n    const resolve = (handler) => (value) => handler(value).listen({\n      onCancelled: ()         => deferred.cancel(),\n      onResolved:  (newValue) => deferred.resolve(newValue),\n      onRejected:  (reason)   => deferred.reject(reason) \n    });\n    this.listen({\n      onCancelled: resolve(pattern.Cancelled),\n      onResolved:  resolve(pattern.Resolved),\n      onRejected:  resolve(pattern.Rejected)\n    });\n\n    return deferred.future();\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => Future \'s \'f\n   */\n  swap() {\n    let deferred = new Deferred();    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: ()     => deferred.cancel(),\n      onRejected:  reason => deferred.resolve(reason),\n      onResolved:  value  => deferred.reject(value) \n    });\n\n    return deferred.future();\n  }\n\n\n  // ---[ Debugging ]--------------------------------------------------\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => String\n   */\n  toString() {\n    const listeners = this._listeners.length;\n    const state     = this._state;\n\n    return `folktale:Future(${state}, ${listeners} listeners)`;\n  }\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   (Future \'f \'s).() => String\n   */\n  inspect() {\n    return this.toString();\n  }\n\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v:\n   *     (Future e v).() => Promise v e\n   */\n  toPromise() {\n    return require(\'folktale/conversions/future-to-promise\')(this);\n  }\n}',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 235,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

Object.assign(Future, (_Object$assign = {
  of: function of(value) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Resolved(value);
    return result;
  },
  rejected: function rejected(reason) {
    var result = new Future(); // eslint-disable-line prefer-const
    result._state = Rejected(reason);
    return result;
  },
  fromPromise: function fromPromise(aPromise) {
    return require('../../conversions/promise-to-future')(aPromise);
  }
}, __metamagical_withMeta(_Object$assign['of'], {
  'name': 'of',
  'source': 'of(value) {\n    let result = new Future();    // eslint-disable-line prefer-const\n    result._state = Resolved(value);\n    return result;\n  }',
  'signature': 'of(value)',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 239,
      'column': 22
    },
    'end': {
      'line': 272,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b:\n  (Future).(b) => Future a b\n \n'
}), __metamagical_withMeta(_Object$assign['rejected'], {
  'name': 'rejected',
  'source': 'rejected(reason) {\n    let result = new Future();      // eslint-disable-line prefer-const\n    result._state = Rejected(reason);\n    return result;\n  }',
  'signature': 'rejected(reason)',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 239,
      'column': 22
    },
    'end': {
      'line': 272,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Future).(a) => Future a b\n \n'
}), __metamagical_withMeta(_Object$assign['fromPromise'], {
  'name': 'fromPromise',
  'source': 'fromPromise(aPromise) {\n    return require(\'folktale/conversions/promise-to-future\')(aPromise);\n  }',
  'signature': 'fromPromise(aPromise)',
  'location': {
    'filename': 'source/concurrency/future/_future.js',
    'start': {
      'line': 239,
      'column': 22
    },
    'end': {
      'line': 272,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v: (Promise v e) => Future e v\n \n'
}), _Object$assign));

provideAliases(Future);
provideAliases(Future.prototype);

// --[ Exports ]-------------------------------------------------------
module.exports = Future;