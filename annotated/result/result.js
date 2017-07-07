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
    _extend2,
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
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');
var warnDeprecation = require('../helpers/warn-deprecation');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: experimental */

var Result = __metamagical_withMeta(union('folktale:Result', (_union = {
  Error: function Error(value) {
    return { value: value };
  },
  Ok: function Ok(value) {
    return { value: value };
  }
}, __metamagical_withMeta(_union['Error'], {
  'name': 'Error',
  'source': 'Error(value) {\n    return { value };\n  }',
  'signature': 'Error(value)',
  'belongsTo': function belongsTo() {
    return Result;
  },
  'stability': 'experimental',
  'type': 'forall a, b: (a) => Result a b\n \n'
}), __metamagical_withMeta(_union['Ok'], {
  'name': 'Ok',
  'source': 'Ok(value) {\n    return { value };\n  }',
  'signature': 'Ok(value)',
  'belongsTo': function belongsTo() {
    return Result;
  },
  'stability': 'experimental',
  'type': 'forall a, b: (b) => Result a b\n \n'
}), _union)).derive(equality, debugRepresentation, serialization), {
  'name': 'Result',
  'source': 'union(\'folktale:Result\', {\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall a, b: (a) => Result a b\n   */\n  Error(value) {\n    return { value };\n  },\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall a, b: (b) => Result a b\n   */\n  Ok(value) {\n    return { value };\n  }\n}).derive(equality, debugRepresentation, serialization)',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 22,
      'column': 0
    },
    'end': {
      'line': 40,
      'column': 56
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

var Error = Result.Error,
    Ok = Result.Ok;


var assertResult = assertType(Result);

extend(Error.prototype, (_extend = {
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Error');
  }

}, __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend, 'value').get, {
  'name': 'value',
  'source': 'get value() {\n    throw new TypeError(\'`value` can\u2019t be accessed in an abstract instance of Result.Error\');\n  }',
  'signature': 'get value()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 48,
      'column': 24
    },
    'end': {
      'line': 57,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'forall a, b: get (Result a b) => a\n \n'
}), _extend));

extend(Ok.prototype, (_extend2 = {
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Ok');
  }

}, __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend2, 'value').get, {
  'name': 'value',
  'source': 'get value() {\n    throw new TypeError(\'`value` can\u2019t be accessed in an abstract instance of Result.Ok\');\n  }',
  'signature': 'get value()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 60,
      'column': 21
    },
    'end': {
      'line': 69,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'forall a, b: get (Result a b) => b\n \n'
}), _extend2));

/*~
 * ~belongsTo: Result
 */
adtMethods(Result, (_adtMethods = {
  map: {
    /*~*/
    Error: function map(f) {
      assertFunction('Result.Error#map', f);
      return this;
    },

    /*~*/
    Ok: function map(f) {
      assertFunction('Result.Ok#map', f);
      return Ok(f(this.value));
    }
  },
  apply: {
    /*~*/
    Error: function apply(anResult) {
      assertResult('Result.Error#apply', anResult);
      return this;
    },

    /*~*/
    Ok: function apply(anResult) {
      assertResult('Result.Ok#apply', anResult);
      return anResult.map(this.value);
    }
  },
  chain: {
    /*~*/
    Error: function chain(f) {
      assertFunction('Result.Error#chain', f);
      return this;
    },

    /*~*/
    Ok: function chain(f) {
      assertFunction('Result.Ok#chain', f);
      return f(this.value);
    }
  },
  unsafeGet: {
    /*~*/
    Error: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of an Error.\n\nError does not contain a normal value - it contains an error.\nYou might consider switching from Result#unsafeGet to Result#getOrElse,\nor some other method that is not partial.\n      ');
    },

    /*~*/
    Ok: function unsafeGet() {
      return this.value;
    }
  },
  getOrElse: {
    /*~*/
    Error: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Ok: function getOrElse(_default) {
      return this.value;
    }
  },
  orElse: {
    /*~*/
    Error: function orElse(handler) {
      assertFunction('Result.Error#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Ok: function orElse(handler) {
      assertFunction('Result.Ok#orElse', handler);
      return this;
    }
  },
  concat: {
    /*~*/
    Error: function concat(aResult) {
      assertResult('Result.Error#concat', aResult);
      return this;
    },

    /*~*/
    Ok: function concat(aResult) {
      var _this = this;

      assertResult('Result.Ok#concat', aResult);
      return aResult.map(function (xs) {
        return _this.value.concat(xs);
      });
    }
  },
  fold: {
    /*~*/
    Error: function fold(f, g) {
      assertFunction('Result.Error#fold', f);
      assertFunction('Result.Error#fold', g);
      return f(this.value);
    },

    /*~*/
    Ok: function fold(f, g) {
      assertFunction('Result.Ok#fold', f);
      assertFunction('Result.Ok#fold', g);
      return g(this.value);
    }
  },
  swap: {
    /*~*/
    Error: function swap() {
      return Ok(this.value);
    },

    /*~*/
    Ok: function swap() {
      return Error(this.value);
    }
  },
  bimap: {
    /*~*/
    Error: function bimap(f, g) {
      assertFunction('Result.Error#bimap', f);
      assertFunction('Result.Error#bimap', g);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function bimap(f, g) {
      assertFunction('Result.Ok#bimap', f);
      assertFunction('Result.Ok#bimap', g);
      return Ok(g(this.value));
    }
  },
  mapError: {
    /*~*/
    Error: function mapError(f) {
      assertFunction('Result.Error#mapError', f);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function mapError(f) {
      assertFunction('Result.Ok#mapError', f);
      return this;
    }
  },
  filter: {
    /*~*/
    Error: function filter(predicate) {
      assertFunction('Result.Error#filter', predicate);
      return this;
    },

    /*~*/
    Ok: function filter(predicate) {
      assertFunction('Result.Ok#filter', predicate);
      return predicate(this.value) ? this : Error();
    }
  }
}, __metamagical_withMeta(_adtMethods['map'], {
  'name': 'map',
  'source': '{\n    /*~*/\n    Error: function map(f) {\n      assertFunction(\'Result.Error#map\', f);\n      return this;\n    },\n\n    /*~*/\n    Ok: function map(f) {\n      assertFunction(\'Result.Ok#map\', f);\n      return Ok(f(this.value));\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a b).((b) => c) => Result a c\n \n'
}), __metamagical_withMeta(_adtMethods['apply'], {
  'name': 'apply',
  'source': '{\n    /*~*/\n    Error: function apply(anResult) {\n      assertResult(\'Result.Error#apply\', anResult);\n      return this;\n    },\n\n    /*~*/\n    Ok: function apply(anResult) {\n      assertResult(\'Result.Ok#apply\', anResult);\n      return anResult.map(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a ((b) => c)).(Result a b) => Result a c\n \n'
}), __metamagical_withMeta(_adtMethods['chain'], {
  'name': 'chain',
  'source': '{\n    /*~*/\n    Error: function chain(f) {\n      assertFunction(\'Result.Error#chain\', f);\n      return this;\n    },\n\n    /*~*/\n    Ok: function chain(f) {\n      assertFunction(\'Result.Ok#chain\', f);\n      return f(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a b).((b) => Result a c) => Result a c\n \n'
}), __metamagical_withMeta(_adtMethods['unsafeGet'], {
  'name': 'unsafeGet',
  'source': '{\n    /*~*/\n    Error: function unsafeGet() {\n      throw new TypeError(`Can\'t extract the value of an Error.\n\nError does not contain a normal value - it contains an error.\nYou might consider switching from Result#unsafeGet to Result#getOrElse,\nor some other method that is not partial.\n      `);\n    },\n\n    /*~*/\n    Ok: function unsafeGet() {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).() => b :: throws TypeError\n \n'
}), __metamagical_withMeta(_adtMethods['getOrElse'], {
  'name': 'getOrElse',
  'source': '{\n    /*~*/\n    Error: function getOrElse(_default) {\n      return _default;\n    },\n\n    /*~*/\n    Ok: function getOrElse(_default) {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).(b) => b\n \n'
}), __metamagical_withMeta(_adtMethods['orElse'], {
  'name': 'orElse',
  'source': '{\n    /*~*/\n    Error: function orElse(handler) {\n      assertFunction(\'Result.Error#orElse\', handler);\n      return handler(this.value);\n    },\n\n    /*~*/\n    Ok: function orElse(handler) {\n      assertFunction(\'Result.Ok#orElse\', handler);\n      return this;\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a b).((a) => Result c b) => Result c b\n \n'
}), __metamagical_withMeta(_adtMethods['concat'], {
  'name': 'concat',
  'source': '{\n    /*~*/\n    Error: function concat(aResult) {\n      assertResult(\'Result.Error#concat\', aResult);\n      return this;\n    },\n\n    /*~*/\n    Ok: function concat(aResult) {\n      assertResult(\'Result.Ok#concat\', aResult);\n      return aResult.map(xs => this.value.concat(xs));\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'stable',
  'type': 'forall a, b: (Result a b).(Result a b) => Result a b\nwhere b is Semigroup\n \n'
}), __metamagical_withMeta(_adtMethods['fold'], {
  'name': 'fold',
  'source': '{\n    /*~*/\n    Error: function fold(f, g) {\n      assertFunction(\'Result.Error#fold\', f);\n      assertFunction(\'Result.Error#fold\', g);\n      return f(this.value);\n    },\n\n    /*~*/\n    Ok: function fold(f, g) {\n      assertFunction(\'Result.Ok#fold\', f);\n      assertFunction(\'Result.Ok#fold\', g);\n      return g(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a b).((a) => c, (b) => c) => c\n \n'
}), __metamagical_withMeta(_adtMethods['swap'], {
  'name': 'swap',
  'source': '{\n    /*~*/\n    Error: function swap() {\n      return Ok(this.value);\n    },\n\n    /*~*/\n    Ok: function swap() {\n      return Error(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).() => Result b a\n \n'
}), __metamagical_withMeta(_adtMethods['bimap'], {
  'name': 'bimap',
  'source': '{\n    /*~*/\n    Error: function bimap(f, g) {\n      assertFunction(\'Result.Error#bimap\', f);\n      assertFunction(\'Result.Error#bimap\', g);\n      return Error(f(this.value));\n    },\n\n    /*~*/\n    Ok: function bimap(f, g) {\n      assertFunction(\'Result.Ok#bimap\', f);\n      assertFunction(\'Result.Ok#bimap\', g);\n      return Ok(g(this.value));\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Result a b).((a) => c, (b) => d) => Result c d\n \n'
}), __metamagical_withMeta(_adtMethods['mapError'], {
  'name': 'mapError',
  'source': '{\n    /*~*/\n    Error: function mapError(f) {\n      assertFunction(\'Result.Error#mapError\', f);\n      return Error(f(this.value));\n    },\n\n    /*~*/\n    Ok: function mapError(f) {\n      assertFunction(\'Result.Ok#mapError\', f);\n      return this;\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b, c:\n  (Result a b).((a) => c) => Result c b\n \n'
}), __metamagical_withMeta(_adtMethods['filter'], {
  'name': 'filter',
  'source': '{\n    /*~*/\n    Error: function filter(predicate) {\n      assertFunction(\'Result.Error#filter\', predicate);\n      return this;\n    },\n\n    /*~*/\n    Ok: function filter(predicate) {\n      assertFunction(\'Result.Ok#filter\', predicate);\n      return predicate(this.value) ? this : Error();\n    }\n  }',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 75,
      'column': 19
    },
    'end': {
      'line': 324,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a: (Maybe a).((a) => Boolean) => Maybe a\n \n'
}), _adtMethods));

Object.assign(Result, (_Object$assign = {
  of: function of(value) {
    return Ok(value);
  },
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },
  merge: function merge() {
    return this.value;
  },
  toValidation: function toValidation() {
    return require('../conversions/result-to-validation')(this);
  },
  toMaybe: function toMaybe() {
    return require('../conversions/result-to-maybe')(this);
  }
}, __metamagical_withMeta(_Object$assign['of'], {
  'name': 'of',
  'source': 'of(value) {\n    return Ok(value);\n  }',
  'signature': 'of(value)',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 327,
      'column': 22
    },
    'end': {
      'line': 376,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (b) => Result a b\n \n'
}), __metamagical_withMeta(_Object$assign['get'], {
  'name': 'get',
  'source': '\'get\'() {\n    warnDeprecation(\'`.get()` is deprecated, and has been renamed to `.unsafeGet()`.\');\n    return this.unsafeGet();\n  }',
  'signature': 'get()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 327,
      'column': 22
    },
    'end': {
      'line': 376,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
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
  'type': 'forall a, b: (Result a b).() => b :: (throws TypeError)\n \n',
  'stability': 'deprecated'
}), __metamagical_withMeta(_Object$assign['merge'], {
  'name': 'merge',
  'source': 'merge() {\n    return this.value;\n  }',
  'signature': 'merge()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 327,
      'column': 22
    },
    'end': {
      'line': 376,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).() => a or b\n \n'
}), __metamagical_withMeta(_Object$assign['toValidation'], {
  'name': 'toValidation',
  'source': 'toValidation() {\n    return require(\'folktale/conversions/result-to-validation\')(this);\n  }',
  'signature': 'toValidation()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 327,
      'column': 22
    },
    'end': {
      'line': 376,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).() => Validation a b\n \n'
}), __metamagical_withMeta(_Object$assign['toMaybe'], {
  'name': 'toMaybe',
  'source': 'toMaybe() {\n    return require(\'folktale/conversions/result-to-maybe\')(this);\n  }',
  'signature': 'toMaybe()',
  'location': {
    'filename': 'source/result/result.js',
    'start': {
      'line': 327,
      'column': 22
    },
    'end': {
      'line': 376,
      'column': 1
    }
  },
  'module': 'folktale/result/result',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall a, b: (Result a b).() => Maybe b\n \n'
}), _Object$assign));

provideAliases(Error.prototype);
provideAliases(Ok.prototype);
provideAliases(Result);

module.exports = Result;