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
},
    _metamagical_withMet,
    _metamagical_withMet2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Result = require('./result');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~
 * stability: stable
 * name: module folktale/result
 */


module.exports = __metamagical_withMeta((_metamagical_withMet = (_metamagical_withMet2 = {
  Error: Result.Error,
  Ok: Result.Ok,
  hasInstance: Result.hasInstance,
  of: Result.of,
  fromJSON: Result.fromJSON
}, _defineProperty(_metamagical_withMet2, typeSymbol, Result[typeSymbol]), _defineProperty(_metamagical_withMet2, 'try', require('./try')), _defineProperty(_metamagical_withMet2, 'fromNullable', function fromNullable(aNullable) {
  return require('../conversions/nullable-to-result')(aNullable);
}), _defineProperty(_metamagical_withMet2, 'fromValidation', function fromValidation(aValidation) {
  return require('../conversions/validation-to-result')(aValidation);
}), _defineProperty(_metamagical_withMet2, 'fromMaybe', function fromMaybe(aMaybe, failureValue) {
  return require('../conversions/maybe-to-result')(aMaybe, failureValue);
}), _metamagical_withMet2), __metamagical_withMeta(_metamagical_withMet['fromNullable'], {
  'name': 'fromNullable',
  'source': 'fromNullable(aNullable) {\n    return require(\'folktale/conversions/nullable-to-result\')(aNullable);\n  }',
  'signature': 'fromNullable(aNullable)',
  'location': {
    'filename': 'source/result/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a: (a or None) => Result None a\n \n'
}), __metamagical_withMeta(_metamagical_withMet['fromValidation'], {
  'name': 'fromValidation',
  'source': 'fromValidation(aValidation) {\n    return require(\'folktale/conversions/validation-to-result\')(aValidation);\n  }',
  'signature': 'fromValidation(aValidation)',
  'location': {
    'filename': 'source/result/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b) => Result a b\n \n'
}), __metamagical_withMeta(_metamagical_withMet['fromMaybe'], {
  'name': 'fromMaybe',
  'source': 'fromMaybe(aMaybe, failureValue) {\n    return require(\'folktale/conversions/maybe-to-result\')(aMaybe, failureValue);\n  }',
  'signature': 'fromMaybe(aMaybe, failureValue)',
  'location': {
    'filename': 'source/result/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Maybe b, a) => Result a b\n \n'
}), _metamagical_withMet), {
  'name': 'module folktale/result',
  'source': '{\n  Error: Result.Error,\n  Ok: Result.Ok,\n  hasInstance: Result.hasInstance,\n  of: Result.of,\n  fromJSON: Result.fromJSON,\n  [typeSymbol]: Result[typeSymbol],\n  try: require(\'./try\'),\n\n  /*~\n   * type: |\n   *   forall a: (a or None) => Result None a\n   */\n  fromNullable(aNullable) {\n    return require(\'folktale/conversions/nullable-to-result\')(aNullable);\n  },\n\n  /*~\n   * type: |\n   *   forall a, b: (Validation a b) => Result a b\n   */\n  fromValidation(aValidation) {\n    return require(\'folktale/conversions/validation-to-result\')(aValidation);\n  },\n\n  /*~\n   * type: |\n   *   forall a, b: (Maybe b, a) => Result a b\n   */\n  fromMaybe(aMaybe, failureValue) {\n    return require(\'folktale/conversions/maybe-to-result\')(aMaybe, failureValue);\n  }\n}',
  'location': {
    'filename': 'source/result/index.js',
    'start': {
      'line': 18,
      'column': 0
    },
    'end': {
      'line': 50,
      'column': 2
    }
  },
  'module': 'folktale/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isModule': true,
  'stability': 'stable'
});