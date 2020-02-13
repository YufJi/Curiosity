"use strict";

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var VNode_1 = __importDefault(require("./VNode"));

var instanceId_1 = require("./instanceId");

var actionId_1 = require("./actionId"); // import Platform from './Platform';
// import propsAlias from './propsAlias';
// import { isHostComponent } from './createHostComponent';


function stringPath(path) {
  return path.join('.');
}

var Container =
/** @class */
function () {
  function Container(context) {
    this.updateQueue = [];
    this.context = context;
    this.root = new VNode_1["default"]({
      id: instanceId_1.generate(),
      type: 'root',
      container: this
    });
    this.root.mounted = true;
  }

  Container.prototype.requestUpdate = function (path, start, deleteCount, immediately) {
    var _this = this;

    var items = [];

    for (var _i = 4; _i < arguments.length; _i++) {
      items[_i - 4] = arguments[_i];
    }

    var update = {
      path: path,
      start: start,
      deleteCount: deleteCount,
      items: items
    };

    if (immediately) {
      this.updateQueue.push(update);
      this.applyUpdate();
    } else {
      if (this.updateQueue.length === 0) {
        _promise["default"].resolve().then(function () {
          return _this.applyUpdate();
        });
      }

      this.updateQueue.push(update);
    }
  };

  Container.prototype.applyUpdate = function () {
    if (this.stopUpdate) {
      return;
    }

    var startTime = new Date().getTime();
    var action = {
      type: 'splice',
      payload: this.updateQueue.map(function (update) {
        return {
          path: stringPath(update.path),
          start: update.start,
          deleteCount: update.deleteCount,
          item: update.items[0]
        };
      }),
      id: actionId_1.generate()
    };
    var tree = action; // this.context.setData({ action: tree }, () => {
    //   /* istanbul ignore next */
    //   if (process.env.REMAX_DEBUG) {
    //     console.log(
    //       `setData => 回调时间：${new Date().getTime() - startTime}ms`,
    //       action,
    //     );
    //   }
    // });

    self.postMessage({
      action: tree
    });
    this.updateQueue = [];
  };

  Container.prototype.clearUpdate = function () {
    this.stopUpdate = true; // if (Platform.isWechat) {
    //   this.context.setData({
    //     action: {
    //       type: 'clear',
    //     },
    //   });
    // }
  };

  Container.prototype.createCallback = function (name, fn) {
    this.context[name] = fn;
  };

  Container.prototype.appendChild = function (child) {
    this.root.appendChild(child, true);
  };

  Container.prototype.removeChild = function (child) {
    this.root.removeChild(child, true);
  };

  Container.prototype.insertBefore = function (child, beforeChild) {
    this.root.insertBefore(child, beforeChild, true);
  };

  return Container;
}();

exports["default"] = Container;