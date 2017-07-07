'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Validation = require('./validation');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~ 
 * stability: stable
 * name: module folktale/validation
 */


module.exports = (_module$exports = {
  Success: Validation.Success,
  Failure: Validation.Failure,
  hasInstance: Validation.hasInstance,
  of: Validation.of,
  fromJSON: Validation.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Validation[typeSymbol]), _defineProperty(_module$exports, 'collect', require('./collect')), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable, fallbackValue) {
  return require('../conversions/nullable-to-validation')(aNullable, fallbackValue);
}), _defineProperty(_module$exports, 'fromResult', function fromResult(aResult) {
  return require('../conversions/result-to-validation')(aResult);
}), _defineProperty(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, fallbackValue) {
  return require('../conversions/maybe-to-validation')(aMaybe, fallbackValue);
}), _module$exports);