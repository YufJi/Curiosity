"use strict";
/**
 * 合成事件处理流程
 * 1. 记录所有事件的 ID，包括冒泡事件 ID 和触发点击的事件 ID
 * 2. 如何判断是否是触发点击的事件：只要当前冒泡事件的 ID 小于等于触发点击的事件 ID，就认为当前事件是触发点击的事件，即新事件流
 * 3. 阻止冒泡时，就会记录下哪一个触发点击的事件阻止了冒泡，在后续冒泡事件中就都会查询是否被阻止冒泡了
 */

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Pool_1 = __importDefault(require("./Pool"));

var eventPool = new Pool_1["default"]();

function createBaseSyntheticEvent(eventType, eventId, nativeEvent) {
  // 添加阻止冒泡方法
  nativeEvent.stopPropagation = function () {
    eventPool.stopPropagation(eventType, eventId);
  };

  return nativeEvent;
}
/**
 * 获取事件 ID
 *
 */


function getEventId(event) {
  if (!event.target) {
    return;
  }

  if (event.target.targetDataset && event.target.targetDataset.rid) {
    return event.target.targetDataset.rid;
  }

  if (event.target.dataset && event.target.dataset.rid) {
    return event.target.dataset.rid;
  }
}
/**
 * 获取当前冒泡的事件 ID
 *
 */


function getCurrentEventId(event) {
  var _a, _b;

  if (event.currentTarget) {
    return (_a = event.currentTarget.dataset) === null || _a === void 0 ? void 0 : _a.rid;
  }

  if (event.target) {
    return (_b = event.target.dataset) === null || _b === void 0 ? void 0 : _b.rid;
  }
}
/**
 * 判断是否是新事件
 *
 */


function isNewEvent(eventType, event) {
  var currentEventId = getCurrentEventId(event);
  var latestEventId = eventPool.getLatestEvent(eventType, getEventId(event)) || currentEventId; // 因为冒泡上去的事件 ID 只会越来越大，所以只要当前事件 ID 小于等于冒泡记录的最后一个事件 ID，就是新的事件流

  return currentEventId <= latestEventId;
}

function createCallbackProxy(eventType, callback) {
  if (!Pool_1["default"].isSyntheticType(eventType)) {
    return callback;
  }

  return function (nativeEvent) {
    var restParams = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      restParams[_i - 1] = arguments[_i];
    }

    var eventId = getEventId(nativeEvent);
    var currentEventId = getCurrentEventId(nativeEvent);

    if (!eventId) {
      return callback.apply(void 0, __spreadArrays([nativeEvent], restParams));
    }

    var syntheticEvent = createBaseSyntheticEvent(eventType, eventId, nativeEvent);

    if (isNewEvent(eventType, nativeEvent)) {
      // 新的事件流，初始化 store 数据
      eventPool.initialEventState(eventType, eventId);
    } else {
      // 记录当前冒泡到的事件 ID
      eventPool.setLatestEvent(eventType, eventId, currentEventId);
    }

    if (eventPool.isPropagationStopped(eventType, eventId)) {
      return;
    }

    return callback.apply(void 0, __spreadArrays([syntheticEvent], restParams));
  };
}

exports.createCallbackProxy = createCallbackProxy;