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

var Validation = __metamagical_withMeta(union('folktale:Validation', (_union = {
  Failure: function Failure(value) {
    return { value: value };
  },
  Success: function Success(value) {
    return { value: value };
  }
}, __metamagical_withMeta(_union['Failure'], {
  'name': 'Failure',
  'source': 'Failure(value) { \n    return { value };\n  }',
  'signature': 'Failure(value)',
  'belongsTo': function belongsTo() {
    return Validation;
  },
  'type': 'forall a, b: (a) => Validation a b\n \n'
}), __metamagical_withMeta(_union['Success'], {
  'name': 'Success',
  'source': 'Success(value) { \n    return { value };\n  }',
  'signature': 'Success(value)',
  'belongsTo': function belongsTo() {
    return Validation;
  },
  'type': 'forall a, b: (b) => Validation a b\n \n'
}), _union)).derive(equality, debugRepresentation, serialization), {
  'name': 'Validation',
  'source': 'union(\'folktale:Validation\', {\n  /*~\n   * type: |\n   *   forall a, b: (a) => Validation a b\n   */\n  Failure(value) { \n    return { value };\n  },\n\n  /*~\n   * type: |\n   *   forall a, b: (b) => Validation a b\n   */\n  Success(value) { \n    return { value };\n  }\n}).derive(equality, debugRepresentation, serialization)',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 22,
      'column': 0
    },
    'end': {
      'line': 38,
      'column': 56
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental'
});

var Success = Validation.Success,
    Failure = Validation.Failure;

var assertValidation = assertType(Validation);

extend(Failure.prototype, (_extend = {
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Failure');
  }

}, __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend, 'value').get, {
  'name': 'value',
  'source': 'get value() {\n    throw new TypeError(\'`value` can\u2019t be accessed in an abstract instance of Validation.Failure\');\n  }',
  'signature': 'get value()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 45,
      'column': 26
    },
    'end': {
      'line': 54,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'forall a, b: get (Validation a b) => a\n \n'
}), _extend));

extend(Success.prototype, (_extend2 = {
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Success');
  }

}, __metamagical_withMeta(Object.getOwnPropertyDescriptor(_extend2, 'value').get, {
  'name': 'value',
  'source': 'get value() {\n    throw new TypeError(\'`value` can\u2019t be accessed in an abstract instance of Validation.Success\');\n  }',
  'signature': 'get value()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 57,
      'column': 26
    },
    'end': {
      'line': 66,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isRequired': true,
  'type': 'forall a, b: get (Validation a b) => b\n \n'
}), _extend2));

/*~~belongsTo: Validation */
adtMethods(Validation, (_adtMethods = {
  map: {
    /*~*/
    Failure: function map(transformation) {
      assertFunction('Validation.Failure#map', transformation);
      return this;
    },

    /*~*/
    Success: function map(transformation) {
      assertFunction('Validation.Success#map', transformation);
      return Success(transformation(this.value));
    }
  },
  apply: {
    /*~*/
    Failure: function apply(aValidation) {
      assertValidation('Failure#apply', aValidation);
      return Failure.hasInstance(aValidation) ? Failure(this.value.concat(aValidation.value)) : /* otherwise */this;
    },

    /*~*/
    Success: function apply(aValidation) {
      assertValidation('Success#apply', aValidation);
      return Failure.hasInstance(aValidation) ? aValidation : /* otherwise */aValidation.map(this.value);
    }
  },
  unsafeGet: {
    /*~*/
    Failure: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Failure.\n\n    Failure does not contain a normal value - it contains an error.\n    You might consider switching from Validation#get to Validation#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Success: function unsafeGet() {
      return this.value;
    }
  },
  getOrElse: {
    /*~*/
    Failure: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Success: function getOrElse(_default) {
      return this.value;
    }
  },
  orElse: {
    /*~*/
    Failure: function orElse(handler) {
      assertFunction('Validation.Failure#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Success: function orElse(handler) {
      assertFunction('Validation.Success#orElse', handler);
      return this;
    }
  },
  concat: {
    /*~*/
    Failure: function concat(aValidation) {
      assertValidation('Validation.Failure#concat', aValidation);
      if (Failure.hasInstance(aValidation)) {
        return Failure(this.value.concat(aValidation.value));
      } else {
        return this;
      }
    },

    /*~*/
    Success: function concat(aValidation) {
      assertValidation('Validation.Success#concat', aValidation);
      return aValidation;
    }
  },
  fold: {
    /*~*/
    Failure: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return failureTransformation(this.value);
    },

    /*~*/
    Success: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return successTransformation(this.value);
    }
  },
  swap: {
    /*~*/
    Failure: function swap() {
      return Success(this.value);
    },

    /*~*/
    Success: function swap() {
      return Failure(this.value);
    }
  },
  bimap: {
    /*~*/
    Failure: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return Failure(failureTransformation(this.value));
    },

    /*~*/
    Success: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return Success(successTransformation(this.value));
    }
  },
  mapFailure: {
    /*~*/
    Failure: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return Failure(transformation(this.value));
    },

    /*~*/
    Success: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return this;
    }
  }
}, __metamagical_withMeta(_adtMethods['map'], {
  'name': 'map',
  'source': '{\n    /*~*/\n    Failure: function map(transformation) {\n      assertFunction(\'Validation.Failure#map\', transformation);\n      return this;\n    },\n\n    /*~*/\n    Success: function map(transformation) {\n      assertFunction(\'Validation.Success#map\', transformation);\n      return Success(transformation(this.value));\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c: (Validation a b).((b) => c) => Validation a c\n \n'
}), __metamagical_withMeta(_adtMethods['apply'], {
  'name': 'apply',
  'source': '{\n    /*~*/\n    Failure: function apply(aValidation) {\n      assertValidation(\'Failure#apply\', aValidation);\n      return Failure.hasInstance(aValidation) ? Failure(this.value.concat(aValidation.value))\n      :      /* otherwise */                    this;\n    },\n\n    /*~*/\n    Success: function apply(aValidation) {\n      assertValidation(\'Success#apply\', aValidation);\n      return Failure.hasInstance(aValidation) ? aValidation\n      :      /* otherwise */                    aValidation.map(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c: (Validation (b) => c).(Validation a b) => Validation a c\n \n'
}), __metamagical_withMeta(_adtMethods['unsafeGet'], {
  'name': 'unsafeGet',
  'source': '{\n    /*~*/\n    Failure: function unsafeGet() {\n      throw new TypeError(`Can\'t extract the value of a Failure.\n\n    Failure does not contain a normal value - it contains an error.\n    You might consider switching from Validation#get to Validation#getOrElse, or some other method\n    that is not partial.\n      `);\n    },\n\n    /*~*/\n    Success: function unsafeGet() {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => b :: throws TypeError\n \n'
}), __metamagical_withMeta(_adtMethods['getOrElse'], {
  'name': 'getOrElse',
  'source': '{\n    /*~*/\n    Failure: function getOrElse(_default) {\n      return _default;\n    },\n\n    /*~*/\n    Success: function getOrElse(_default) {\n      return this.value;\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).(b) => b\n \n'
}), __metamagical_withMeta(_adtMethods['orElse'], {
  'name': 'orElse',
  'source': '{\n    /*~*/\n    Failure: function orElse(handler) {\n      assertFunction(\'Validation.Failure#orElse\', handler);\n      return handler(this.value);\n    },\n\n    /*~*/\n    Success: function orElse(handler) {\n      assertFunction(\'Validation.Success#orElse\', handler);\n      return this;\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c:\n  (Validation a b).((a) => Validation c b) => Validation c b\n \n'
}), __metamagical_withMeta(_adtMethods['concat'], {
  'name': 'concat',
  'source': '{\n    /*~*/\n    Failure: function concat(aValidation) {\n      assertValidation(\'Validation.Failure#concat\', aValidation);\n      if (Failure.hasInstance(aValidation)) {\n        return Failure(this.value.concat(aValidation.value));\n      } else {\n        return this;\n      }\n    },\n\n    /*~*/\n    Success: function concat(aValidation) {\n      assertValidation(\'Validation.Success#concat\', aValidation);\n      return aValidation;\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b:\n  (Validation a b).(Validation a b) => Validation a b\nwhere a is Semigroup\n \n'
}), __metamagical_withMeta(_adtMethods['fold'], {
  'name': 'fold',
  'source': '{\n    /*~*/\n    Failure: function fold(failureTransformation, successTransformation) {\n      assertFunction(\'Validation.Failure#fold\', failureTransformation);\n      assertFunction(\'Validation.Failure#fold\', successTransformation);\n      return failureTransformation(this.value);\n    },\n\n    /*~*/\n    Success: function fold(failureTransformation, successTransformation) {\n      assertFunction(\'Validation.Success#fold\', failureTransformation);\n      assertFunction(\'Validation.Success#fold\', successTransformation);\n      return successTransformation(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c:\n  (Validation a b).((a) => c, (b) => c) => c\n \n'
}), __metamagical_withMeta(_adtMethods['swap'], {
  'name': 'swap',
  'source': '{\n    /*~*/\n    Failure: function swap() {\n      return Success(this.value);\n    },\n\n    /*~*/\n    Success: function swap() {\n      return Failure(this.value);\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => Validation b a\n \n'
}), __metamagical_withMeta(_adtMethods['bimap'], {
  'name': 'bimap',
  'source': '{\n    /*~*/\n    Failure: function bimap(failureTransformation, successTransformation) {\n      assertFunction(\'Validation.Failure#fold\', failureTransformation);\n      assertFunction(\'Validation.Failure#fold\', successTransformation);\n      return Failure(failureTransformation(this.value));\n    },\n\n    /*~*/\n    Success: function bimap(failureTransformation, successTransformation) {\n      assertFunction(\'Validation.Success#fold\', failureTransformation);\n      assertFunction(\'Validation.Success#fold\', successTransformation);\n      return Success(successTransformation(this.value));\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c, d:\n  (Validation a b).((a) => c, (b) => d) => Validation c d\n \n'
}), __metamagical_withMeta(_adtMethods['mapFailure'], {
  'name': 'mapFailure',
  'source': '{\n    /*~*/\n    Failure: function mapFailure(transformation) {\n      assertFunction(\'Validation.Failure#mapFailure\', transformation);\n      return Failure(transformation(this.value));\n    },\n\n    /*~*/\n    Success: function mapFailure(transformation) {\n      assertFunction(\'Validation.Failure#mapFailure\', transformation);\n      return this;\n    }\n  }',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 70,
      'column': 23
    },
    'end': {
      'line': 273,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b, c:\n  (Validation a b).((a) => c) Validation c b\n \n'
}), _adtMethods));

Object.assign(Validation, (_Object$assign = {
  of: function of(value) {
    return Success(value);
  },
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },
  merge: function merge() {
    return this.value;
  },
  toResult: function toResult() {
    return require('../conversions/validation-to-result')(this);
  },
  toMaybe: function toMaybe() {
    return require('../conversions/validation-to-maybe')(this);
  }
}, __metamagical_withMeta(_Object$assign['of'], {
  'name': 'of',
  'source': 'of(value) {\n    return Success(value);\n  }',
  'signature': 'of(value)',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 276,
      'column': 26
    },
    'end': {
      'line': 317,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (b) => Validation a b\n \n'
}), __metamagical_withMeta(_Object$assign['get'], {
  'name': 'get',
  'source': '\'get\'() {\n    warnDeprecation(\'`.get()` is deprecated, and has been renamed to `.unsafeGet()`.\');\n    return this.unsafeGet();\n  }',
  'signature': 'get()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 276,
      'column': 26
    },
    'end': {
      'line': 317,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => b :: throws TypeError\n \n'
}), __metamagical_withMeta(_Object$assign['merge'], {
  'name': 'merge',
  'source': 'merge() {\n    return this.value;\n  }',
  'signature': 'merge()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 276,
      'column': 26
    },
    'end': {
      'line': 317,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => a or b\n \n'
}), __metamagical_withMeta(_Object$assign['toResult'], {
  'name': 'toResult',
  'source': 'toResult() {\n    return require(\'folktale/conversions/validation-to-result\')(this);\n  }',
  'signature': 'toResult()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 276,
      'column': 26
    },
    'end': {
      'line': 317,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => Result a b\n \n'
}), __metamagical_withMeta(_Object$assign['toMaybe'], {
  'name': 'toMaybe',
  'source': 'toMaybe() {\n    return require(\'folktale/conversions/validation-to-maybe\')(this);\n  }',
  'signature': 'toMaybe()',
  'location': {
    'filename': 'source/validation/validation.js',
    'start': {
      'line': 276,
      'column': 26
    },
    'end': {
      'line': 317,
      'column': 1
    }
  },
  'module': 'folktale/validation/validation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': 'forall a, b: (Validation a b).() => Maybe b\n \n'
}), _Object$assign));

provideAliases(Success.prototype);
provideAliases(Failure.prototype);
provideAliases(Validation);

module.exports = Validation;