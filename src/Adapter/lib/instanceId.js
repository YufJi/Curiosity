"use strict";

exports.__esModule = true;
var instanceId = 0;

function reset() {
  instanceId = 0;
}

exports.reset = reset;

function generate() {
  var id = instanceId;
  instanceId += 1;
  return id;
}

exports.generate = generate;