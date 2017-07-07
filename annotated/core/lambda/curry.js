"use strict";

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any...) => 'a) => Any... => 'a or ((Any...) => 'a)
 */
var curry = __metamagical_withMeta(function (arity, fn) {
  var curried = function curried(oldArgs) {
    return function () {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      var allArgs = oldArgs.concat(newArgs);
      var argCount = allArgs.length;

      return argCount < arity ? curried(allArgs) : /* otherwise */fn.apply(undefined, _toConsumableArray(allArgs));
    };
  };

  return curried([]);
}, {
  "name": "curry",
  "source": "(arity, fn) => {\n  const curried = (oldArgs) => (...newArgs) => {\n    const allArgs  = oldArgs.concat(newArgs);\n    const argCount = allArgs.length;\n\n    return argCount < arity   ?  curried(allArgs)\n    :      /* otherwise */       fn(...allArgs);\n  };\n\n  return curried([]);\n}",
  "signature": "curry(arity, fn)",
  "location": {
    "filename": "source/core/lambda/curry.js",
    "start": {
      "line": 18,
      "column": 0
    },
    "end": {
      "line": 28,
      "column": 2
    }
  },
  "module": "folktale/core/lambda/curry",
  "licence": "MIT",
  "authors": ["Quildreen Motta"],
  "repository": "https://github.com/origamitower/folktale",
  "npmPackage": "folktale",
  "copyright": "(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS",
  "maintainers": ["Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)"],
  "stability": "experimental",
  "type": "(Number, (Any...) => 'a) => Any... => 'a or ((Any...) => 'a)\n"
});

// --[ Exports ]-------------------------------------------------------
module.exports = curry;