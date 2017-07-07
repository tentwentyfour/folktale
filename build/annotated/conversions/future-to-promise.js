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

/*~
 * stability: experimental
 * type: |
 *   forall e, v:
 *     (Future e v) => Promise v e
 */


var futureToPromise = __metamagical_withMeta(function (aFuture) {
  return new Promise(function (resolve, reject) {
    aFuture.listen({
      onResolved: function onResolved(value) {
        return resolve(value);
      },
      onRejected: function onRejected(error) {
        return reject(error);
      },
      onCancelled: function onCancelled() {
        return reject(Cancelled());
      }
    });
  });
}, {
  'name': 'futureToPromise',
  'source': '(aFuture) => {\n  return new Promise((resolve, reject) => {\n    aFuture.listen({\n      onResolved: (value) => resolve(value),\n      onRejected: (error) => reject(error),\n      onCancelled: ()     => reject(Cancelled())\n    });\n  });\n}',
  'signature': 'futureToPromise(aFuture)',
  'location': {
    'filename': 'source/conversions/future-to-promise.js',
    'start': {
      'line': 19,
      'column': 0
    },
    'end': {
      'line': 27,
      'column': 2
    }
  },
  'module': 'folktale/conversions/future-to-promise',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v:\n  (Future e v) => Promise v e\n'
});

module.exports = futureToPromise;