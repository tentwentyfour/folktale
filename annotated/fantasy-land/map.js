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
    flMap = _require.map;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('map');
var unsupported = require('../helpers/unsupported-method')('map');

var isNew = function isNew(a) {
  return typeof a[flMap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.map === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a, (a) => b) => F b
 *   where F is Functor
 */
var map = __metamagical_withMeta(function (functor, transformation) {
  return isNew(functor) ? functor[flMap](transformation) : isOld(functor) ? warn(functor.map(transformation)) : /*otherwise*/unsupported(functor);
}, {
  'name': 'map',
  'source': '(functor, transformation) =>\n  isNew(functor) ?  functor[flMap](transformation)\n: isOld(functor) ?  warn(functor.map(transformation))\n: /*otherwise*/     unsupported(functor)',
  'signature': 'map(functor, transformation)',
  'location': {
    'filename': 'source/fantasy-land/map.js',
    'start': {
      'line': 30,
      'column': 0
    },
    'end': {
      'line': 33,
      'column': 41
    }
  },
  'module': 'folktale/fantasy-land/map',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall F, a, b:\n  (F a, (a) => b) => F b\nwhere F is Functor\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     ((a) => b) => (F a) => F b
 *   where F is Functor
 */
map.curried = __metamagical_withMeta(curry(2, function (transformation, functor) {
  return (// eslint-disable-line no-magic-numbers
    map(functor, transformation)
  );
}), {
  'name': 'curried',
  'source': 'curry(2, (transformation, functor) =>     // eslint-disable-line no-magic-numbers\n  map(functor, transformation)\n)',
  'belongsTo': function belongsTo() {
    return map;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall F, a, b:\n  ((a) => b) => (F a) => F b\nwhere F is Functor\n'
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F a).((a) => b) => F b
 *   where F is Functor
 */
map.infix = __metamagical_withMeta(function (transformation) {
  return map(this, transformation);
}, {
  'name': 'infix',
  'source': 'function(transformation) {\n  return map(this, transformation);\n}',
  'signature': 'infix(transformation)',
  'belongsTo': function belongsTo() {
    return map;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall F, a, b:\n  (F a).((a) => b) => F b\nwhere F is Functor\n'
});

module.exports = map;