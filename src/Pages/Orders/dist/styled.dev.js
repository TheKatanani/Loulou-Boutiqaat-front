"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StayledOrdersTable = exports.StayledOrders = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sytled = require("../Dashboard/sytled");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    direction:rtl;\n    ", "{\n  .id \n,.address{\n  display:none;\n}}\n", "{\n  .id  \n,.address{\ndisplay:none\n}}\n", "{\n  .id  \n,.address{\ndisplay:none;\n}}\n  ", "{\n  .id \n,.address{\ndisplay:table-cell;\n}}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    min-height:calc(80dvh - 113px);\n    margin: 120px auto 60px;\n    ", "{\n        margin: 190px auto 60px; \n    }\n    ", "{ \n        margin: 200px auto 60px;\n        }\n    ", "{ \n        margin: 140px auto 60px;\n        }\n    text-align:center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StayledOrders = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var media = _ref.theme.media;
  return media.xs;
}, function (_ref2) {
  var media = _ref2.theme.media;
  return media.s;
}, function (_ref3) {
  var media = _ref3.theme.media;
  return media.l;
});

exports.StayledOrders = StayledOrders;
var StayledOrdersTable = (0, _styledComponents["default"])(_sytled.StyledTable)(_templateObject2(), function (_ref4) {
  var media = _ref4.theme.media;
  return media.xs;
}, function (_ref5) {
  var media = _ref5.theme.media;
  return media.s;
}, function (_ref6) {
  var media = _ref6.theme.media;
  return media.m;
}, function (_ref7) {
  var media = _ref7.theme.media;
  return media.xl;
});
exports.StayledOrdersTable = StayledOrdersTable;