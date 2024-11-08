"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummaryStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    height:fit-content;\n    width:200px;\n    padding:20px;\n    background-color:", ";\n    border: 1px solid ", ";\n    border-radius: 6px; ;\n    color:", ";\n    font-size:", "rem;           \n    .info li ,.total {\n        display: flex;\n        align-items:center;\n        justify-content:space-between;\n        margin:8px 0;\n    }\n    .info li:nth-child(2) p:nth-child(2){\n        color:red;\n    }\n    .info li:nth-child(3) p:nth-child(2){\n        color: ", ";\n    }\n    .total{\n        font-weight: 600;\n        p:last-child{\n            font-size:", "rem;           \n        }\n    }\n    .info{\n        border-bottom: 1px solid ", ";\n    }\n    button{\n        color:", ";\n        background-color:", "; ;\n        margin:10px 0;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SummaryStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.ColorApp.green;
}, function (props) {
  return props.theme.fontSizes.h6;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.white;
}, function (props) {
  return props.theme.palette.ColorApp.green;
});

exports.SummaryStyled = SummaryStyled;