"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCheckOut = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["   \n  margin: 30px 0;\n  direction: rtl;\n  padding: 20px;\n  border-radius:8px;\n  background-color:", ";\n  box-shadow: 5px 5px 10px ", ";\n  position:fixed;\n  top:50%;\n  left:50%;\n  transform:translate(-50%,-50%);\n  z-index: 2;\n  .d-flex{\n    div{\n      flex:1;\n    }\n    display: flex;\n    justify-content: center;\n    align-items:end;\n    ", "{\n    flex-wrap: wrap;\n  }\n    ", "{\n    flex-wrap: wrap;\n  }\n    ", "{\n    flex-wrap: nowrap;\n  }\n    gap:10px;\n    .input,.select,select{\n      width: 100%;\n    }\n  }\n  span.cancel{\n    position:absolute;\n    left:-5px;\n    top:-5px;\n    border-radius:50%;\n    border:1px solid ", ";\n    background-color: red;\n    color:white;\n    padding:3px 8px;\n    cursor: pointer;\n  }\n  button{\n    background-color:", "; \n    margin-bottom: 7px; \n  &.disabled{\n    opacity: 0.7;\n    background-color:", ";\n    cursor:not-allowed\n    }\n  }   \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledCheckOut = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_100;
}, function (_ref2) {
  var media = _ref2.theme.media;
  return media.xs;
}, function (_ref3) {
  var media = _ref3.theme.media;
  return media.s;
}, function (_ref4) {
  var media = _ref4.theme.media;
  return media.m;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.palette.main;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.palette.ColorApp.primary_light;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.palette.ColorApp.gray_500;
});

exports.StyledCheckOut = StyledCheckOut;