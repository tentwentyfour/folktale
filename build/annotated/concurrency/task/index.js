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
},
    _metamagical_withMet;

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var Task = require('./_task'); /*~ 
                                * stability: experimental 
                                * name: module folktale/concurrency/task
                                */
module.exports = __metamagical_withMeta((_metamagical_withMet = {
  of: Task.of,
  rejected: Task.rejected,
  task: require('./task'),
  waitAny: require('./wait-any'),
  waitAll: require('./wait-all'),
  _Task: Task,
  _TaskExecution: require('./_task-execution'),
  fromNodeback: function fromNodeback(aNodeback) {
    return require('../../conversions/nodeback-to-task')(aNodeback);
  },
  fromPromised: function fromPromised(aPromiseFn) {
    return require('../../conversions/promised-to-task')(aPromiseFn);
  }
}, __metamagical_withMeta(_metamagical_withMet['fromNodeback'], {
  'name': 'fromNodeback',
  'source': 'fromNodeback(aNodeback) {\n    return require(\'folktale/conversions/nodeback-to-task\')(aNodeback);\n  }',
  'signature': 'fromNodeback(aNodeback)',
  'location': {
    'filename': 'source/concurrency/task/index.js',
    'start': {
      'line': 17,
      'column': 17
    },
    'end': {
      'line': 47,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall s, e:\n  ((Any..., (e, s) => Void) => Void)\n  => (Any...)\n  => Task e s\n'
}), __metamagical_withMeta(_metamagical_withMet['fromPromised'], {
  'name': 'fromPromised',
  'source': 'fromPromised(aPromiseFn) {\n    return require(\'folktale/conversions/promised-to-task\')(aPromiseFn);\n  }',
  'signature': 'fromPromised(aPromiseFn)',
  'location': {
    'filename': 'source/concurrency/task/index.js',
    'start': {
      'line': 17,
      'column': 17
    },
    'end': {
      'line': 47,
      'column': 1
    }
  },
  'module': 'folktale/concurrency/task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'stability': 'experimental',
  'type': 'forall e, v:\n  ((Any...) => Promise v e) => (Any...) => Task e v\n \n'
}), _metamagical_withMet), {
  'name': 'module folktale/concurrency/task',
  'source': '{\n  of: Task.of,\n  rejected: Task.rejected,\n  task: require(\'./task\'),\n  waitAny: require(\'./wait-any\'),\n  waitAll: require(\'./wait-all\'),\n  _Task: Task,\n  _TaskExecution: require(\'./_task-execution\'),\n\n  /*~\n   * stability: experimental\n   * type: |\n   *    forall s, e:\n   *      ((Any..., (e, s) => Void) => Void)\n   *      => (Any...)\n   *      => Task e s\n   */\n  fromNodeback(aNodeback) {\n    return require(\'folktale/conversions/nodeback-to-task\')(aNodeback);\n  },\n\n  /*~\n   * stability: experimental\n   * type: |\n   *   forall e, v:\n   *     ((Any...) => Promise v e) => (Any...) => Task e v\n   */\n  fromPromised(aPromiseFn) {\n    return require(\'folktale/conversions/promised-to-task\')(aPromiseFn);\n  }\n}',
  'location': {
    'filename': 'source/concurrency/task/index.js',
    'start': {
      'line': 17,
      'column': 0
    },
    'end': {
      'line': 47,
      'column': 2
    }
  },
  'module': 'folktale/concurrency/task',
  'licence': 'MIT',
  'authors': ['Quildreen Motta'],
  'repository': 'https://github.com/origamitower/folktale',
  'npmPackage': 'folktale',
  'copyright': '(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS',
  'maintainers': ['Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)'],
  'isModule': true,
  'stability': 'experimental'
});