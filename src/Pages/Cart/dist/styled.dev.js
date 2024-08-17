"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    margin: 60px auto;\n    direction: rtl;\n    .flex{\n      display: flex;\n      justify-content:space-between;\n      gap:20px;\n      flex-wrap: wrap;\n      @media (max-width: 576px) {\n          justify-content:center;\n      }\n    }\n    aside{\n      margin-top: 47px;\n      @media (max-width: 576px) {\n        margin-top: 20px;\n        width:100%;\n      }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PageStyled = _styledComponents["default"].div(_templateObject());

exports.PageStyled = PageStyled;