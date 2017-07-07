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

var _require = require('../concurrency/task'),
    task = _require.task;

/*~
 * stability: experimental
 * type: |
 *   forall e, v, r:
 *     ((Any...) => Promise v e) => (Any...) => Task e v r
 */


var promisedToTask = __metamagical_withMeta(function (aPromiseFn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return task(function (resolver) {
      aPromiseFn.apply(undefined, args).then(function (value) {
        return resolver.resolve(value);
      }, function (error) {
        return resolver.reject(error);
      });
    });
  };
}, {
  'name': 'promisedToTask',
  'source': '(aPromiseFn) => {\n  return (...args) => task(resolver => {\n    aPromiseFn(...args).then(\n      (value) => resolver.resolve(value),\n      (error) => resolver.reject(error)\n    );\n  });\n}',
  'signature': 'promisedToTask(aPromiseFn)',
  'location': {
    'filename': 'source/conversions/promised-to-task.js',
    'start': {
      'line': 19,
      'column': 0
    },
    'end': {
      'line': 26,
      'column': 2
    }
  },
  'module': 'folktale/conversions/promised-to-task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v, r:\n  ((Any...) => Promise v e) => (Any...) => Task e v r\n'
});

module.exports = promisedToTask;