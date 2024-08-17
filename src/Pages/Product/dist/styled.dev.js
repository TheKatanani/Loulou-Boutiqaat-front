"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledProductPage = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    margin: 140px 0 20px;\n    direction: rtl;\n    padding:20px;\n    background-color:", ";\n    width:100%;\n    border: 1px solid ", ";;\n    border-radius: 6px;\n    color:", ";\n    font-size:", "rem;\n    .card{\n        display: flex;\n        justify-content: space-between;\n        align-items: center; \n        ", "{\n            flex-wrap: wrap;\n        }\n        gap:20px;\n        .title{\n            margin: 20px 0;\n    }\n    }\n    .content{\n        flex:1;\n        position:relative;\n        display: flex;\n        justify-content:center;\n        flex-direction: column;\n        .icons{\n            cursor: pointer;\n            position:absolute;\n            top:0px;\n            left:0px;\n            display: flex;\n            gap:3px; \n        }\n        .title{\n            ", ";\n        }\n        .price{\n            font-size:", "rem;\n            .prevCost{\n                color:", ";\n                font-size:", "rem;\n                text-decoration: line-through;\n                opacity:0.8;\n                padding:5px;\n            }\n        }\n      }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledProductPage = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (_ref) {
  var media = _ref.theme.media;
  return media.xs;
}, function (props) {
  return !props.full && "color:".concat(function (props) {
    return props.theme.palette.ColorApp.gray_800;
  });
}, function (props) {
  return props.theme.fontSizes.h6;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
}, function (props) {
  return props.theme.fontSizes.body;
});

exports.StyledProductPage = StyledProductPage;