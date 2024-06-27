"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledAlert = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  padding: 30px;\n  border-radius:8px;\n  background-color:", ";\n  color:", ";\n  position:fixed;\n  top:50%;\n  left:50%;\n  transform:translate(-50%,-50%);\n  z-index: 2;\n  span{\n    position:absolute;\n    right:-5px;\n    top:-5px;\n    border-radius:50%;\n    border:1px solid ", ";\n    background-color: red;\n    color:white;\n    padding:3px 8px;\n    cursor: pointer;\n  }\n  a{\n    margin: 15px 0 0;\n    display: block;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledAlert = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.main;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.font;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.main;
});

exports.StyledAlert = StyledAlert;