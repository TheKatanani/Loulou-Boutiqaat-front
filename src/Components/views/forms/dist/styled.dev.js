"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledRigisterForm = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sytled = require("../../../Pages/Dashboard/sytled");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nborder-bottom: 1px solid ", ";\n    padding:0;\n    margin:0;\n    .name{\n        display: flex;\n        align-items:center;\n    }\n    select{\n        width: 100%;\n    }\n    .d-flex{\n        display:flex;\n        align-items: center;\n    }\n    .phone{\n    label{\n        color:", ";      \n    }\n    .cansel{\n        margin: 10px 0;\n    }\n    >div{\n        display: flex;\n        align-items:center;\n        >*{\n            flex: 1;\n        }\n    }\n   }\n   .gender{\n     margin: 10px 0;\n     display: flex;\n    gap: 20px;\n    align-items: center;\n    label{\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        color:", ";\n        input{\n            margin-inline-end: 5px;\n        }    \n    }\n   } \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledRigisterForm = (0, _styledComponents["default"])(_sytled.StyledForm)(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.font;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.palette.font;
});
exports.StyledRigisterForm = StyledRigisterForm;