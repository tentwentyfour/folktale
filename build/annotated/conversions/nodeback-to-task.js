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
 * authors:
 *   - "@rpearce"
 * type: |
 *    forall s, e, r:
 *    ((Any..., (e, s) => Void) => Void)
 *    => (Any...)
 *    => Task e s r
 */

var nodebackToTask = __metamagical_withMeta(function (fn) {
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
}, {
  'name': 'nodebackToTask',
  'source': 'fn => (...args) => (\n  task(r =>\n    fn(...args, (err, data) => err ? r.reject(err) : r.resolve(data))\n  )\n)',
  'signature': 'nodebackToTask(fn)',
  'location': {
    'filename': 'source/conversions/nodeback-to-task.js',
    'start': {
      'line': 23,
      'column': 0
    },
    'end': {
      'line': 27,
      'column': 2
    }
  },
  'module': 'folktale/conversions/nodeback-to-task',
  'licence': 'MIT',
  'authors': ['@rpearce'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall s, e, r:\n((Any..., (e, s) => Void) => Void)\n=> (Any...)\n=> Task e s r\n'
});

module.exports = nodebackToTask;