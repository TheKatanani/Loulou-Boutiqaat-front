"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyCartItemStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items:flex-start;\n    justify-content:space-between;\n    margin:10px;\n    gap:11px;\n    a{\n        color:", ";\n        font-weight: bold;\n    }\n    .content{\n        display: flex;\n        gap:20px;\n    }\n    .imgarea{\n        min-width: 110px;\n        min-height: 110px;\n        max-width: 110px;\n        max-height: 110px;\n        object-fit: contain;\n        margin:5px;\n        border: 1px solid ", ";\n        border-radius: 6px;\n        display: flex;\n        align-items:center;\n        justify-content:center;\n        padding:5px;\n            img{\n                max-width:80%;\n                max-height:80%;\n            }\n    }\n    .quntity{\n        p{    \n            direction:ltr;\n        }\n    }\n    .text ,.quntity{\n    margin:10px 0;\n    .title{\n        margin:0 0 7px;\n        font-size:", "rem;\n        color:", ";\n    }\n    .price{\n        font-size:", "rem;\n        color:", "};\n    }\n    .details{\n        margin:10px 0 6px;\n        line-height: 24px;\n        width:70%;\n        font-size:", "rem;\n        color:", ";\n    }\n    .buttons{\n        button{\n            width:fit-content;\n            padding:10px;\n        }\n        display: flex;\n        gap:10px;\n        button:first-child{\n            color:red;\n        }\n    }\n    select{\n        margin:12px 0 0%;\n        width:123px;\n    }\n    @media (max-width: 576px) {\n        flex-wrap:wrap;\n        .quntity{\n        margin:0 0 10px;\n        width:100%;\n        display: flex;\n        justify-content:space-between;\n        align-items: center;\n        select{\n            order: -1;\n        }\n    }\n    .content{\n    gap:0px;\n    }\n    .imgarea{\n        min-width: 70px;\n        min-height: 70px;\n        max-width: 70px;\n        max-height: 70px;\n    }\n    }\n    .itemQuantity{\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        gap:10px;\n        margin: 20px 0;\n        button{\n            background-color: transparent;\n            padding:2px 7px;\n            cursor: pointer;\n            font-size:", "rem;\n            border-radius:4px;\n            color:", ";\n            border:2px solid ", "\n        }\n        p{\n            font-size:", "rem;\n            color:", ";\n        }\n    }\n    .saveForLater{\n        ", "\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MyCartItemStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.gray_600;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.palette.ColorApp.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
}, function (_ref3) {
  var isInSaved = _ref3.isInSaved,
      theme = _ref3.theme;
  return isInSaved && "\n            border: 1 px solid ".concat(theme.palette.ColorApp.gray_300, ";\n            background-color: ").concat(theme.palette.ColorApp.primary, ";\n            color: ").concat(theme.palette.ColorApp.white, ";\n            ");
});

exports.MyCartItemStyled = MyCartItemStyled;