"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    margin:10px 0;\n    input{\n    width: 18px;\n    height: 18px;\n    background: #1565D8;\n    border-radius: 4px;\n    cursor: pointer;\n    transform:translateY(-3px);\n}\n    label{\n    /* width: 220px; */\n    height: 19px;\n    font-weight: 500;\n    font-size: ", "rem;\n    line-height: 10px;\n    margin-left: 7px;\n    color: ", ";\n}\n.primary{\n    color:", ";\n}\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CheckStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.font;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
});

exports.CheckStyled = CheckStyled;