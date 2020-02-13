"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var react_reconciler_1 = __importDefault(require("react-reconciler"));

var hostConfig_1 = __importDefault(require("./hostConfig"));

exports.ReactReconcilerInst = react_reconciler_1["default"](hostConfig_1["default"]);

function getPublicRootInstance(container) {
  var containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  return containerFiber.child.stateNode;
}

function render(rootElement, container) {
  // Create a root Container if it doesnt exist
  if (!container._rootContainer) {
    container._rootContainer = exports.ReactReconcilerInst.createContainer(container, false, false);
  }

  exports.ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, function () {// ignore
  });
  return getPublicRootInstance(container._rootContainer);
}

exports["default"] = render;