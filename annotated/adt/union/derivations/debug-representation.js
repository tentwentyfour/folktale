'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

// --[ Dependencies ]---------------------------------------------------
var _require = require('../union'),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

// --[ Helpers ]--------------------------------------------------------
/*~
 * type: (Object Any) => String
 */


var objectToKeyValuePairs = __metamagical_withMeta(function (object) {
  return Object.keys(object).map(function (key) {
    return key + ': ' + showValue(object[key]);
  }).join(', ');
}, {
  'name': 'objectToKeyValuePairs',
  'source': '(object) =>\n  Object.keys(object)\n        .map((key) => `${key}: ${showValue(object[key])}`)\n        .join(\', \')',
  'signature': 'objectToKeyValuePairs(object)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 18,
      'column': 0
    },
    'end': {
      'line': 21,
      'column': 20
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Object Any) => String'
});

/*~
 * type: (Object Any).() => String
 */
var plainObjectToString = __metamagical_withMeta(function () {
  return '{ ' + objectToKeyValuePairs(this) + ' }';
}, {
  'name': 'plainObjectToString',
  'source': 'function() {\n  return `{ ${objectToKeyValuePairs(this)} }`;\n}',
  'signature': 'plainObjectToString()',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 26,
      'column': 0
    },
    'end': {
      'line': 28,
      'column': 2
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Object Any).() => String'
});

/*~
 * type: (Array Any).() => String
 */
var arrayToString = __metamagical_withMeta(function () {
  return '[' + this.map(showValue).join(', ') + ']';
}, {
  'name': 'arrayToString',
  'source': 'function() {\n  return `[${this.map(showValue).join(\', \')}]`;\n}',
  'signature': 'arrayToString()',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 33,
      'column': 0
    },
    'end': {
      'line': 35,
      'column': 2
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Array Any).() => String'
});

/*~
 * type: (Function) => String
 */
var functionNameToString = __metamagical_withMeta(function (fn) {
  return fn.name !== '' ? ': ' + fn.name : '';
}, {
  'name': 'functionNameToString',
  'source': '(fn) => fn.name !== \'\' ? `: ${fn.name}` : \'\'',
  'signature': 'functionNameToString(fn)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 40,
      'column': 0
    },
    'end': {
      'line': 40,
      'column': 74
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Function) => String'
});

/*~
 * type: (Function) => String
 */
var functionToString = __metamagical_withMeta(function (fn) {
  return '[Function' + functionNameToString(fn) + ']';
}, {
  'name': 'functionToString',
  'source': '(fn) => `[Function${functionNameToString(fn)}]`',
  'signature': 'functionToString(fn)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 45,
      'column': 0
    },
    'end': {
      'line': 45,
      'column': 73
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Function) => String'
});

/*~
 * type: () => String
 */
var nullToString = __metamagical_withMeta(function () {
  return 'null';
}, {
  'name': 'nullToString',
  'source': '() => \'null\'',
  'signature': 'nullToString()',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 50,
      'column': 0
    },
    'end': {
      'line': 50,
      'column': 34
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '() => String'
});

/*~
 * type: (Null | Object Any) => String
 */
var objectToString = __metamagical_withMeta(function (object) {
  return object === null ? nullToString : Array.isArray(object) ? arrayToString : object.toString() === {}.toString() ? plainObjectToString : /* otherwise */object.toString;
}, {
  'name': 'objectToString',
  'source': '(object) =>\n    object === null                       ?  nullToString\n  : Array.isArray(object)                 ?  arrayToString\n  : object.toString() === ({}).toString() ?  plainObjectToString\n  : /* otherwise */                          object.toString',
  'signature': 'objectToString(object)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 55,
      'column': 0
    },
    'end': {
      'line': 59,
      'column': 61
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Null | Object Any) => String'
});

/*~
 * type: (Any) => String
 */
var showValue = __metamagical_withMeta(function (value) {
  return typeof value === 'undefined' ? 'undefined' : typeof value === 'function' ? functionToString(value) : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' ? value.toString() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? objectToString(value).call(value) : /* otherwise */JSON.stringify(value);
}, {
  'name': 'showValue',
  'source': '(value) =>\n    typeof value === \'undefined\' ?  \'undefined\'\n  : typeof value === \'function\'  ?  functionToString(value)\n  : typeof value === \'symbol\'    ?  value.toString()\n  : typeof value === \'object\'    ?  objectToString(value).call(value)\n  : /* otherwise */                 JSON.stringify(value)',
  'signature': 'showValue(value)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 65,
      'column': 0
    },
    'end': {
      'line': 70,
      'column': 58
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'type': '(Any) => String'
});

// --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, Union) => Void
 */
var debugRepresentation = __metamagical_withMeta(function (variant, adt) {
  // eslint-disable-line max-statements
  var typeName = adt[typeSymbol];
  var variantName = adt[typeSymbol] + '.' + variant.prototype[tagSymbol];

  // (for Object.prototype.toString)
  adt[Symbol.toStringTag] = typeName;
  variant.prototype[Symbol.toStringTag] = variantName;

  // (regular JavaScript representations)
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  adt.toString = __metamagical_withMeta(function () {
    return typeName;
  }, {
    'name': 'toString',
    'source': '() => typeName',
    'signature': 'toString()',
    'belongsTo': function belongsTo() {
      return adt;
    },
    'stability': 'experimental',
    'module': null,
    'authors': ['@boris-marinov'],
    'type': '() => String\n \n'
  });

  /*~
   * stability: experimental
   * mmodule: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */
  variant.toString = __metamagical_withMeta(function () {
    return variantName;
  }, {
    'name': 'toString',
    'source': '() => variantName',
    'signature': 'toString()',
    'belongsTo': function belongsTo() {
      return variant;
    },
    'stability': 'experimental',
    'mmodule': null,
    'authors': ['@boris-marinov'],
    'type': '() => String\n \n'
  });

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   (Union).() => String
   */
  variant.prototype.toString = __metamagical_withMeta(function () {
    return variantName + '(' + plainObjectToString.call(this) + ')';
  }, {
    'name': 'toString',
    'source': 'function() {\n    return `${variantName}(${plainObjectToString.call(this)})`;\n  }',
    'signature': 'toString()',
    'belongsTo': function belongsTo() {
      return variant.prototype;
    },
    'stability': 'experimental',
    'module': null,
    'authors': ['@boris-marinov'],
    'type': '(Union).() => String\n \n'
  });

  // (Node REPL representations)
  adt.inspect = adt.toString;
  variant.inspect = variant.toString;
  variant.prototype.inspect = variant.prototype.toString;

  return variant;
}, {
  'name': 'debugRepresentation',
  'source': '(variant, adt) => {  // eslint-disable-line max-statements\n  const typeName    = adt[typeSymbol];\n  const variantName = `${adt[typeSymbol]}.${variant.prototype[tagSymbol]}`;\n\n  // (for Object.prototype.toString)\n  adt[Symbol.toStringTag]               = typeName;\n  variant.prototype[Symbol.toStringTag] = variantName;\n\n  // (regular JavaScript representations)\n  /*~\n   * stability: experimental\n   * module: null\n   * authors:\n   *   - "@boris-marinov"\n   * \n   * type: |\n   *   () => String\n   */\n  adt.toString = () => typeName;\n\n  /*~\n   * stability: experimental\n   * mmodule: null\n   * authors:\n   *   - "@boris-marinov"\n   * \n   * type: |\n   *   () => String\n   */\n  variant.toString = () => variantName;\n\n  /*~\n   * stability: experimental\n   * module: null\n   * authors:\n   *   - "@boris-marinov"\n   * \n   * type: |\n   *   (Union).() => String\n   */\n  variant.prototype.toString = function() {\n    return `${variantName}(${plainObjectToString.call(this)})`;\n  };\n\n  // (Node REPL representations)\n  adt.inspect                = adt.toString;\n  variant.inspect            = variant.toString;\n  variant.prototype.inspect  = variant.prototype.toString;\n\n  return variant;\n}',
  'signature': 'debugRepresentation(variant, adt)',
  'location': {
    'filename': 'source/adt/union/derivations/debug-representation.js',
    'start': {
      'line': 82,
      'column': 0
    },
    'end': {
      'line': 132,
      'column': 2
    }
  },
  'module': 'folktale/adt/union/derivations/debug-representation',
  'licence': 'MIT',
  'authors': ['@boris-marinov'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': '(Variant, Union) => Void\n'
});

// --[ Exports ]-------------------------------------------------------
module.exports = debugRepresentation;