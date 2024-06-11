"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCategories = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  .data{\n    min-height:350px;\n  }\n  >div:nth-child(2n){\n    background-color:", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledCategories = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
});

exports.StyledCategories = StyledCategories;