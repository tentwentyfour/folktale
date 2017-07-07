"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
var TaskExecution = function () {
  /*~*/
  function TaskExecution(task, deferred) {
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
}();

module.exports = TaskExecution;