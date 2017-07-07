'use strict';

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
    _Deferred$prototype;

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
var define = require('../../helpers/define');var thunk = require('../../helpers/thunk');

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


var moveToState = __metamagical_withMeta(function (deferred, newState) {
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
}, {
  'name': 'moveToState',
  'source': '(deferred, newState) => {\n  if (!Pending.hasInstance(deferred._state)) {\n    const description = newState.matchWith({\n      Resolved:  _ => \'resolved\',\n      Rejected:  _ => \'rejected\',\n      Cancelled: _ => \'cancelled\'\n    });\n    throw new Error(`Only pending deferreds can be ${description}, this deferred is already ${description}.`);\n  }\n\n  deferred._state = newState;\n\n  const listeners = deferred._listeners;\n  for (let i = 0; i < listeners.length; ++i) {\n    newState.matchWith({\n      Resolved: ({ value })  => listeners[i].onResolved(value),\n      Rejected: ({ reason }) => listeners[i].onRejected(reason),\n      Cancelled: _           => listeners[i].onCancelled()\n    });\n  }\n  deferred._listeners = [];\n}',
  'signature': 'moveToState(deferred, newState)',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 24,
      'column': 0
    },
    'end': {
      'line': 45,
      'column': 2
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s, ExecutionState \'f \'s) => Void :: mutates \'a\n'
});

// --[ Implementation ]------------------------------------------------
/*~
 * stability: experimental
 */
function Deferred() {
  define(this, '_state', Pending());
  define(this, '_listeners', []);
}

__metamagical_withMeta(Deferred, {
  'name': 'Deferred',
  'source': 'function Deferred() {\n  define(this, \'_state\', Pending());\n  define(this, \'_listeners\', []);\n}',
  'signature': 'Deferred()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 52,
      'column': 0
    },
    'end': {
      'line': 55,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

Deferred.prototype = (_Deferred$prototype = _defineProperty({
  get _state() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._state.');
  },

  get _listeners() {
    throw new TypeError('Deferred.prototype is abstract and does not implement ._listeners');
  },

  resolve: function resolve(value) {
    moveToState(this, Resolved(value));
    return this;
  },
  reject: function reject(reason) {
    moveToState(this, Rejected(reason));
    return this;
  },
  cancel: function cancel() {
    moveToState(this, Cancelled());
    return this;
  },
  maybeCancel: function maybeCancel() {
    if (Pending.hasInstance(this._state)) {
      this.cancel();
    }
    return this;
  },
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
  toString: function toString() {
    var listeners = this._listeners.length;
    var state = this._state;

    return 'folktale:Deferred(' + state + ', ' + listeners + ' listeners)';
  },
  inspect: function inspect() {
    return this.toString();
  }
}, Symbol.toStringTag, 'folktale:Deferred'), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_Deferred$prototype, '_state').get, {
  'name': '_state',
  'source': 'get _state() {\n    throw new TypeError(\'Deferred.prototype is abstract and does not implement ._state.\');\n  }',
  'signature': 'get _state()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'get (Deferred \'f \'s) => ExecutionState \'f \'s\n \n'
}), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_Deferred$prototype, '_listeners').get, {
  'name': '_listeners',
  'source': 'get _listeners() {\n    throw new TypeError(\'Deferred.prototype is abstract and does not implement ._listeners\');\n  }',
  'signature': 'get _listeners()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'get (Deferred \'f \'s) => Array (DeferredListener \'f \'s)\n \n'
}), __metamagical_withMeta(_Deferred$prototype['resolve'], {
  'name': 'resolve',
  'source': 'resolve(value) {\n    moveToState(this, Resolved(value));\n    return this;\n  }',
  'signature': 'resolve(value)',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s).(\'s) => \'a :: mutates \'a\n \n'
}), __metamagical_withMeta(_Deferred$prototype['reject'], {
  'name': 'reject',
  'source': 'reject(reason) {\n    moveToState(this, Rejected(reason));\n    return this;\n  }',
  'signature': 'reject(reason)',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s).(\'f) => \'a :: mutates \'a\n \n'
}), __metamagical_withMeta(_Deferred$prototype['cancel'], {
  'name': 'cancel',
  'source': 'cancel() {\n    moveToState(this, Cancelled());\n    return this;\n  }',
  'signature': 'cancel()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s).() => \'a :: mutates \'a\n \n'
}), __metamagical_withMeta(_Deferred$prototype['maybeCancel'], {
  'name': 'maybeCancel',
  'source': 'maybeCancel() {\n    if (Pending.hasInstance(this._state)) {\n      this.cancel();\n    }\n    return this;\n  }',
  'signature': 'maybeCancel()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s).() => \'a :: mutates \'a\n \n'
}), __metamagical_withMeta(_Deferred$prototype['listen'], {
  'name': 'listen',
  'source': 'listen(pattern) {\n    this._state.matchWith({\n      Pending:   _            => this._listeners.push(pattern),\n      Cancelled: _            => pattern.onCancelled(), \n      Resolved:  ({ value })  => pattern.onResolved(value),\n      Rejected:  ({ reason }) => pattern.onRejected(reason)\n    });\n    return this;\n  }',
  'signature': 'listen(pattern)',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(\'a: Deferred \'f \'s).(DeferredListener \'f \'s) => Void\n \n'
}), __metamagical_withMeta(_Deferred$prototype['promise'], {
  'name': 'promise',
  'source': 'promise() {\n    return new Promise((resolve, reject) => {\n      this.listen({\n        onCancelled: _ => reject(Cancelled()),\n        onResolved: resolve,\n        onRejected: reject \n      });\n    });\n  }',
  'signature': 'promise()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Deferred \'f \'s).() => Promise \'f \'s\n \n'
}), __metamagical_withMeta(_Deferred$prototype['future'], {
  'name': 'future',
  'source': 'future() {\n    let future = new (Future());    // eslint-disable-line prefer-const\n    this.listen({\n      onCancelled: _      => moveToState(future, Cancelled()),\n      onRejected:  reason => moveToState(future, Rejected(reason)),\n      onResolved:  value  => moveToState(future, Resolved(value)) \n    });\n\n    return future;\n  }',
  'signature': 'future()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Deferred \'f \'s).() => Future \'f \'s\n \n'
}), __metamagical_withMeta(_Deferred$prototype['toString'], {
  'name': 'toString',
  'source': 'toString() {\n    const listeners = this._listeners.length;\n    const state     = this._state;\n\n    return `folktale:Deferred(${state}, ${listeners} listeners)`;\n  }',
  'signature': 'toString()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Deferred \'f \'s).() => String\n \n'
}), __metamagical_withMeta(_Deferred$prototype['inspect'], {
  'name': 'inspect',
  'source': 'inspect() {\n    return this.toString();\n  }',
  'signature': 'inspect()',
  'location': {
    'filename': 'source/concurrency/future/_deferred.js',
    'start': {
      'line': 58,
      'column': 21
    },
    'end': {
      'line': 186,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/future/_deferred',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Deferred \'f \'s).() => String\n \n'
}), _Deferred$prototype);

// --[ Exports ]-------------------------------------------------------
module.exports = Deferred;