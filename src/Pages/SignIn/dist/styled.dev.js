"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginStyle = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n    direction: rtl;\n    display: flex;\n    align-items:center;\n    justify-content:center;\n    width:100%;\n    margin:10px 0;\n    min-height:calc(100vh - 85px);\n    h1{\n        color:", ";\n    }\n    main{\n        width:387px;\n        box-shadow: 0px 3px 10px rgba(32, 32, 32, 0.1);\n        background-color: ", ";\n        border-radius: 6px;\n        padding:1.88rem;\n        margin:0 auto;\n    }\n    form + p{\n        margin: 20px auto 0;\n        text-align: center;\n        color:", ";\n    }\n    a p{\n        color:", ";\n        font-size:", ";\n        text-align:center;\n        margin:30px 0 4px;\n    }\n    a{\n        font-family: 'Inter';\n        font-style: normal;\n        font-weight: 400;\n        font-size: ", "rem;\n        letter-spacing: -0.2px;\n        color: ", ";\n    }\n    \n    .phone{\n        direction:ltr;\n        margin: 20px 0 0;\n        text-align: end;\n        label{\n            direction:rtl;\n            color:", ";      \n        }\n        >div{\n            display: flex;\n            align-items:center;\n            gap:5px;\n            >*{\n                flex: 1;\n            }\n            select{\n                width: 100%;\n            }\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LoginStyle = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.font;
});

exports.LoginStyle = LoginStyle;