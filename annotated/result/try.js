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

var _require = require('./result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b: (() => b :: throws a) => Result a b
 */


var _try = __metamagical_withMeta(function (f) {
  try {
    return Ok(f());
  } catch (e) {
    return Error(e);
  }
}, {
  'name': '_try',
  'source': '(f) => {\n  try {\n    return Ok(f());\n  } catch (e) {\n    return Error(e);\n  }\n}',
  'signature': '_try(f)',
  'location': {
    'filename': 'source/result/try.js',
    'start': {
      'line': 20,
      'column': 0
    },
    'end': {
      'line': 26,
      'column': 2
    }
  },
  'module': 'folktale/result/try',
  'licence': 'MIT',
  'authors': ['@boris-marinov'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (() => b :: throws a) => Result a b\n'
});

module.exports = _try;