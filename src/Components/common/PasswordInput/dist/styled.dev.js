"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledPasswordInput = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral([" \n        position:relative;\n        direction:rtl;\n        top:2px;\n        left:0;  \n        span{\n          position:absolute;\n        img{\n            width:22px;\n        }\n        top:50%;\n        transform:translateY(-14%);\n        left: 12px;\n        cursor: pointer;\n    } \n    &.text span::before{\n        content: \"\";\n        width: 3px;\n        height: 22px;\n        font-size: 30px;\n        font-weight: bold;\n        background-color: #8692a6;\n        position: absolute;\n        border-radius: 8px;\n        top: -2px;\n        left: 50%;\n        transform: translateX(-50%) rotate(30deg);\n        opacity: 0.8;\n    }\n    .forgotPassword{\n        position:absolute;\n        top:2px;\n        left:0;\n        font-size: 0.8rem;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledPasswordInput = _styledComponents["default"].div(_templateObject());

exports.StyledPasswordInput = StyledPasswordInput;