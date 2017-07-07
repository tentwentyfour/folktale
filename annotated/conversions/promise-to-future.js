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
  });object[Symbol.for('@@meta:magical')] = oldMeta;return object;
};

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
var promiseToFuture = __metamagical_withMeta(function (aPromise) {
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
}, {
  'name': 'promiseToFuture',
  'source': '(aPromise) => {\n  const deferred = new Deferred();\n  aPromise.then(\n    (value) => deferred.resolve(value),\n    (error) => {\n      if (Cancelled.hasInstance(error)) {\n        deferred.cancel();\n      } else {\n        deferred.reject(error);\n      }\n    }\n  );\n  return deferred.future();\n}',
  'signature': 'promiseToFuture(aPromise)',
  'location': {
    'filename': 'source/conversions/promise-to-future.js',
    'start': {
      'line': 19,
      'column': 0
    },
    'end': {
      'line': 32,
      'column': 2
    }
  },
  'module': 'folktale/conversions/promise-to-future',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v:\n  (Promise v e) => Future e v\n'
});

module.exports = promiseToFuture;