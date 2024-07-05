"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        display: flex;\n        /* width: 100%; */\n        flex:1;\n        gap:20px;\n        justify-content:space-between;\n        align-items:center;\n        padding:8px 0;\n        ul{\n            display: flex;\n            gap:20px;\n            justify-content:center;\n            align-items:center;\n            a{\n                color:", ";\n            }\n        }  \n        .active{\n            position: relative;\n            ::before{\n                content: '';\n                position: absolute;\n                width: 100%;\n                height: 3px;\n                bottom: -6px;\n                left: 0; \n                border-radius: 4px;\n                background-color:", ";\n            }\n            ::after{\n                content: '';\n                position: absolute;\n                width: 8px;\n                height: 8px;\n                bottom: -10px;\n                left: 50%;\n                border:3px solid ", ";\n                transform: translateX(-50%);\n                border-radius: 50%;\n                background-color:", ";\n            }\n        }\n        ", "{\n            overflow-x:scroll;\n            /* svg,li:nth-last-child(1),li:nth-last-child(2){\n                display: none;\n            } */\n            li{\n                width:109px;\n                padding:9px;\n                border-radius:6px;\n                text-align:center;\n                background-color:", ";\n                a{\n                    color:", ";\n                }\n            }\n    }\n    ", "{\n        flex-wrap:wrap;\n        justify-content:space-around;\n    }\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CategoryStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (_ref) {
  var media = _ref.theme.media;
  return media.xs;
}, function (props) {
  return props.theme.palette.ColorApp.gray_200;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (_ref2) {
  var media = _ref2.theme.media;
  return media.s;
});

exports.CategoryStyled = CategoryStyled;