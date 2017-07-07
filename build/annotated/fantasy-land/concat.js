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
    flConcat = _require.concat;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('concat');
var unsupported = require('../helpers/unsupported-method')('concat');

var isNewSemigroup = function isNewSemigroup(a) {
  return typeof a[flConcat] === 'function';
};
var isOldSemigroup = function isOldSemigroup(a) {
  return typeof a.concat === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => S a
 *   where S is Semigroup
 */
var concat = __metamagical_withMeta(function (semigroupLeft, semigroupRight) {
  return isNewSemigroup(semigroupLeft) ? semigroupLeft[flConcat](semigroupRight) : isOldSemigroup(semigroupLeft) ? warn(semigroupLeft.concat(semigroupRight)) : /*otherwise*/unsupported(semigroupLeft);
}, {
  'name': 'concat',
  'source': '(semigroupLeft, semigroupRight) =>\n  isNewSemigroup(semigroupLeft) ?  semigroupLeft[flConcat](semigroupRight)\n: isOldSemigroup(semigroupLeft) ?  warn(semigroupLeft.concat(semigroupRight))\n: /*otherwise*/                    unsupported(semigroupLeft)',
  'signature': 'concat(semigroupLeft, semigroupRight)',
  'location': {
    'filename': 'source/fantasy-land/concat.js',
    'start': {
      'line': 30,
      'column': 0
    },
    'end': {
      'line': 33,
      'column': 62
    }
  },
  'module': 'folktale/fantasy-land/concat',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall S, a:\n  (S a, S a) => S a\nwhere S is Semigroup\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => S a
 *   where S is Semigroup
 */
concat.curried = __metamagical_withMeta(curry(2, function (semigroupRight, semigroupLeft) {
  return (// eslint-disable-line no-magic-numbers
    concat(semigroupLeft, semigroupRight)
  );
}), {
  'name': 'curried',
  'source': 'curry(2, (semigroupRight, semigroupLeft) =>    // eslint-disable-line no-magic-numbers\n  concat(semigroupLeft, semigroupRight)\n)',
  'belongsTo': function belongsTo() {
    return concat;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall S, a:\n  (S a) => (S a) => S a\nwhere S is Semigroup\n'
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => S a
 *   where S is Semigroup
 */
concat.infix = __metamagical_withMeta(function (aSemigroup) {
  return concat(this, aSemigroup);
}, {
  'name': 'infix',
  'source': 'function(aSemigroup) {\n  return concat(this, aSemigroup);\n}',
  'signature': 'infix(aSemigroup)',
  'belongsTo': function belongsTo() {
    return concat;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall S, a:\n  (S a).(S a) => S a\nwhere S is Semigroup\n'
});

module.exports = concat;