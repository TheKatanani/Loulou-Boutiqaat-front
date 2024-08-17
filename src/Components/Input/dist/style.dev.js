"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = exports.Label = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    height: 40px;\n    border: 1px solid ", ";\n    border-radius: 6px;\n    font-weight: 500;\n    font-size: ", "rem;\n    line-height: 17px;\n    /* identical to box height */\n    color: ", ";\n    background-color:transparent;\n    padding: 10px; \n    margin: 3px 0 10px;\n    outline: none;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    text-transform: capitalize;\n    display: block;\n    font-weight: 500;\n    font-size: 16px;\n    color: ", ";\n    margin-top: 10px;\n    font-family: 'Inter';\n    font-style: normal;\n    font-weight: 400;\n    font-size: ", "rem;\n    letter-spacing: -0.2px; \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Label = _styledComponents["default"].label(_templateObject(), function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
});

exports.Label = Label;

var Input = _styledComponents["default"].input(_templateObject2(), function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.fontSizes.body2;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
});

exports.Input = Input;