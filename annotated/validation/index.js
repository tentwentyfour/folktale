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

var Validation = require('./validation');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~ 
 * stability: stable
 * name: module folktale/validation
 */


module.exports = __metamagical_withMeta((_metamagical_withMet = (_metamagical_withMet2 = {
  Success: Validation.Success,
  Failure: Validation.Failure,
  hasInstance: Validation.hasInstance,
  of: Validation.of,
  fromJSON: Validation.fromJSON
}, _defineProperty(_metamagical_withMet2, typeSymbol, Validation[typeSymbol]), _defineProperty(_metamagical_withMet2, 'collect', require('./collect')), _defineProperty(_metamagical_withMet2, 'fromNullable', function fromNullable(aNullable, fallbackValue) {
  return require('../conversions/nullable-to-validation')(aNullable, fallbackValue);
}), _defineProperty(_metamagical_withMet2, 'fromResult', function fromResult(aResult) {
  return require('../conversions/result-to-validation')(aResult);
}), _defineProperty(_metamagical_withMet2, 'fromMaybe', function fromMaybe(aMaybe, fallbackValue) {
  return require('../conversions/maybe-to-validation')(aMaybe, fallbackValue);
}), _metamagical_withMet2), __metamagical_withMeta(_metamagical_withMet['fromNullable'], {
  'name': 'fromNullable',
  'source': 'fromNullable(aNullable, fallbackValue) {\n    return require(\'folktale/conversions/nullable-to-validation\')(aNullable, fallbackValue);\n  }',
  'signature': 'fromNullable(aNullable, fallbackValue)',
  'location': {
    'filename': 'source/validation/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (a or None, b) => Validation b a\n \n'
}), __metamagical_withMeta(_metamagical_withMet['fromResult'], {
  'name': 'fromResult',
  'source': 'fromResult(aResult) {\n    return require(\'folktale/conversions/result-to-validation\')(aResult);\n  }',
  'signature': 'fromResult(aResult)',
  'location': {
    'filename': 'source/validation/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Result a b) => Validation a b\n \n'
}), __metamagical_withMeta(_metamagical_withMet['fromMaybe'], {
  'name': 'fromMaybe',
  'source': 'fromMaybe(aMaybe, fallbackValue) {\n    return require(\'folktale/conversions/maybe-to-validation\')(aMaybe, fallbackValue);\n  }',
  'signature': 'fromMaybe(aMaybe, fallbackValue)',
  'location': {
    'filename': 'source/validation/index.js',
    'start': {
      'line': 18,
      'column': 17
    },
    'end': {
      'line': 50,
      'column': 1
    }
  },
  'module': 'folktale/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Maybe b, a) => Validation a b\n \n'
}), _metamagical_withMet), {
  'name': 'module folktale/validation',
  'source': '{\n  Success: Validation.Success,\n  Failure: Validation.Failure,\n  hasInstance: Validation.hasInstance,\n  of: Validation.of,\n  fromJSON: Validation.fromJSON,\n  [typeSymbol]: Validation[typeSymbol],\n  collect: require(\'./collect\'),\n\n  /*~\n   * type: |\n   *   forall a, b: (a or None, b) => Validation b a\n   */\n  fromNullable(aNullable, fallbackValue) {\n    return require(\'folktale/conversions/nullable-to-validation\')(aNullable, fallbackValue);\n  },\n\n  /*~\n   * type: |\n   *   forall a, b: (Result a b) => Validation a b\n   */\n  fromResult(aResult) {\n    return require(\'folktale/conversions/result-to-validation\')(aResult);\n  },\n\n  /*~\n   * type: |\n   *   forall a, b: (Maybe b, a) => Validation a b\n   */\n  fromMaybe(aMaybe, fallbackValue) {\n    return require(\'folktale/conversions/maybe-to-validation\')(aMaybe, fallbackValue);\n  }\n}',
  'location': {
    'filename': 'source/validation/index.js',
    'start': {
      'line': 18,
      'column': 0
    },
    'end': {
      'line': 50,
      'column': 2
    }
  },
  'module': 'folktale/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isModule': true,
  'stability': 'stable'
});