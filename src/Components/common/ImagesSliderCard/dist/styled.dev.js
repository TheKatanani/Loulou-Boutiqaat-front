"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledImagesSliderCard = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        direction: ltr;\n        ", "\n        width:100%;\n        &.cart{\n            height:110px;\n        }\n        overflow: hidden;\n        text-align:center;\n        display: flex;\n        align-items:center;\n        justify-content:center;\n        img{\n            max-width:205px;\n            width: 80%;\n            object-fit:cover;\n            &.defaultImage{\n            width: 100%;\n            background-size:contain;\n            margin:3px 0;\n            max-width:initial;\n            max-height:205px;\n            object-fit:cover;\n            }\n        }\n        position:relative;\n        .prevImg,.nextImg{\n            position: absolute;\n            top:50% ;\n            transform:translateY(-50%) ; \n            color:", ";\n            font-size: 2rem;\n            z-index: 2;\n            cursor: pointer; ;\n            background-color:transparent;\n            border-color: transparent; \n            &.disabled{\n                visibility: hidden;\n            }\n        }\n        .remove{\n            position:absolute;\n            right: 0;\n            top: 0;\n            background-color: red;\n            width: 20px;\n            height: 20px;\n            border: 1px solid ", ";\n            border-radius: 50%;\n            cursor: pointer;\n            color:", ";\n        }\n        .prevImg{\n            left:0px;\n        }\n        .nextImg{\n            right:0px;\n        }\n        &.cart{\n            .prevImg{\n                left:-2px;\n                z-index: 2;\n            font-size:1.5rem;\n        }\n        .nextImg{\n                font-size:1.5rem;\n                right:-2px;\n                z-index: 2;\n            }\n        }\n        .dots{\n            position: absolute;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            gap:2px;\n            bottom: 10px;\n            left: 50%;\n            transform:translateX(-50%) ;  \n            .imgDot{\n                width: 8px;\n                height: 8px;\n                background-color: ", ";\n                border:1px solid ", ";\n                border-radius: 50%; \n                cursor: pointer;\n                &.active{\n                    background-color: ", ";\n                }\n            }\n        }\n       &.cart{ \n        .dots{ \n            .imgDot{\n                width: 7px;\n                height: 7px; \n            }\n        }}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledImagesSliderCard = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var isImages = _ref.isImages;
  return isImages && "\n        height:210px;\n        min-width: min(100%, 260px);\n        ";
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
});

exports.StyledImagesSliderCard = StyledImagesSliderCard;