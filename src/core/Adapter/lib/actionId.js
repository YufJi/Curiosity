"use strict";

exports.__esModule = true;
var actionId = 0;

function reset() {
  actionId = 0;
}

exports.reset = reset;

function generate() {
  var id = actionId;
  actionId += 1;
  return id;
}

exports.generate = generate;