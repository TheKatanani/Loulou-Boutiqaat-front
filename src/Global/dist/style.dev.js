"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyle = void 0;

var _styledComponents = require("styled-components");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\ntd {\n    overflow: auto;\n}\nbody {\n  background: linear-gradient(80deg,", ",#843abc);\n  color: ", ";\n  font-family: 'Inter', sans-serif;\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  p,\n  span,\n  li,\n  ul,\n  a{\n    direction:rtl;\n  }\n}\na{\n    text-decoration:none;\n}\nul{\n  list-style:none;\n}\n/* Small */\n@media (max-width: 576px) {   \n  html {\n    font-size: 72.5%; /* 62.5% of 16px = 10px */\n  }\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.main;
});
exports.GlobalStyle = GlobalStyle;