"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLES = exports.MOOD = exports.STATUS = exports.ACTIONS = void 0;
var ACTIONS = {
  REMOVE_ITEM: "REMOVE_ITEM",
  REMOVE_ALL: "REMOVE_ALL",
  TOTAL_CARD: "TOTAL_CARD",
  ADD_ITEM: "ADD_ITEM",
  LIKE_ITEM: "LIKE_ITEM",
  UN_LIKE_ITEM: "UN_LIKE_ITEM"
};
exports.ACTIONS = ACTIONS;
var STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  FAILED: 'failed',
  SUCCEEDED: 'succeeded'
};
exports.STATUS = STATUS;
var MOOD = {
  ADD: 'add',
  UPDATE: 'update'
};
exports.MOOD = MOOD;
var ROLES = {
  USER: 2001,
  ADMIN: 5150,
  EDITOR: 1984
};
exports.ROLES = ROLES;