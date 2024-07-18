"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding:11px 0;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    z-index: 99;\n    .logoBox > svg{\n        display: none;\n    }\n    .menu{\n        display: none;\n    }\n    background-color:", ";\n    >div>div{\n        display: flex;\n        gap:20px;\n        justify-content:space-between;\n        align-items:center;\n    }\n    /*x Small */\n    ", "{\n        >div>div{\n            .menu{\n                display: block;\n            }\n        flex-wrap: wrap;\n        justify-content:flex-start;\n        }\n        .logoBox{\n            display: flex;\n            justify-content:center;\n            align-items:center;\n            gap:10px;\n            svg{\n                display: block;\n                cursor: pointer;\n            }\n        }\n        .layout{\n            position:fixed;\n            top:0;\n            width:100vw;\n            height:100vh;\n            background-color:#00000052;\n            z-index:9999;\n            transition: 0.3s;\n        }\n    }\n    ", "{\n        >div>div{\n        flex-wrap: wrap;\n        justify-content: space-evenly;\n    } \n}\n.categoriesPart{ \n    display:flex;\n    justify-content:spce-evenly;\n.auth{\n    flex:.31;\n    /* display:inline-block; */\n    /* margin-left: auto; */\n    /* position:absolute;\n    top:0;\n    right:0; */\n    display:flex;   \n    @media (width < 990px) { \n        flex:.8;\n        margin-top: 10px;\n    }\n    ", "{\n        display:none;\n    }\n    button{\n        margin:0 5px;\n        padding:10px 12px;\n        width:80px;\n        border:2px solid ", ";\n        background-color:", ";\n        color:", ";\n    }\n}\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Header = _styledComponents["default"].header(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.media.xs;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.media.s;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.media.xs;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.gray_100;
}, function (props) {
  return props.theme.palette.font;
});

exports.Header = Header;