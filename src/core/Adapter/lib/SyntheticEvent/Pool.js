"use strict";

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

exports.__esModule = true;

var SyntheticEventPool =
/** @class */
function () {
  function SyntheticEventPool() {
    var _this = this;

    this.state = {};
    SyntheticEventPool.SYNTHETIC_TYPES.forEach(function (type) {
      return _this.initialEventState(type);
    });
  }

  SyntheticEventPool.isSyntheticType = function (inputType) {
    if (this.DEPRECATED_CATCH_TYPE === inputType) {
      console.warn('DEPRECATION: remax 已支持在 onClick 事件中使用 stopPropagation 阻止事件冒泡，请尽量不要使用 catchClick');
    }

    return !!this.SYNTHETIC_TYPES.find(function (type) {
      return type === inputType;
    });
  };

  SyntheticEventPool.prototype.initialEventState = function (eventType, eventId) {
    var _a;

    if (!this.state[eventType]) {
      this.state[eventType] = {};
    }

    if (eventId) {
      this.state[eventType] = (_a = {}, _a[eventId] = {
        propagationStopped: false,
        currentEventId: eventId
      }, _a);
    }
  };

  SyntheticEventPool.prototype.setLatestEvent = function (eventType, eventId, currentEventId) {
    if (this.state[eventType] && this.state[eventType][eventId]) {
      this.state[eventType][eventId].currentEventId = currentEventId;
    }
  };

  SyntheticEventPool.prototype.getLatestEvent = function (eventType, eventId) {
    if (this.state[eventType] && this.state[eventType][eventId]) {
      return this.state[eventType][eventId].currentEventId;
    }
  };

  SyntheticEventPool.prototype.stopPropagation = function (eventType, eventId) {
    if (!this.state[eventType] || !this.state[eventType][eventId]) {
      return;
    }

    this.state[eventType][eventId].propagationStopped = true;
  };

  SyntheticEventPool.prototype.isPropagationStopped = function (eventType, eventId) {
    return this.state[eventType] && this.state[eventType][eventId] && this.state[eventType][eventId].propagationStopped;
  };

  SyntheticEventPool.DEPRECATED_CATCH_TYPE = 'catchClick';
  SyntheticEventPool.SYNTHETIC_TYPES = ['onClick'];
  return SyntheticEventPool;
}();

exports["default"] = SyntheticEventPool;