"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledOrders = exports.StyledBill = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral([" \n    padding: 20px; \n    .input{\n        input{\n        background-color:", ";\n        }\n        margin: 0px auto;\n        width: max(50%,100px);\n    }\n    color:", ";   \n    table{\n        margin:10px 0;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n    padding: 20px;\n    border-radius:8px;\n    background-color:", "; \n    color:", "; \n    position:fixed;\n    top:50%;\n    left:50%;\n    transform:translate(-50%,-50%);\n    z-index: 2;\n    footer{\n        margin: 10px;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledBill = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.main;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.font;
});

exports.StyledBill = StyledBill;

var StyledOrders = _styledComponents["default"].div(_templateObject2(), function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.main;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.palette.font;
});

exports.StyledOrders = StyledOrders;