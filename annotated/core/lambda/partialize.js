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

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var hole = {};

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any... => Any)) => ((hole | Any)...) => Any :: (throw TypeError)
 */
var partialize = __metamagical_withMeta(function (arity, fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //  eslint-disable-line max-statements
    /* eslint-disable no-magic-numbers */
    if (args.length < arity) {
      throw new TypeError("The partial function takes at least " + arity + " arguments, but was given " + args.length + ".");
    }

    // Figure out if we have holes
    var holes = 0;
    for (var i = 0; i < args.length; ++i) {
      if (args[i] === hole) {
        holes += 1;
      }
    }

    if (holes > 0) {
      return partialize(holes, function () {
        // eslint-disable-line max-statements
        var realArgs = []; // eslint-disable-line prefer-const
        var argIndex = 0;

        for (var _i = 0; _i < args.length; ++_i) {
          var arg = args[_i];
          if (arg === hole) {
            realArgs.push(arguments.length <= argIndex ? undefined : arguments[argIndex]);
            argIndex += 1;
          } else {
            realArgs.push(arg);
          }
        }

        return fn.apply(undefined, realArgs);
      });
    } else {
      return fn.apply(undefined, args);
    }
  };
}, {
  "name": "partialize",
  "source": "(arity, fn) => (...args) => {    //  eslint-disable-line max-statements\n  /* eslint-disable no-magic-numbers */\n  if (args.length < arity) {\n    throw new TypeError(`The partial function takes at least ${arity} arguments, but was given ${args.length}.`);\n  }\n\n  // Figure out if we have holes\n  let holes = 0;\n  for (let i = 0; i < args.length; ++i) {\n    if (args[i] === hole) {\n      holes += 1;\n    }\n  }\n\n\n  if (holes > 0) {\n    return partialize(holes, (...newArgs) => {    // eslint-disable-line max-statements\n      let realArgs = [];    // eslint-disable-line prefer-const\n      let argIndex = 0;\n\n      for (let i = 0; i < args.length; ++i) {\n        const arg = args[i];\n        if (arg === hole) {\n          realArgs.push(newArgs[argIndex]);\n          argIndex += 1;\n        } else {\n          realArgs.push(arg);\n        }\n      }\n\n      return fn(...realArgs);\n    });\n  } else {\n    return fn(...args);\n  }\n}",
  "signature": "partialize(arity, fn)",
  "location": {
    "filename": "source/core/lambda/partialize.js",
    "start": {
      "line": 21,
      "column": 0
    },
    "end": {
      "line": 56,
      "column": 2
    }
  },
  "module": "folktale/core/lambda/partialize",
  "licence": "MIT",
  "authors": ["Quildreen Motta"],
  "repository": "https://github.com/origamitower/folktale",
  "npmPackage": "folktale",
  "copyright": "(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS",
  "maintainers": ["Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)"],
  "stability": "experimental",
  "type": "(Number, (Any... => Any)) => ((hole | Any)...) => Any :: (throw TypeError)\n"
}); /* eslint-enable no-magic-numbers */

// ---[ Special Values ]-----------------------------------------------
/*~ stability: experimental */
partialize.hole = __metamagical_withMeta(hole, {
  "name": "hole",
  "source": "hole",
  "belongsTo": function belongsTo() {
    return partialize;
  },
  "stability": "experimental"
});

// --[ Exports ]-------------------------------------------------------
module.exports = partialize;