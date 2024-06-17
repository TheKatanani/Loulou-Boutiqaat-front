"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    background-color:", ";\n    color:", ";\n    border-top: 1px solid ", ";\n    a{\n        color:", ";\n    }\n    .container{\n        padding: 20px auto 0;\n        min-height:256px;\n        display: flex;\n        flex-wrap: wrap;\n        align-items:center;\n    }\n    .logoBox{\n        flex: 1;\n        max-width:276px;\n        p{\n            margin:17px 0;\n            color:", ";\n            font-size:", "rem;\n        }\n        .icons{\n        *{\n            margin:0 6px;\n        }\n    }\n}\n    ul{\n        flex: 1;\n    }\n    >div{\n        display: flex;\n        justify-content:space-between;\n        flex-wrap: wrap;\n    }\n    .store{\n        flex: 1;\n        background-color:", ";\n        border: 1px solid ", ";\n        border-radius: 6px;\n        margin:8px 0 0;\n        padding:8px 7px;\n    }\n    .uls{\n        flex:0.5;\n        display: grid;\n        grid-template-columns: repeat(auto-fill,130px);\n        flex-wrap: wrap;\n    }\n        ", "{ \n        height:unset;\n        >div{\n            display: block;\n            text-align: center;\n        }\n        .uls{\n        grid-template-columns: repeat(2,auto);\n        }\n        .stores{\n            display: flex;\n            .store{\n                padding: 0;\n            }\n        }\n        *{\n            margin:10px auto 0;\n        }\n    }\n    \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var FooterStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.primary_light;
}, function (props) {
  return props.theme.palette.ColorApp.primary_light;
}, function (props) {
  return props.theme.palette.ColorApp.gray_600;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.ColorApp.dark;
}, function (props) {
  return props.theme.palette.ColorApp.white;
}, function (_ref) {
  var media = _ref.theme.media;
  return "\n$ {\n    media.xs\n}\nor($ {\n        media.s.split(\"@media\")[1]\n    }\n    and(max - width: 992 px))\n";
});

exports.FooterStyled = FooterStyled;