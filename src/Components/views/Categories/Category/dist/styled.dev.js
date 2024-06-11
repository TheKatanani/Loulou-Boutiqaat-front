"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyeldCard = exports.Styledcategory = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    max-width: 280px;\n    padding:20px;\n    background-color:", ";\n    width:100%;\n    border: 1px solid ", ";;\n    border-radius: 6px;\n    color:", ";\n    font-size:", "rem;\n    transition: 0.3s ease-in-out;\n \n    .content{\n        position:relative;\n        display: flex;\n        justify-content:center;\n        flex-direction: column;\n        .icons{\n            cursor: pointer;\n            position:absolute;\n            top:0px;\n            right:0px;\n            display: flex;\n            gap:3px;\n            .Select svg{\n                ", ";\n            }\n            .Like svg{\n                ", ";\n            }\n            svg{\n                padding:5px;\n                width:30px;\n                height:30px;\n                border: 1px solid ", ";;\n                border-radius: 5px;\n            }\n        }\n        .title{\n            ", ";\n        }\n        .price{\n            font-size:", "rem;\n            .prevCost{\n                color:", ";\n                font-size:", "rem;\n                text-decoration: line-through;\n                opacity:0.8;\n                padding:5px;\n            }\n        } \n        .description{\n        color:", ";\n        span{\n            color:", ";\n            margin:25px 0 0 ;\n            cursor: pointer;\n        }\n        }\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  >.container .data{ \n        background: linear-gradient(45deg,#843abc66,#843abc);\n        display: grid;\n        gap:20px;\n        ", "{\n            grid-template-columns: auto;\n            \n        }\n        ", "{\n            grid-template-columns: repeat(2,auto); \n        }\n        ", "{\n            grid-template-columns: repeat(3,auto); \n            gap:10px;\n            >div{\n                padding: 10px;\n            }\n        }\n        ", "{\n            grid-template-columns: repeat(4,auto); \n            >div{\n                padding: 10px;\n            }\n        } \n        ", "{ \n            >div{\n                padding: 20px;\n            }\n        } \n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        border-radius: 8px;\n        border:2px solid ", ";\n        box-shadow: 10px 11px 19px 10px ", "55;\n        padding: 20px;\n        margin: 30px 0;\n        position:relative;\n        > .prev,.next{\n            position: absolute;\n            top:50% ;\n            transform:translateY(-50%) ; \n            color:", ";\n            font-size: 2rem;\n            z-index: 2;\n            cursor: pointer;\n            background-color: ", ";\n            border:1px solid ", ";\n            border-radius: 50%;\n            padding: 0px 7px; \n            &.disabled{\n                visibility: hidden;\n            }\n        }\n        > .prev{\n            left:5px;\n        }\n        > .next{\n            right:5px;\n        }\n    }\n    padding: 60px 0;\n    min-height: calc(100vh - 113px);\n    .noData{\n        text-align: center;\n        color:", ";\n        font-size: 2rem;\n        font-weight: bold;\n    }\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Styledcategory = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.media.xs;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.media.s;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.media.m;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.media.l;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.media.xl;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
});

exports.Styledcategory = Styledcategory;

var StyeldCard = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.isSelected && "background-color:".concat(props.theme.palette.ColorApp.primary_light);
}, function (props) {
  return props.isLike && "background-color:".concat(props.theme.palette.ColorApp.primary_light);
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
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
}, function (props) {
  return props.theme.palette.ColorApp.gray_600;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
});

exports.StyeldCard = StyeldCard;