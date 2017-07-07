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
var warnDeprecation = require('../helpers/warn-deprecation');
var adtMethods = require('../helpers/define-adt-methods');
var extend = require('../helpers/extend');

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;

/*~ stability: stable */

var Maybe = union('folktale:Maybe', {
  /*~
   * type: |
   *   forall a: () => Maybe a
   */
  Nothing: function Nothing() {},


  /*~
   * type: |
   *   forall a: (a) => Maybe a
   */
  Just: function Just(value) {
    return { value: value };
  }
}).derive(equality, debugRepresentation, serialization);

var Nothing = Maybe.Nothing,
    _Just = Maybe.Just;

var assertMaybe = assertType(Maybe);

extend(_Just.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a: get (Maybe a) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Maybe.Just');
  }
});

/*~~belongsTo: Maybe */
adtMethods(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => b) => Maybe b
   */
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

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe (a) => b).(Maybe a) => Maybe b
   */
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

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => Maybe b) => Maybe b
   */
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

  /*~
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
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

  /*~
   * type: |
   *   forall a: (Maybe a).(a) => a
   */
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

  /*~
   * type: |
   *   forall a: (Maybe a).((a) => Maybe a) => Maybe a
   */
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

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: (Maybe a).(Maybe a) => Maybe a
   *   where a is Semigroup
   */
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

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .matchWith(pattern)
   * 
   * type: |
   *   forall a, b:
   *     (Maybe a).({
   *       Nothing: () => b,
   *       Just: (a) => b
   *     }) => b
   */
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

  /*~
   * type: |
   *   forall a, b: (Maybe a).(() => b, (a) => b) => b
   */
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

  /*~
   * stability: experimental
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
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
});

Object.assign(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a: (a) => Maybe a
   */
  of: function of(value) {
    return _Just(value);
  },


  /*~
   * category: Constructing funtion
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: () => Maybe a
   */
  empty: function empty() {
    return Nothing();
  },


  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toResult: function toResult(fallbackValue) {
    return require('../conversions/maybe-to-result')(this, fallbackValue);
  },


  /*~
   * stability: experimental
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toValidation: function toValidation(fallbackValue) {
    return require('../conversions/maybe-to-validation')(this, fallbackValue);
  }
});

provideAliases(_Just.prototype);
provideAliases(Nothing.prototype);
provideAliases(Maybe);

module.exports = Maybe;