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
  });
  object[Symbol.for('@@meta:magical')] = oldMeta;return object;
};

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/fantasy-land
 */module.exports = __metamagical_withMeta({
  apply: require('./apply'),
  concat: require('./concat'),
  chain: require('./chain'),
  empty: require('./empty'),
  map: require('./map'),
  of: require('./of'),
  equals: require('./equals'),
  bimap: require('./bimap'),
  curried: require('./curried'),
  infix: require('./infix')
}, {
  'name': 'module folktale/fantasy-land',
  'source': '{\n  apply: require(\'./apply\'),\n  concat: require(\'./concat\'),\n  chain: require(\'./chain\'),\n  empty: require(\'./empty\'),\n  map: require(\'./map\'),\n  of: require(\'./of\'),\n  equals: require(\'./equals\'),\n  bimap: require(\'./bimap\'),\n  curried: require(\'./curried\'),\n  infix: require(\'./infix\')\n}',
  'location': {
    'filename': 'source/fantasy-land/index.js',
    'start': {
      'line': 14,
      'column': 0
    },
    'end': {
      'line': 25,
      'column': 2
    }
  },
  'module': 'folktale/fantasy-land',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isModule': true,
  'stability': 'experimental'
});