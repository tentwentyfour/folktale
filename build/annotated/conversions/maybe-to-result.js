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

var _require = require('../result/result'),
    Error = _require.Error,
    Ok = _require.Ok;

/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Result b a
 */


var maybeToResult = __metamagical_withMeta(function (aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Error(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Ok(value);
    }
  });
}, {
  'name': 'maybeToResult',
  'source': '(aMaybe, failureValue) =>\n  aMaybe.matchWith({\n    Nothing: () => Error(failureValue),\n    Just: ({ value }) => Ok(value)\n  })',
  'signature': 'maybeToResult(aMaybe, failureValue)',
  'location': {
    'filename': 'source/conversions/maybe-to-result.js',
    'start': {
      'line': 22,
      'column': 0
    },
    'end': {
      'line': 26,
      'column': 5
    }
  },
  'module': 'folktale/conversions/maybe-to-result',
  'licence': 'MIT',
  'authors': ['@boris-marinov'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a, b:\n  (Maybe a, b) => Result b a\n'
});

module.exports = maybeToResult;