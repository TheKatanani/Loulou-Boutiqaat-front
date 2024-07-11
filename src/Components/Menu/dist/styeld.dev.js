"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    position:fixed;\n    z-index:999999;\n    background-color: ", ";\n    top:0;\n    left:", ";\n    height:100vh;\n    width:37vh;\n    transition:0.3s;\n    box-shadow: 5px 5px 25px ", ";\n    color:", ";\n    header{\n        background-color:", ";\n        padding:20px;\n        p{\n            margin-top: 8px;\n        }\n    }\n    ul{\n        padding:20px;\n        li{ \n            a{\n                color:", ";\n                display: flex;\n                align-items:center;\n            }\n                padding:15px 25px;\n            .iconArea{\n                width:50px;\n            }\n        }\n        li:nth-child(4)\n        ,li:nth-child(7){\n            border-bottom: 1px solid ", ";\n        }\n        li:last-child{\n            padding:15px 5px;\n            >div{\n                position:unset;\n                background-color:", "; \n                display: flex;\n                width:100%;\n                justify-content:space-between;\n                align-items: center;\n                gap:3px;\n                padding:0;\n                button{ \n                    border: 1px solid ", ";\n                    font-size:12px;\n                    :last-child{\n                        padding:3px 5px;\n                    }\n                }\n            }\n        }\n    }\n    .auth{\n        display: flex;\n        gap:5px; \n        a{\n            flex:1\n        }\n    }\n    display: none;\n    @media (max-width: 576px) {\n        display: block;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MenuStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.show ? "0" : "-350px";
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.gray_200;
}, function (props) {
  return props.theme.palette.ColorApp.gray_600;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.gray_200;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
});

exports.MenuStyled = MenuStyled;