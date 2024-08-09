"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nmargin: 20px 0;\n    display: flex;\n    align-items:center;\n    justify-content:center;\n    width:100%;\n    /* margin:30px 0; */\n    min-height:calc(100vh - 74px);\n    h1{\n        color:", ";\n    }\n    main{\n        width:400px;\n        box-shadow: 0px 3px 10px rgba(32, 32, 32, 0.1);\n        background-color: ", ";\n        border-radius: 6px;\n        padding:1.5rem 1.7rem;\n        margin:0 auto;\n    }\n    .barthDay{\n        display: flex;\n        align-items:center;\n        justify-content:center;\n    }\n    p{\n    color:", ";\n    font-size:", ";\n    text-align:center;\n    margin:20px 0 4px;\n}\n    a{\n        font-family: 'Inter';\n        font-style: normal;\n        font-weight: 400;\n        font-size: ", "rem;\n        letter-spacing: -0.2px;\n        color: ", ";\n    }\n    .logInPassword{\n    position: relative;\n}\n.logInPassword .forgotPassword{\n    position:absolute;\n    top:2px;\n    right:0;\n}\n.logInPassword span{\n    img{\n        width:22px;\n    }\n    position:absolute;\n    top:50%;\n    transform:translateY(-14%);\n    right: 12px;\n    cursor: pointer;\n}\n/* add  show class to use this code */\n.logInPassword.text span::before{\n    content: \"\";\n    width: 3px;\n    height: 22px;\n    font-size: 30px;\n    font-weight: bold;\n    background-color: #8692a6;\n    position: absolute;\n    border-radius: 8px;\n    top: -2px;\n    left: 50%;\n    transform: translateX(-50%) rotate(30deg);\n    opacity: 0.8;\n}\n.name{\n        display: flex;\n        align-items:center;\n    }\n.phone{\n    label{\n        color:", ";      \n    }\n    >div{\n        display: flex;\n        align-items:center;\n        >*{\n            flex: 1;\n        }\n    }\n   } \n   form{\n    border-bottom: 1px solid ", ";\n   }\n   .gender{\n    margin: 10px 0;\n    display: flex;\n    gap: 20px;\n    align-items: center;\n    label{\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        color:", ";\n        input{\n            margin-inline-end: 5px;\n        }    \n    }\n   }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RegisterStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.main;
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
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.palette.font;
});

exports.RegisterStyled = RegisterStyled;