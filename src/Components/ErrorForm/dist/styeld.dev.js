"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        background-color: #FFB6C1;\n        color: #FF0000;\n        font-size: 14px;\n        padding: 5px 0;\n        border-radius: 5px;\n        text-align: center;\n        margin:7px 0 ;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ErrorStyled = _styledComponents["default"].p(_templateObject());

exports.ErrorStyled = ErrorStyled;