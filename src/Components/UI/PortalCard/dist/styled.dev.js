"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPortal = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nwidth:100%;\n/* height:100vh; */\n::before{\n    content:'';\n    position:fixed;\n    inset:0;\n    background-color: #00000055;\n    opacity:0.3;\n    z-index: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledPortal = _styledComponents["default"].div(_templateObject());

exports.StyledPortal = StyledPortal;