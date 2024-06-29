"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledFallbackUI = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding:20px;\nh2{\n  color:red;\n  margin:10px 0;\n}\na{\n  color:", ";\n  text-decoration:underline;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledFallbackUI = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.primary;
});

exports.StyledFallbackUI = StyledFallbackUI;