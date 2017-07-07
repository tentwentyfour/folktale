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
    flChain = _require.chain;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('chain');
var unsupported = require('../helpers/unsupported-method')('chain');

var isNew = function isNew(a) {
  return typeof a[flChain] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.chain === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a, (a) => C b) => C b
 *   where C is Chain
 */
var chain = __metamagical_withMeta(function (monad, transformation) {
  return isNew(monad) ? monad[flChain](transformation) : isOld(monad) ? warn(monad.chain(transformation)) : /*otherwise*/unsupported(monad);
}, {
  'name': 'chain',
  'source': '(monad, transformation) =>\n  isNew(monad) ?  monad[flChain](transformation)\n: isOld(monad) ?  warn(monad.chain(transformation))\n: /*otherwise*/   unsupported(monad)',
  'signature': 'chain(monad, transformation)',
  'location': {
    'filename': 'source/fantasy-land/chain.js',
    'start': {
      'line': 30,
      'column': 0
    },
    'end': {
      'line': 33,
      'column': 37
    }
  },
  'module': 'folktale/fantasy-land/chain',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall C, a, b:\n  (C a, (a) => C b) => C b\nwhere C is Chain\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     ((a) => C b) => (C a) => C b
 *   where C is Chain
 */
chain.curried = __metamagical_withMeta(curry(2, function (transformation, monad) {
  return (// eslint-disable-line no-magic-numbers
    chain(monad, transformation)
  );
}), {
  'name': 'curried',
  'source': 'curry(2, (transformation, monad) =>   // eslint-disable-line no-magic-numbers\n  chain(monad, transformation)\n)',
  'belongsTo': function belongsTo() {
    return chain;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall C, a, b:\n  ((a) => C b) => (C a) => C b\nwhere C is Chain\n'
});

/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall C, a, b:
 *     (C a).((a) => C b) => C b
 *   where C is Chain
 */
chain.infix = __metamagical_withMeta(function (transformation) {
  return chain(this, transformation);
}, {
  'name': 'infix',
  'source': 'function(transformation) {\n  return chain(this, transformation);\n}',
  'signature': 'infix(transformation)',
  'belongsTo': function belongsTo() {
    return chain;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall C, a, b:\n  (C a).((a) => C b) => C b\nwhere C is Chain\n'
});

module.exports = chain;