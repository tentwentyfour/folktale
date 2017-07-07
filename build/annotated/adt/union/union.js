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
  });
  object[Symbol.for('@@meta:magical')] = oldMeta;return object;
},
    _metamagical_withMet;

function _defineEnumerableProperties(obj, descs) { for (var key in descs) { var desc = descs[key]; desc.configurable = desc.enumerable = true; if ("value" in desc) desc.writable = true; Object.defineProperty(obj, key, desc); } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var warnDeprecation = require('../../helpers/warn-deprecation');
var extend = require('../../helpers/extend');

// --[ Constants and Aliases ]------------------------------------------
var TYPE = Symbol.for('@@folktale:adt:type');
var TAG = Symbol.for('@@folktale:adt:tag');
var META = Symbol.for('@@meta:magical');

var keys = Object.keys;

// --[ Helpers ]--------------------------------------------------------

//
// Returns an array of own enumerable values in an object.
//
function values(object) {
  return keys(object).map(function (key) {
    return object[key];
  });
}

//
// Transforms own enumerable key/value pairs.
//
function mapObject(object, transform) {
  return keys(object).reduce(function (result, key) {
    result[key] = transform(key, object[key]);
    return result;
  }, {});
}

// --[ Variant implementation ]-----------------------------------------

//
// Defines the variants given a set of patterns and an ADT namespace.
//
function defineVariants(typeId, patterns, adt) {
  return mapObject(patterns, function (name, constructor) {
    var _extend, _constructor, _ref, _extend2, _mutatorMap, _extend3, _tag, _type, _constructor2, _extend4, _mutatorMap2;

    // ---[ Variant Internals ]-----------------------------------------
    function InternalConstructor() {}
    InternalConstructor.prototype = Object.create(adt);

    extend(InternalConstructor.prototype, (_extend = (_extend2 = {}, _defineProperty(_extend2, TAG, name), _constructor = 'constructor', _mutatorMap = {}, _mutatorMap[_constructor] = _mutatorMap[_constructor] || {}, _mutatorMap[_constructor].get = function () {
      return constructor;
    }, _ref = 'is' + name, _mutatorMap[_ref] = _mutatorMap[_ref] || {}, _mutatorMap[_ref].get = function () {
      warnDeprecation('.is' + name + ' is deprecated. Use ' + name + '.hasInstance(value)\ninstead to check if a value belongs to the ADT variant.');
      return true;
    }, _defineProperty(_extend2, 'matchWith', function matchWith(pattern) {
      return pattern[name](this);
    }), _defineEnumerableProperties(_extend2, _mutatorMap), _extend2), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend, 'constructor').get, {
      'name': 'constructor',
      'source': 'get constructor() {\n        return constructor;\n      }',
      'signature': 'get constructor()',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 55,
          'column': 42
        },
        'end': {
          'line': 87,
          'column': 5
        }
      },
      'module': 'folktale/adt/union/union',
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~inheritsMeta': function inheritsMeta() {
        return constructor;
      }
    }), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend, 'is' + name).get, {
      'source': 'get [`is${name}`]() {\n        warnDeprecation(`.is${name} is deprecated. Use ${name}.hasInstance(value)\ninstead to check if a value belongs to the ADT variant.`);\n        return true;\n      }',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 55,
          'column': 42
        },
        'end': {
          'line': 87,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return constructor;
      },
      'deprecated': {
        'version': '2.0.0',
        'replacedBy': '.hasInstance(value)w'
      },
      'stability': 'deprecated'
    }), __metamagical_withMeta(_extend['matchWith'], {
      'name': 'matchWith',
      'source': 'matchWith(pattern) {\n        return pattern[name](this);\n      }',
      'signature': 'matchWith(pattern)',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 55,
          'column': 42
        },
        'end': {
          'line': 87,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return constructor;
      },
      'type': '(\'a is Variant).({ \'b: (Object Any) => \'c }) => \'c\nwhere \'b = \'a[`@@folktale:adt:tag]\n     \n'
    }), _extend));

    function makeInstance() {
      var result = new InternalConstructor(); // eslint-disable-line prefer-const
      extend(result, constructor.apply(undefined, arguments) || {});
      return result;
    }

    extend(makeInstance, (_extend3 = (_extend4 = {}, _defineProperty(_extend4, META, constructor[META]), _tag = 'tag', _mutatorMap2 = {}, _mutatorMap2[_tag] = _mutatorMap2[_tag] || {}, _mutatorMap2[_tag].get = function () {
      return name;
    }, _type = 'type', _mutatorMap2[_type] = _mutatorMap2[_type] || {}, _mutatorMap2[_type].get = function () {
      return typeId;
    }, _constructor2 = 'constructor', _mutatorMap2[_constructor2] = _mutatorMap2[_constructor2] || {}, _mutatorMap2[_constructor2].get = function () {
      return constructor;
    }, _defineProperty(_extend4, 'prototype', InternalConstructor.prototype), _defineProperty(_extend4, 'hasInstance', function hasInstance(value) {
      return Boolean(value) && adt.hasInstance(value) && value[TAG] === name;
    }), _defineEnumerableProperties(_extend4, _mutatorMap2), _extend4), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend3, 'tag').get, {
      'name': 'tag',
      'source': 'get tag() {\n        return name;\n      }',
      'signature': 'get tag()',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 95,
          'column': 25
        },
        'end': {
          'line': 138,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return makeInstance;
      }
    }), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend3, 'type').get, {
      'name': 'type',
      'source': 'get type() {\n        return typeId;\n      }',
      'signature': 'get type()',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 95,
          'column': 25
        },
        'end': {
          'line': 138,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return makeInstance;
      }
    }), __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend3, 'constructor').get, {
      'name': 'constructor',
      'source': 'get constructor() {\n        return constructor;\n      }',
      'signature': 'get constructor()',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 95,
          'column': 25
        },
        'end': {
          'line': 138,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return makeInstance;
      }
    }), __metamagical_withMeta(_extend3['prototype'], {
      'name': 'prototype',
      'source': 'InternalConstructor.prototype',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 95,
          'column': 25
        },
        'end': {
          'line': 138,
          'column': 5
        }
      },
      'module': 'folktale/adt/union/union',
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return makeInstance;
      }
    }), __metamagical_withMeta(_extend3['hasInstance'], {
      'name': 'hasInstance',
      'source': 'hasInstance(value) {\n        return Boolean(value) \n        &&     adt.hasInstance(value) \n        &&     value[TAG] === name;\n      }',
      'signature': 'hasInstance(value)',
      'location': {
        'filename': 'source/adt/union/union.js',
        'start': {
          'line': 95,
          'column': 25
        },
        'end': {
          'line': 138,
          'column': 5
        }
      },
      'module': null,
      'licence': 'MIT',
      'authors': ['Quildreen Motta'],
      'repository': 'https://github.com/origamitower/folktale',
      'npmPackage': 'folktale',
      'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
      'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
      '~belongsTo': function belongsTo() {
        return makeInstance;
      },
      'type': '(Variant) => Boolean\n     \n'
    }), _extend3));

    return makeInstance;
  });
}

// --[ ADT Implementation ]--------------------------------------------

/*~
 * authors:
 *   - Quildreen Motta
 * 
 * stability: experimental
 * type: |
 *   (String, Object (Array String)) => Union
 */
var union = __metamagical_withMeta(function (typeId, patterns) {
  var _extend5, _extend6;

  var UnionNamespace = Object.create(Union);
  var variants = defineVariants(typeId, patterns, UnionNamespace);

  extend(UnionNamespace, variants, (_extend5 = (_extend6 = {}, _defineProperty(_extend6, TYPE, typeId), _defineProperty(_extend6, 'variants', values(variants)), _defineProperty(_extend6, 'hasInstance', function hasInstance(value) {
    return Boolean(value) && value[TYPE] === this[TYPE];
  }), _extend6), __metamagical_withMeta(_extend5['variants'], {
    'name': 'variants',
    'source': 'values(variants)',
    'location': {
      'filename': 'source/adt/union/union.js',
      'start': {
        'line': 161,
        'column': 35
      },
      'end': {
        'line': 182,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    'type': 'Array Variant',
    '~belongsTo': function belongsTo() {
      return UnionNamespace;
    }
  }), __metamagical_withMeta(_extend5['hasInstance'], {
    'name': 'hasInstance',
    'source': 'hasInstance(value) {\n      return Boolean(value)\n      &&     value[TYPE] === this[TYPE];\n    }',
    'signature': 'hasInstance(value)',
    'location': {
      'filename': 'source/adt/union/union.js',
      'start': {
        'line': 161,
        'column': 35
      },
      'end': {
        'line': 182,
        'column': 3
      }
    },
    'module': null,
    'licence': 'MIT',
    'authors': ['Quildreen Motta'],
    'repository': 'https://github.com/origamitower/folktale',
    'npmPackage': 'folktale',
    'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
    'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
    '~belongsTo': function belongsTo() {
      return UnionNamespace;
    },
    'type': 'Union.(Variant) -> Boolean\n   \n'
  }), _extend5));

  return UnionNamespace;
}, {
  'name': 'union',
  'source': '(typeId, patterns) => {\n  const UnionNamespace = Object.create(Union);\n  const variants       = defineVariants(typeId, patterns, UnionNamespace);\n\n  extend(UnionNamespace, variants, {\n    // This is internal, and we don\'t really document it to the user\n    [TYPE]: typeId,\n\n    /*~\n     * type: Array Variant\n     * module: null\n     * ~belongsTo: UnionNamespace\n     */\n    variants: values(variants),\n\n    /*~\n     * ~belongsTo: UnionNamespace\n     * module: null\n     * type: |\n     *   Union.(Variant) -> Boolean\n     */\n    hasInstance(value) {\n      return Boolean(value)\n      &&     value[TYPE] === this[TYPE];\n    }\n  });\n\n  return UnionNamespace;\n}',
  'signature': 'union(typeId, patterns)',
  'location': {
    'filename': 'source/adt/union/union.js',
    'start': {
      'line': 157,
      'column': 0
    },
    'end': {
      'line': 185,
      'column': 2
    }
  },
  'module': 'folktale/adt/union/union',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(String, Object (Array String)) => Union\n'
});

/*~ ~belongsTo : union */
var Union = __metamagical_withMeta((_metamagical_withMet = {
  derive: function derive() {
    var _this = this;

    for (var _len = arguments.length, derivations = Array(_len), _key = 0; _key < _len; _key++) {
      derivations[_key] = arguments[_key];
    }

    derivations.forEach(function (derivation) {
      _this.variants.forEach(function (variant) {
        return derivation(variant, _this);
      });
    });
    return this;
  }
}, __metamagical_withMeta(_metamagical_withMet['derive'], {
  'name': 'derive',
  'source': 'derive(...derivations) {\n    derivations.forEach(derivation => {\n      this.variants.forEach(variant => derivation(variant, this));\n    });\n    return this;\n  }',
  'signature': 'derive(...derivations)',
  'belongsTo': function belongsTo() {
    return Union;
  },
  'type': 'Union . (...(Variant, Union) => Any) => Union\n \n'
}), _metamagical_withMet), {
  'name': 'Union',
  'source': '{\n  /*~\n   * type: |\n   *   Union . (...(Variant, Union) => Any) => Union\n   */\n  derive(...derivations) {\n    derivations.forEach(derivation => {\n      this.variants.forEach(variant => derivation(variant, this));\n    });\n    return this;\n  }\n}',
  'location': {
    'filename': 'source/adt/union/union.js',
    'start': {
      'line': 189,
      'column': 0
    },
    'end': {
      'line': 200,
      'column': 2
    }
  },
  'module': 'folktale/adt/union/union',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  '~belongsTo': function belongsTo() {
    return union;
  }
});

// --[ Exports ]--------------------------------------------------------
union.Union = Union;
union.typeSymbol = TYPE;
union.tagSymbol = TAG;

module.exports = union;