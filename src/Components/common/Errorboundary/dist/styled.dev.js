"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledFallbackUI = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding:20px;\n  min-height: 100vh;\n  display:grid;\n  place-content:center;\n  text-align: center;\n  h2{ \n    margin:10px 0;\n    color:#ff5d5b;\n  }\n  p{\n    margin:10px 0;\n    color:", ";\n}\na{\n  color:", ";\n  text-decoration:underline;\n  display: block;\n}\n.container{\n  display: flex;\n  justify-content:center;\n  align-items:center;\n  flex-wrap: wrap;\n  gap:30px; \n  img{\n    width: min(100% , 500px);\n    order:-1;\n    ", "{\n      order:1;\n    }\n  }\n  button{\n    padding:12px 15px;\n    width:fit-content;\n  }\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledFallbackUI = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.gray_800;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (_ref) {
  var media = _ref.theme.media;
  return media.m;
});

exports.StyledFallbackUI = StyledFallbackUI;