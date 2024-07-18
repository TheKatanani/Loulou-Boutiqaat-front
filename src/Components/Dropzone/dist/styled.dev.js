"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledDropzone = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin:20px 0;\n  min-height: 200px;\n  border: 2px dashed ", "; \n  padding: '20px';\n  text-align: 'center' ;\n  border-radius:16px;\n  display: grid;\n  place-content:center;\n  p{\n    padding:10px;\n    color:", ";  \n  }\n  img{\n    max-width: 300px;\n    max-height: 300px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledDropzone = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.ColorApp.gray_400;
}, function (props) {
  return props.theme.palette.ColorApp.gray_400;
});

exports.StyledDropzone = StyledDropzone;