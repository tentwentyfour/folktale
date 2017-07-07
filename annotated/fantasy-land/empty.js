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
    flEmpty = _require.empty;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('empty');
var unsupported = require('../helpers/unsupported-method')('empty');

var isNew = function isNew(a) {
  return typeof a[flEmpty] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flEmpty] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.empty === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.empty === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
var empty = __metamagical_withMeta(function (monoid) {
  return isNew(monoid) ? monoid[flEmpty]() : isCtorNew(monoid) ? monoid.constructor[flEmpty]() : isOld(monoid) ? warn(monoid.empty()) : isCtorOld(monoid) ? warn(monoid.constructor.empty()) : /*otherwise*/unsupported(monoid);
}, {
  'name': 'empty',
  'source': '(monoid) =>\n  isNew(monoid)     ?  monoid[flEmpty]()\n: isCtorNew(monoid) ?  monoid.constructor[flEmpty]()\n: isOld(monoid)     ?  warn(monoid.empty())\n: isCtorOld(monoid) ?  warn(monoid.constructor.empty())\n: /*otherwise*/        unsupported(monoid)',
  'signature': 'empty(monoid)',
  'location': {
    'filename': 'source/fantasy-land/empty.js',
    'start': {
      'line': 33,
      'column': 0
    },
    'end': {
      'line': 38,
      'column': 43
    }
  },
  'module': 'folktale/fantasy-land/empty',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall M, a:\n  (M) => M a\nwhere M is Monoid \n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M) => M a
 *   where M is Monoid 
 */
empty.curried = __metamagical_withMeta(curry(1, empty), {
  'name': 'curried',
  'source': 'curry(1, empty)',
  'belongsTo': function belongsTo() {
    return empty;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall M, a:\n  (M) => M a\nwhere M is Monoid \n'
}); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall M, a:
 *     (M).() => M a
 *   where M is Monoid 
 */
empty.infix = __metamagical_withMeta(function () {
  return empty(this);
}, {
  'name': 'infix',
  'source': 'function() {\n  return empty(this);\n}',
  'signature': 'infix()',
  'belongsTo': function belongsTo() {
    return empty;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall M, a:\n  (M).() => M a\nwhere M is Monoid \n'
});

module.exports = empty;