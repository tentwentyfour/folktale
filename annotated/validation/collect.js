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


var _require = require('./validation'),
    Success = _require.Success;

/*~
 * stability: experimental
 * type: |
 *   forall a, b: (Array (Validation a b)) => Validation a b
 *   where a is Semigroup
 */


var collect = __metamagical_withMeta(function (validations) {
  return validations.reduce(function (a, b) {
    return a.concat(b);
  }, Success());
}, {
  'name': 'collect',
  'source': '(validations) =>\n  validations.reduce((a, b) => a.concat(b), Success())',
  'signature': 'collect(validations)',
  'location': {
    'filename': 'source/validation/collect.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 21,
      'column': 55
    }
  },
  'module': 'folktale/validation/collect',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Array (Validation a b)) => Validation a b\nwhere a is Semigroup\n'
});

module.exports = collect;