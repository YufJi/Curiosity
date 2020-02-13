"use strict";

require("core-js/modules/es6.function.name");

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var VNode_1 = __importDefault(require("./VNode"));

var instanceId_1 = require("./instanceId");

var AppContainer =
/** @class */
function () {
  function AppContainer(context) {
    this.updateQueue = [];
    this.context = context;
    this.root = new VNode_1["default"]({
      id: instanceId_1.generate(),
      type: 'root',
      container: this
    });
    this.root.mounted = true;
  }

  AppContainer.prototype.requestUpdate = function (path, start, deleteCount) {
    var items = [];

    for (var _i = 3; _i < arguments.length; _i++) {
      items[_i - 3] = arguments[_i];
    } // ignore

  };

  AppContainer.prototype.createCallback = function (name, fn) {
    this.context[name] = fn;
  };

  AppContainer.prototype.appendChild = function (child) {
    this.root.appendChild(child, true);
  };

  AppContainer.prototype.removeChild = function (child) {
    this.root.removeChild(child, true);
  };

  AppContainer.prototype.insertBefore = function (child, beforeChild) {
    this.root.insertBefore(child, beforeChild, true);
  };

  return AppContainer;
}();

exports["default"] = AppContainer;