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
    flBimap = _require.bimap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('bimap');
var unsupported = require('../helpers/unsupported-method')('bimap');

var isNew = function isNew(a) {
  return typeof a[flBimap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.bimap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b, (a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
var bimap = __metamagical_withMeta(function (bifunctor, transformLeft, transformRight) {
  return isNew(bifunctor) ? bifunctor[flBimap](transformLeft, transformRight) : isOld(bifunctor) ? warn(bifunctor.bimap(transformLeft, transformRight)) : /*otherwise*/unsupported(bifunctor);
}, {
  'name': 'bimap',
  'source': '(bifunctor, transformLeft, transformRight) =>\n  isNew(bifunctor) ?  bifunctor[flBimap](transformLeft, transformRight)\n: isOld(bifunctor) ?  warn(bifunctor.bimap(transformLeft, transformRight))\n: /*otherwise*/       unsupported(bifunctor)',
  'signature': 'bimap(bifunctor, transformLeft, transformRight)',
  'location': {
    'filename': 'source/fantasy-land/bimap.js',
    'start': {
      'line': 31,
      'column': 0
    },
    'end': {
      'line': 34,
      'column': 45
    }
  },
  'module': 'folktale/fantasy-land/bimap',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall F, a, b, c, d:\n  (F a b, (a) => c, (b) => d) => F c d\nwhere F is Bifunctor\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     ((a) => c) => ((b) => d) => (F a b) => F c d
 *   where F is Bifunctor
 */
bimap.curried = __metamagical_withMeta(curry(3, function (transformLeft, transformRight, bifunctor) {
  return (// eslint-disable-line no-magic-numbers
    bimap(bifunctor, transformLeft, transformRight)
  );
}), {
  'name': 'curried',
  'source': 'curry(3, (transformLeft, transformRight, bifunctor) =>    // eslint-disable-line no-magic-numbers\n  bimap(bifunctor, transformLeft, transformRight)\n)',
  'belongsTo': function belongsTo() {
    return bimap;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall F, a, b, c, d:\n  ((a) => c) => ((b) => d) => (F a b) => F c d\nwhere F is Bifunctor\n'
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b, c, d:
 *     (F a b).((a) => c, (b) => d) => F c d
 *   where F is Bifunctor
 */
bimap.infix = __metamagical_withMeta(function (transformLeft, transformRight) {
  return bimap(this, transformLeft, transformRight);
}, {
  'name': 'infix',
  'source': 'function(transformLeft, transformRight) {\n  return bimap(this, transformLeft, transformRight);\n}',
  'signature': 'infix(transformLeft, transformRight)',
  'belongsTo': function belongsTo() {
    return bimap;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall F, a, b, c, d:\n  (F a b).((a) => c, (b) => d) => F c d\nwhere F is Bifunctor\n'
});

module.exports = bimap;