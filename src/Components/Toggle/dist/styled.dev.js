"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonStayled = exports.MainStayled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nimg{\n  width:30px;\n  height:30px;\n}  transition: all 0.5s;\n  padding:8px 12px;\n  background-color:", ";\n  color:", ";\n  cursor: pointer;\n  border-radius:50%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width:137px;\n  padding:5px 20px 5px 20px;\n  background-color: ", ";\n  position:fixed;\n  z-index:999;\n  border-radius: 6px;\n  top:30px;\n  text-align:center;\n  left:-120px;\n  transition: all 0.5s;\n  button{\n    margin: 10px 0;\n    transition: 0.3s;\n    color: ", ";\n    background-color: ", ";\n    a{\n      color:black;\n      justify-content: center;\n    }\n    :hover{\n      color: ", ";\n      background-color: ", ";\n      \n    }\n  }\n  :hover{\n    left: -3px;\n  }\n  @media (max-width: 576px) {\n    display: none;\n  }\n  .dashboardLink{\n    width:100%;\n    padding:0;\n }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MainStayled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.dark;
}, function (props) {
  return props.theme.palette.ColorApp.gray_400;
}, function (props) {
  return props.theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
});

exports.MainStayled = MainStayled;

var ButtonStayled = _styledComponents["default"].button(_templateObject2(), function (props) {
  return props.theme.palette.page;
}, function (props) {
  return props.theme.palette.ColorApp.white;
});

exports.ButtonStayled = ButtonStayled;