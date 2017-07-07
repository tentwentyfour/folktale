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

var Result = require('./result');

var _require = require('../adt/union/union'),
    typeSymbol = _require.typeSymbol;

/*~
 * stability: stable
 * name: module folktale/result
 */


module.exports = (_module$exports = {
  Error: Result.Error,
  Ok: Result.Ok,
  hasInstance: Result.hasInstance,
  of: Result.of,
  fromJSON: Result.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Result[typeSymbol]), _defineProperty(_module$exports, 'try', require('./try')), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable) {
  return require('../conversions/nullable-to-result')(aNullable);
}), _defineProperty(_module$exports, 'fromValidation', function fromValidation(aValidation) {
  return require('../conversions/validation-to-result')(aValidation);
}), _defineProperty(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, failureValue) {
  return require('../conversions/maybe-to-result')(aMaybe, failureValue);
}), _module$exports);