"use strict";

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
var partialize = function partialize(arity, fn) {
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
}; /* eslint-enable no-magic-numbers */

// ---[ Special Values ]-----------------------------------------------
/*~ stability: experimental */
partialize.hole = hole;

// --[ Exports ]-------------------------------------------------------
module.exports = partialize;