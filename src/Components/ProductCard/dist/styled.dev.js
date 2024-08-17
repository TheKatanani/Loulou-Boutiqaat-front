"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductCardStyeld = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding:20px;\n    background-color:", ";\n    direction:rtl;\n    width:100%;\n    border: 1px solid ", ";;\n        border-radius: 6px;\n        color:", ";\n        font-size:", "rem;\n\n    .content{\n        position:relative;\n        display: flex;\n        justify-content:center;\n        flex-direction: column;\n        .icons{\n            cursor: pointer;\n            position:absolute;\n            top:0px;\n            left:0px;\n            display: flex;\n            gap:3px;\n            .Select svg{\n                ", ";\n            }\n            .Like svg{\n                ", ";\n            }\n            svg{\n                padding:5px;\n                width:30px;\n                height:30px;\n                border: 1px solid ", ";;\n                border-radius: 5px;\n            }\n        }\n        .title{\n            ", ";\n        }\n        .price{\n            font-size:", "rem;\n            .prevCost{\n                color:", ";\n                font-size:", "rem;\n                text-decoration: line-through;\n                opacity:0.8;\n                padding:5px;\n            }\n        } \n        .description{\n        color:", ";\n    }\n    .ViewDetails{\n        color:", ";\n        margin:25px 0 0 ;\n        }\n    } \n    span{\n        direction:ltr;\n    }\n        ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ProductCardStyeld = _styledComponents["default"].div(_templateObject(), function (props) {
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
}, function (props) {
  return props.full && "display: flex;\n            align-items:center;\n            justify-content:center;\n            gap:20px;\n            margin:10px 0 0;\n            .imagesSlider{\n                max-width:30%;\n            }\n            .content{\n                flex: 1;\n                .title{\n                    margin-bottom:16px;\n                    color:".concat(function (props) {
    return props.theme.palette.font;
  }, ";\n                    order:-1;\n                }\n            }\n            @media (max-width: 576px) {\n                flex-direction: column;\n                .imagesSlider {\n                max-width: initial; \n                }           \n                .img{\n                    max-width:70px;\n                    height: unset;\n                    img{\n                        width:80%;\n                    }\n                } \n                .price + div{\n                    flex-wrap: wrap;\n                }\n            }\n            ");
});

exports.ProductCardStyeld = ProductCardStyeld;