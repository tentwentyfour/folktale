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
    ap = _require.ap;

var curry = require('../core/lambda/curry');
var warn = require('../helpers/warn-deprecated-method')('ap');
var unsupported = require('../helpers/unsupported-method')('ap');

var isNew = function isNew(a) {
  return typeof a[ap] === 'function';
};
var isOld = function isOld(a) {
  return typeof a.ap === 'function';
};

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b, F a) => F b
 *   where F is Apply
 */
var apply = __metamagical_withMeta(function (applicativeFunction, applicativeValue) {
  return isNew(applicativeValue) ? applicativeValue[ap](applicativeFunction) : isOld(applicativeFunction) ? warn(applicativeFunction.ap(applicativeValue)) : /*otherwise*/unsupported(applicativeFunction);
}, {
  'name': 'apply',
  'source': '(applicativeFunction, applicativeValue) =>\n  isNew(applicativeValue)    ?  applicativeValue[ap](applicativeFunction)\n: isOld(applicativeFunction) ?  warn(applicativeFunction.ap(applicativeValue))\n: /*otherwise*/                 unsupported(applicativeFunction)',
  'signature': 'apply(applicativeFunction, applicativeValue)',
  'location': {
    'filename': 'source/fantasy-land/apply.js',
    'start': {
      'line': 29,
      'column': 0
    },
    'end': {
      'line': 32,
      'column': 65
    }
  },
  'module': 'folktale/fantasy-land/apply',
  'licence': 'MIT',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall F, a, b:\n  (F (a) => b, F a) => F b\nwhere F is Apply\n'
});

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b) => (F a) => F b
 *   where F is Apply
 */
apply.curried = __metamagical_withMeta(curry(2, apply), {
  'name': 'curried',
  'source': 'curry(2, apply)',
  'belongsTo': function belongsTo() {
    return apply;
  },
  'stability': 'experimental',
  'authors': ['@boris-marinov', 'Quildreen Motta'],
  'type': 'forall F, a, b:\n  (F (a) => b) => (F a) => F b\nwhere F is Apply\n'
}); // eslint-disable-line no-magic-numbers


/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall F, a, b:
 *     (F (a) => b).(F a) => F b
 *   where F is Apply
 */
apply.infix = __metamagical_withMeta(function (applicativeValue) {
  return apply(this, applicativeValue);
}, {
  'name': 'infix',
  'source': 'function(applicativeValue) {\n  return apply(this, applicativeValue);\n}',
  'signature': 'infix(applicativeValue)',
  'belongsTo': function belongsTo() {
    return apply;
  },
  'stability': 'experimental',
  'authors': ['Quildreen Motta'],
  'type': 'forall F, a, b:\n  (F (a) => b).(F a) => F b\nwhere F is Apply\n'
});

module.exports = apply;