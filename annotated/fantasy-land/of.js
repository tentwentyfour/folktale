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
    flOf = _require.of;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('of');
var unsupported = require('../helpers/unsupported-method')('of');

var isNew = function isNew(a) {
  return typeof a[flOf] === 'function';
};
var isCtorNew = function isCtorNew(a) {
  return typeof a.constructor[flOf] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.of === 'function';
};
var isCtorOld = function isCtorOld(a) {
  return typeof a.constructor.of === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F, a) => F a
 *   where F is Applicative
 */
var of = __metamagical_withMeta(function (applicative, value) {
  return isNew(applicative) ? applicative[flOf](value) : isCtorNew(applicative) ? applicative.constructor[flOf](value) : isOld(applicative) ? warn(applicative.of(value)) : isCtorOld(applicative) ? warn(applicative.constructor.of(value)) : /*otherwise*/unsupported(applicative);
}, {
  'name': 'of',
  'source': '(applicative, value) =>\n  isNew(applicative)     ?  applicative[flOf](value)\n: isCtorNew(applicative) ?  applicative.constructor[flOf](value)\n: isOld(applicative)     ?  warn(applicative.of(value))\n: isCtorOld(applicative) ?  warn(applicative.constructor.of(value))\n: /*otherwise*/             unsupported(applicative)',
  'signature': 'of(applicative, value)',
  'location': {
    'filename': 'source/fantasy-land/of.js',
    'start': {
      'line': 33,
      'column': 0
    },
    'end': {
      'line': 38,
      'column': 53
    }
  },
  'module': 'folktale/fantasy-land/of',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall F, a:\n  (F, a) => F a\nwhere F is Applicative\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F) => (a) => F a
 *   where F is Applicative
 */
of.curried = __metamagical_withMeta(curry(2, of), {
  'name': 'curried',
  'source': 'curry(2, of)',
  'belongsTo': function belongsTo() {
    return of;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall F, a:\n  (F) => (a) => F a\nwhere F is Applicative\n'
}); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a:
 *     (F).(a) => F a
 *   where F is Applicative
 */
of.infix = __metamagical_withMeta(function (value) {
  return of(this, value);
}, {
  'name': 'infix',
  'source': 'function(value) {\n  return of(this, value);\n}',
  'signature': 'infix(value)',
  'belongsTo': function belongsTo() {
    return of;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall F, a:\n  (F).(a) => F a\nwhere F is Applicative\n'
});

module.exports = of;