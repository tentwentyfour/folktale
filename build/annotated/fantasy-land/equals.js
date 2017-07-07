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
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = require('../helpers/fantasy-land'),
    flEquals = _require.equals;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('equals');
var unsupported = require('../helpers/unsupported-method')('equals');

var isNew = function isNew(a) {
  return typeof a[flEquals] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.equals === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => Boolean
 *   where S is Setoid
 */
var equals = __metamagical_withMeta(function (setoidLeft, setoidRight) {
  return isNew(setoidLeft) ? setoidLeft[flEquals](setoidRight) : isOld(setoidLeft) ? warn(setoidLeft.equals(setoidRight)) : /*otherwise*/unsupported(setoidLeft);
}, {
  'name': 'equals',
  'source': '(setoidLeft, setoidRight) =>\n  isNew(setoidLeft) ?  setoidLeft[flEquals](setoidRight)\n: isOld(setoidLeft) ?  warn(setoidLeft.equals(setoidRight))\n: /*otherwise*/        unsupported(setoidLeft)',
  'signature': 'equals(setoidLeft, setoidRight)',
  'location': {
    'filename': 'source/fantasy-land/equals.js',
    'start': {
      'line': 31,
      'column': 0
    },
    'end': {
      'line': 34,
      'column': 47
    }
  },
  'module': 'folktale/fantasy-land/equals',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall S, a:\n  (S a, S a) => Boolean\nwhere S is Setoid\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => Boolean
 *   where S is Setoid
 */
equals.curried = __metamagical_withMeta(curry(2, function (setoidRight, setoidLeft) {
  return (// eslint-disable-line no-magic-numbers
    equals(setoidLeft, setoidRight)
  );
}), {
  'name': 'curried',
  'source': 'curry(2, (setoidRight, setoidLeft) =>    // eslint-disable-line no-magic-numbers\n  equals(setoidLeft, setoidRight)\n)',
  'belongsTo': function belongsTo() {
    return equals;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall S, a:\n  (S a) => (S a) => Boolean\nwhere S is Setoid\n'
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => Boolean
 *   where S is Setoid
 */
equals.infix = __metamagical_withMeta(function (aSetoid) {
  return equals(this, aSetoid);
}, {
  'name': 'infix',
  'source': 'function(aSetoid) {\n  return equals(this, aSetoid);\n}',
  'signature': 'infix(aSetoid)',
  'belongsTo': function belongsTo() {
    return equals;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall S, a:\n  (S a).(S a) => Boolean\nwhere S is Setoid\n'
});

module.exports = equals;