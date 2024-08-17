"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyleSearch = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  display: flex;\n  align-items: center;\n  height:40px;\n  direction: rtl;\n*{\n  height:100%;\n    :focus{\n        outline:none;\n    }\n    font-size:", "; ;\n}\n  position: relative;\n  .results{\n    z-index: 22;\n    position:absolute;\n    top:45px;\n    left:0;\n    right: 0;\n    height: auto;\n    background-color:", " ;\n    border: 2px solid ", ";\n    border-radius: 6px;\n    li{\n      padding:10px;\n      color: ", ";\n      cursor: pointer;\n      transition-property: background-color;\n      transition-timing-function: 0.3s;\n      :hover{\n        background-color:", " ;\n      }\n    }\n  }\ninput[type=\"text\"] {\n  width:421px;\n  padding: 0.5em;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border: 2px solid ", ";\n  @media (min-width: 576px) {\n    border-left: none;\n  }\n  color:", ";\n  background-color:", ";\n}\n\nselect {\n  padding: 0.5em;\n  border: 2px solid ", ";\n  color:  ", ";\n  background-color:", ";\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n\nbutton {\n  padding: 0.5em 1em;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  background:", ";\n  border: 2px solid ", ";\n  color: ", ";\n  cursor: pointer;\n}\n\nbutton:hover {\n  opacity:0.8;\n}\n\n", "{\n  input[type=\"text\"] {\n    width:92vw;\n    border-radius:4px;\n    border-color:", ";\n  }\n  select{\n    display:none;\n  }\n}\nbutton {\n  display: none;\n  ", "\n}\n", "{\n        order:3\n      }\n.d-none{\n  display: none;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyleSearch = _styledComponents["default"].form(_templateObject(), function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.page;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.primary_light;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
}, function (props) {
  return props.theme.palette.page;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
}, function (props) {
  return props.theme.palette.page;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.white;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.media.xs;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
}, function (_ref2) {
  var isOnChangeRequest = _ref2.isOnChangeRequest;
  return !isOnChangeRequest && "\ndisplay: block;\n";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.media.s;
});

exports.StyleSearch = StyleSearch;