"use strict";

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;
/* eslint-disable arrow-parens */

var scheduler = __importStar(require("scheduler"));

var shallowequal_1 = __importDefault(require("shallowequal"));

var constants_1 = require("./constants");

var instanceId_1 = require("./instanceId");

var VNode_1 = __importDefault(require("./VNode"));

var SyntheticEvent_1 = require("./SyntheticEvent");

var scheduleDeferredCallback = scheduler.unstable_scheduleCallback,
    cancelDeferredCallback = scheduler.unstable_cancelCallback,
    shouldYield = scheduler.unstable_shouldYield,
    now = scheduler.unstable_now;

function processProps(newProps, rootContext, id) {
  var props = {};

  for (var _i = 0, _a = (0, _keys["default"])(newProps); _i < _a.length; _i++) {
    var propKey = _a[_i];

    if (typeof newProps[propKey] === 'function') {
      var contextKey = constants_1.METHOD + "_" + id + "_" + propKey;
      rootContext.createCallback(contextKey, SyntheticEvent_1.createCallbackProxy(propKey, newProps[propKey]));
      props[propKey] = contextKey;
    } else if (propKey === 'style') {
      props[propKey] = newProps[propKey] || '';
    } else if (propKey === 'children') {// pass
    } else {
      props[propKey] = newProps[propKey];
    }
  }

  props['data-rid'] = id;
  return props;
}

var rootHostContext = {};
var childHostContext = {};
exports["default"] = {
  now: now,
  getPublicInstance: function getPublicInstance(inst) {
    return inst;
  },
  getRootHostContext: function getRootHostContext() {
    return rootHostContext;
  },
  shouldSetTextContent: function shouldSetTextContent() {
    return false;
  },
  prepareForCommit: function prepareForCommit() {// nothing to do
  },
  resetAfterCommit: function resetAfterCommit() {// nothing to do
  },
  getChildHostContext: function getChildHostContext() {
    return childHostContext;
  },
  createInstance: function createInstance(type, newProps, container) {
    var id = instanceId_1.generate();
    var props = processProps(newProps, container, id);
    return new VNode_1["default"]({
      id: id,
      type: type,
      props: props,
      container: container
    });
  },
  createTextInstance: function createTextInstance(text, container) {
    var id = instanceId_1.generate();
    var node = new VNode_1["default"]({
      id: id,
      type: constants_1.TYPE_TEXT,
      props: null,
      container: container
    });
    node.text = text;
    return node;
  },
  commitTextUpdate: function commitTextUpdate(node, oldText, newText) {
    if (oldText !== newText) {
      node.text = newText;
      node.update();
    }
  },
  prepareUpdate: function prepareUpdate(node, type, oldProps, newProps) {
    oldProps = processProps(oldProps, node.container, node.id);
    newProps = processProps(newProps, node.container, node.id);

    if (!shallowequal_1["default"](newProps, oldProps)) {
      return true;
    }

    return null;
  },
  commitUpdate: function commitUpdate(node, updatePayload, type, oldProps, newProps) {
    node.props = processProps(newProps, node.container, node.id);
    node.update();
  },
  appendInitialChild: function appendInitialChild(parent, child) {
    parent.appendChild(child, false);
  },
  appendChild: function appendChild(parent, child) {
    parent.appendChild(child, false);
  },
  insertBefore: function insertBefore(parent, child, beforeChild) {
    parent.insertBefore(child, beforeChild, false);
  },
  removeChild: function removeChild(parent, child) {
    parent.removeChild(child, false);
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    return false;
  },
  appendChildToContainer: function appendChildToContainer(container, child) {
    container.appendChild(child);
    child.mounted = true;
  },
  insertInContainerBefore: function insertInContainerBefore(container, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },
  removeChildFromContainer: function removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  schedulePassiveEffects: scheduleDeferredCallback,
  cancelPassiveEffects: cancelDeferredCallback,
  shouldYield: shouldYield,
  scheduleDeferredCallback: scheduleDeferredCallback,
  cancelDeferredCallback: cancelDeferredCallback,
  supportsMutation: true
};