'use strict';

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

var Result = union('folktale:Result', {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (a) => Result a b
   */
  Error: function Error(value) {
    return { value: value };
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  Ok: function Ok(value) {
    return { value: value };
  }
}).derive(equality, debugRepresentation, serialization);

var Error = Result.Error,
    Ok = Result.Ok;


var assertResult = assertType(Result);

extend(Error.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Error');
  }
});

extend(Ok.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Ok');
  }
});

/*~
 * ~belongsTo: Result
 */
adtMethods(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => c) => Result a c
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a ((b) => c)).(Result a b) => Result a c
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => Result a c) => Result a c
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => b :: throws TypeError
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).(b) => b
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => Result c b) => Result c b
   */
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

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).(Result a b) => Result a b
   *   where b is Semigroup
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c, (b) => c) => c
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Result b a
   */
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

  /*~
   * stability: experimental
   * type: |
   *   (Result a b).((a) => c, (b) => d) => Result c d
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c) => Result c b
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
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
});

Object.assign(Result, {
  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (b) => Result a b
   */
  of: function of(value) {
    return Ok(value);
  },


  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a, b: (Result a b).() => b :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Validation a b
   */
  toValidation: function toValidation() {
    return require('../conversions/result-to-validation')(this);
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Result a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return require('../conversions/result-to-maybe')(this);
  }
});

provideAliases(Error.prototype);
provideAliases(Ok.prototype);
provideAliases(Result);

module.exports = Result;