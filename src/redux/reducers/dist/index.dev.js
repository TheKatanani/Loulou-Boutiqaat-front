"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _signup = _interopRequireDefault(require("./signup"));

var _auth = _interopRequireDefault(require("./auth"));

var _login = _interopRequireDefault(require("./login"));

var _products = _interopRequireDefault(require("./products"));

var _categories = _interopRequireDefault(require("./categories"));

var _search = _interopRequireDefault(require("./search"));

var _cart = _interopRequireDefault(require("./cart"));

var _saved = _interopRequireDefault(require("./saved"));

var _users = _interopRequireDefault(require("./users"));

var _social = _interopRequireDefault(require("./social"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  signup: _signup["default"],
  auth: _auth["default"],
  login: _login["default"],
  //remove this slice 
  products: _products["default"],
  categories: _categories["default"],
  search: _search["default"],
  cart: _cart["default"],
  saved: _saved["default"],
  users: _users["default"],
  social: _social["default"]
});
var _default = rootReducer;
exports["default"] = _default;