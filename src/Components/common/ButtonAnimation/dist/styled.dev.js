"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledButton = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _components = require("../../../Global/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n  p{\n    margin: 0 !important;\n    padding: 0;\n    color:", ";      \n  }\n  .loader{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 3px;\n    >span{\n      animation:1s ease-in-out infinite buttonLoader;\n      width: 5px;\n      height: 5px;\n      border-radius: 50%;\n      background-color: #fff;\n      border:1px solid black;\n      &:nth-child(2){ \n        animation-delay: 0.2s;\n      }\n      &:nth-child(3){\n        animation-delay: 0.4s;\n      }\n    }\n  }\n  @keyframes buttonLoader {\n    0%{\n      opacity:0;\n    }\n    40%{\n      opacity: 1;\n    }\n    80%{\n      opacity:0;\n    }\n    100%{\n      opacity:0;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledButton = (0, _styledComponents["default"])(_components.MainButton)(_templateObject(), function (props) {
  return props.theme.palette.font;
});
exports.StyledButton = StyledButton;