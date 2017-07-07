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


/*~
 * stability: experimental
 * name: module folktale/fantasy-land/curried
 */
module.exports = __metamagical_withMeta({
  apply: require('./apply').curried,
  bimap: require('./bimap').curried,
  chain: require('./chain').curried,
  concat: require('./concat').curried,
  empty: require('./empty').curried,
  equals: require('./equals').curried,
  map: require('./map').curried,
  of: require('./of').curried
}, {
  'name': 'module folktale/fantasy-land/curried',
  'source': '{\n  apply: require(\'./apply\').curried,\n  bimap: require(\'./bimap\').curried,\n  chain: require(\'./chain\').curried,\n  concat: require(\'./concat\').curried,\n  empty: require(\'./empty\').curried,\n  equals: require(\'./equals\').curried,\n  map: require(\'./map\').curried,\n  of: require(\'./of\').curried\n}',
  'location': {
    'filename': 'source/fantasy-land/curried.js',
    'start': {
      'line': 15,
      'column': 0
    },
    'end': {
      'line': 24,
      'column': 2
    }
  },
  'module': 'folktale/fantasy-land/curried',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isModule': true,
  'stability': 'experimental'
});