"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosPrivate = exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _API = require("../API");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _axios["default"].create({
  baseURL: _API.API2
});

exports["default"] = _default;

var axiosPrivate = _axios["default"].create({
  baseURL: _API.API2,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

exports.axiosPrivate = axiosPrivate;