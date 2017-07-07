"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~ stability: experimental */
var TaskExecution = __metamagical_withMeta(function () {
  /*~*/function TaskExecution(task, deferred) {
    _classCallCheck(this, TaskExecution);

    this._task = task;
    this._deferred = deferred;
  }

  /*~*/


  _createClass(TaskExecution, [{
    key: "cancel",
    value: function cancel() {
      this._deferred.maybeCancel();
      return this;
    }

    /*~*/

  }, {
    key: "listen",
    value: function listen(pattern) {
      this._deferred.listen(pattern);
      return this;
    }

    /*~*/

  }, {
    key: "promise",
    value: function promise() {
      return this._deferred.promise();
    }

    /*~*/

  }, {
    key: "future",
    value: function future() {
      return this._deferred.future();
    }
  }]);

  return TaskExecution;
}(), {
  "name": "TaskExecution",
  "source": "class TaskExecution {\n  /*~*/\n  constructor(task, deferred) {\n    this._task = task;\n    this._deferred = deferred;\n  }\n\n  /*~*/\n  cancel() {\n    this._deferred.maybeCancel();\n    return this;\n  }\n\n  /*~*/\n  listen(pattern) {\n    this._deferred.listen(pattern);\n    return this;\n  }\n\n  /*~*/\n  promise() {\n    return this._deferred.promise();\n  }\n\n  /*~*/\n  future() {\n    return this._deferred.future();\n  }\n}",
  "location": {
    "filename": "source/concurrency/task/_task-execution.js"
  },
  "module": "folktale/concurrency/task/_task-execution",
  "licence": "MIT",
  "authors": ["Quildreen Motta"],
  "repository": "https://github.com/origamitower/folktale",
  "npmPackage": "folktale",
  "copyright": "(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS",
  "maintainers": ["Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)"],
  "stability": "experimental"
});

__metamagical_withMeta(TaskExecution, {
  "name": "TaskExecution",
  "source": "class TaskExecution {\n  /*~*/\n  constructor(task, deferred) {\n    this._task = task;\n    this._deferred = deferred;\n  }\n\n  /*~*/\n  cancel() {\n    this._deferred.maybeCancel();\n    return this;\n  }\n\n  /*~*/\n  listen(pattern) {\n    this._deferred.listen(pattern);\n    return this;\n  }\n\n  /*~*/\n  promise() {\n    return this._deferred.promise();\n  }\n\n  /*~*/\n  future() {\n    return this._deferred.future();\n  }\n}",
  "location": {
    "filename": "source/concurrency/task/_task-execution.js",
    "start": {
      "line": 11,
      "column": 0
    },
    "end": {
      "line": 39,
      "column": 1
    }
  },
  "module": "folktale/concurrency/task/_task-execution",
  "licence": "MIT",
  "authors": ["Quildreen Motta"],
  "repository": "https://github.com/origamitower/folktale",
  "npmPackage": "folktale",
  "copyright": "(c) 2013-2017 Quildreen Motta, and CONTRIBUTORS",
  "maintainers": ["Quildreen Motta <queen@robotlolita.me> (http://robotlolita.me/)"],
  "stability": "experimental"
});

module.exports = TaskExecution;