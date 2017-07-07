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
    _union,
    _extend,
    _adtMethods,
    _Object$assign;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = require('../helpers/assert-type');
var assertFunction = require('../helpers/assert-function');

var _require = require('../adt/union'),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = require('../helpers/provide-fantasy-land-aliases');
var warnDeprecation = require('../helpers/warn-deprecation');
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: stable */

var Maybe = __metamagical_withMeta(union('folktale:Maybe', (_union = {
  Nothing: function Nothing() {},
  Just: function Just(value) {
    return { value: value };
  }
}, __metamagical_withMeta(_union['Nothing'], {
  'name': 'Nothing',
  'source': 'Nothing() {\n  }',
  'signature': 'Nothing()',
  'belongsTo': function belongsTo() {
    return Maybe;
  },
  'type': 'forall a: () => Maybe a\n \n'
}), __metamagical_withMeta(_union['Just'], {
  'name': 'Just',
  'source': 'Just(value) {\n    return { value };\n  }',
  'signature': 'Just(value)',
  'belongsTo': function belongsTo() {
    return Maybe;
  },
  'type': 'forall a: (a) => Maybe a\n \n'
}), _union)).derive(equality, debugRepresentation, serialization), {
  'name': 'Maybe',
  'source': 'union(\'folktale:Maybe\', {\n  /*~\n   * type: |\n   *   forall a: () => Maybe a\n   */\n  Nothing() {\n  },\n\n  /*~\n   * type: |\n   *   forall a: (a) => Maybe a\n   */\n  Just(value) {\n    return { value };\n  }\n}).derive(equality, debugRepresentation, serialization)',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 22,
      'column': 0
    },
    'end': {
      'line': 37,
      'column': 56
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable'
});

var Nothing = Maybe.Nothing,
    _Just = Maybe.Just;

var assertMaybe = assertType(Maybe);

extend(_Just.prototype, (_extend = {
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Maybe.Just');
  }

}, __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend, 'value').get, {
  'name': 'value',
  'source': 'get value() {\n    throw new TypeError(\'`value` can\u2019t be accessed in an abstract instance of Maybe.Just\');\n  }',
  'signature': 'get value()',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 44,
      'column': 23
    },
    'end': {
      'line': 53,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'forall a: get (Maybe a) => a\n \n'
}), _extend));

/*~~belongsTo: Maybe */
adtMethods(Maybe, (_adtMethods = {
  map: {
    /*~*/
    Nothing: function map(transformation) {
      assertFunction('Maybe.Nothing#map', transformation);
      return this;
    },

    /*~*/
    Just: function map(transformation) {
      assertFunction('Maybe.Just#map', transformation);
      return _Just(transformation(this.value));
    }
  },
  apply: {
    /*~*/
    Nothing: function apply(aMaybe) {
      assertMaybe('Maybe.Nothing#apply', aMaybe);
      return this;
    },

    /*~*/
    Just: function apply(aMaybe) {
      assertMaybe('Maybe.Just#apply', aMaybe);
      return aMaybe.map(this.value);
    }
  },
  chain: {
    /*~*/
    Nothing: function chain(transformation) {
      assertFunction('Maybe.Nothing#chain', transformation);
      return this;
    },

    /*~*/
    Just: function chain(transformation) {
      assertFunction('Maybe.Just#chain', transformation);
      return transformation(this.value);
    }
  },
  unsafeGet: {
    /*~*/
    Nothing: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Nothing.\n\n    Since Nothing holds no values, it\'s not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Just: function unsafeGet() {
      return this.value;
    }
  },
  getOrElse: {
    /*~*/
    Nothing: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Just: function getOrElse(_default) {
      return this.value;
    }
  },
  orElse: {
    /*~*/
    Nothing: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Just: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return this;
    }
  },
  concat: {
    /*~*/
    Nothing: function concat(aMaybe) {
      assertMaybe('Maybe.Nothing#concat', aMaybe);
      return aMaybe;
    },

    /*~*/
    Just: function concat(aMaybe) {
      var _this = this;

      assertMaybe('Maybe.Just#concat', aMaybe);
      return aMaybe.matchWith({
        Nothing: function Nothing() {
          return _Just(_this.value);
        },
        Just: function Just(a) {
          return _Just(_this.value.concat(a.value));
        }
      });
    }
  },
  cata: {
    /*~*/
    Nothing: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Nothing();
    },

    /*~*/
    Just: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Just(this.value);
    }
  },
  fold: {
    /*~*/
    Nothing: function Nothing(transformNothing, transformJust) {
      assertFunction('Maybe.Nothing#fold', transformNothing);
      assertFunction('Maybe.Nothing#fold', transformJust);
      return transformNothing();
    },

    /*~*/
    Just: function Just(transformNothing, transformJust) {
      assertFunction('Maybe.Just#fold', transformNothing);
      assertFunction('Maybe.Just#fold', transformJust);
      return transformJust(this.value);
    }
  },
  filter: {
    /*~*/
    Nothing: function filter(predicate) {
      assertFunction('Maybe.Nothing#filter', predicate);
      return this;
    },

    /*~*/
    Just: function filter(predicate) {
      assertFunction('Maybe.Just#filter', predicate);
      return predicate(this.value) ? this : Nothing();
    }
  }
}, __metamagical_withMeta(_adtMethods['map'], {
  'name': 'map',
  'source': '{\n    /*~*/\n    Nothing: function map(transformation) {\n      assertFunction(\'Maybe.Nothing#map\', transformation);\n      return this;\n    },\n\n    /*~*/\n    Just: function map(transformation) {\n      assertFunction(\'Maybe.Just#map\', transformation);\n      return Just(transformation(this.value));\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a, b: (Maybe a).((a) => b) => Maybe b\n \n'
}), __metamagical_withMeta(_adtMethods['apply'], {
  'name': 'apply',
  'source': '{\n    /*~*/\n    Nothing: function apply(aMaybe) {\n      assertMaybe(\'Maybe.Nothing#apply\', aMaybe);\n      return this;\n    },\n\n    /*~*/\n    Just: function apply(aMaybe) {\n      assertMaybe(\'Maybe.Just#apply\', aMaybe);\n      return aMaybe.map(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a, b: (Maybe (a) => b).(Maybe a) => Maybe b\n \n'
}), __metamagical_withMeta(_adtMethods['chain'], {
  'name': 'chain',
  'source': '{\n    /*~*/\n    Nothing: function chain(transformation) {\n      assertFunction(\'Maybe.Nothing#chain\', transformation);\n      return this;\n    },\n\n    /*~*/\n    Just: function chain(transformation) {\n      assertFunction(\'Maybe.Just#chain\', transformation);\n      return transformation(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a, b: (Maybe a).((a) => Maybe b) => Maybe b\n \n'
}), __metamagical_withMeta(_adtMethods['unsafeGet'], {
  'name': 'unsafeGet',
  'source': '{\n    /*~*/\n    Nothing: function unsafeGet() {\n      throw new TypeError(`Can\'t extract the value of a Nothing.\n\n    Since Nothing holds no values, it\'s not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method\n    that is not partial.\n      `);\n    },\n\n    /*~*/\n    Just: function unsafeGet() {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a: (Maybe a).() => a :: (throws TypeError)\n \n'
}), __metamagical_withMeta(_adtMethods['getOrElse'], {
  'name': 'getOrElse',
  'source': '{\n    /*~*/\n    Nothing: function getOrElse(_default) {\n      return _default;\n    },\n\n    /*~*/\n    Just: function getOrElse(_default) {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a: (Maybe a).(a) => a\n \n'
}), __metamagical_withMeta(_adtMethods['orElse'], {
  'name': 'orElse',
  'source': '{\n    /*~*/\n    Nothing: function orElse(handler) {\n      assertFunction(\'Maybe.Nothing#orElse\', handler);\n      return handler(this.value);\n    },\n\n    /*~*/\n    Just: function orElse(handler) {\n      assertFunction(\'Maybe.Nothing#orElse\', handler);\n      return this;\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a: (Maybe a).((a) => Maybe a) => Maybe a\n \n'
}), __metamagical_withMeta(_adtMethods['concat'], {
  'name': 'concat',
  'source': '{\n    /*~*/\n    Nothing: function concat(aMaybe) {\n      assertMaybe(\'Maybe.Nothing#concat\', aMaybe);\n      return aMaybe;\n    },\n\n    /*~*/\n    Just: function concat(aMaybe) {\n      assertMaybe(\'Maybe.Just#concat\', aMaybe);\n      return aMaybe.matchWith({\n        Nothing: () => Just(this.value),\n        Just: (a) => Just(this.value.concat(a.value))\n      });\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['@diasbruno'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a: (Maybe a).(Maybe a) => Maybe a\nwhere a is Semigroup\n \n'
}), __metamagical_withMeta(_adtMethods['cata'], {
  'name': 'cata',
  'source': '{\n    /*~*/\n    Nothing: function cata(pattern) {\n      warnDeprecation(\'`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.\');\n      return pattern.Nothing();\n    },\n\n    /*~*/\n    Just: function cata(pattern) {\n      warnDeprecation(\'`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.\');\n      return pattern.Just(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'deprecated': {
    'since': '2.0.0',
    'replacedBy': '.matchWith(pattern)'
  },
  'type': 'forall a, b:\n  (Maybe a).({\n    Nothing: () => b,\n    Just: (a) => b\n  }) => b\n \n',
  'stability': 'deprecated'
}), __metamagical_withMeta(_adtMethods['fold'], {
  'name': 'fold',
  'source': '{\n    /*~*/\n    Nothing: function(transformNothing, transformJust) {\n      assertFunction(\'Maybe.Nothing#fold\', transformNothing);\n      assertFunction(\'Maybe.Nothing#fold\', transformJust);\n      return transformNothing();\n    },\n\n    /*~*/\n    Just: function(transformNothing, transformJust) {\n      assertFunction(\'Maybe.Just#fold\', transformNothing);\n      assertFunction(\'Maybe.Just#fold\', transformJust);\n      return transformJust(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Maybe a).(() => b, (a) => b) => b\n \n'
}), __metamagical_withMeta(_adtMethods['filter'], {
  'name': 'filter',
  'source': '{\n    /*~*/\n    Nothing: function filter(predicate) {\n      assertFunction(\'Maybe.Nothing#filter\', predicate);\n      return this;\n    },\n\n    /*~*/\n    Just: function filter(predicate) {\n      assertFunction(\'Maybe.Just#filter\', predicate);\n      return predicate(this.value) ? this : Nothing();\n    }\n  }',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 57,
      'column': 18
    },
    'end': {
      'line': 265,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a: (Maybe a).((a) => Boolean) => Maybe a\n \n'
}), _adtMethods));

Object.assign(Maybe, (_Object$assign = {
  of: function of(value) {
    return _Just(value);
  },
  empty: function empty() {
    return Nothing();
  },
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },
  toResult: function toResult(fallbackValue) {
    return require('../conversions/maybe-to-result')(this, fallbackValue);
  },
  toValidation: function toValidation(fallbackValue) {
    return require('../conversions/maybe-to-validation')(this, fallbackValue);
  }
}, __metamagical_withMeta(_Object$assign['of'], {
  'name': 'of',
  'source': 'of(value) {\n    return Just(value);\n  }',
  'signature': 'of(value)',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 268,
      'column': 21
    },
    'end': {
      'line': 321,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a: (a) => Maybe a\n \n'
}), __metamagical_withMeta(_Object$assign['empty'], {
  'name': 'empty',
  'source': 'empty() {\n    return Nothing();\n  }',
  'signature': 'empty()',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 268,
      'column': 21
    },
    'end': {
      'line': 321,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['@diasbruno'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'category': 'Constructing funtion',
  'type': 'forall a: () => Maybe a\n \n'
}), __metamagical_withMeta(_Object$assign['get'], {
  'name': 'get',
  'source': '\'get\'() {\n    warnDeprecation(\'`.get()` is deprecated, and has been renamed to `.unsafeGet()`.\');\n    return this.unsafeGet();\n  }',
  'signature': 'get()',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 268,
      'column': 21
    },
    'end': {
      'line': 321,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'deprecated': {
    'since': '2.0.0',
    'replacedBy': '.unsafeGet()'
  },
  'type': 'forall a: (Maybe a).() => a :: (throws TypeError)\n \n',
  'stability': 'deprecated'
}), __metamagical_withMeta(_Object$assign['toResult'], {
  'name': 'toResult',
  'source': 'toResult(fallbackValue) {\n    return require(\'folktale/conversions/maybe-to-result\')(this, fallbackValue);  \n  }',
  'signature': 'toResult(fallbackValue)',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 268,
      'column': 21
    },
    'end': {
      'line': 321,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Maybe a).(b) => Result b a\n \n'
}), __metamagical_withMeta(_Object$assign['toValidation'], {
  'name': 'toValidation',
  'source': 'toValidation(fallbackValue) {\n    return require(\'folktale/conversions/maybe-to-validation\')(this, fallbackValue);\n  }',
  'signature': 'toValidation(fallbackValue)',
  'location': {
    'filename': 'source/maybe/maybe.js',
    'start': {
      'line': 268,
      'column': 21
    },
    'end': {
      'line': 321,
      'column': 1
    }
  },
  'module': 'folktale/maybe/maybe',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Maybe a).(b) => Result b a\n \n'
}), _Object$assign));

provideAliases(_Just.prototype);
provideAliases(Nothing.prototype);
provideAliases(Maybe);

module.exports = Maybe;