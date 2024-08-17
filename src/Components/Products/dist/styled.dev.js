"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductsStyled = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    direction:rtl;\n    .content2{\n        height:calc(100% - 40px);\n        margin: 20px 0 30px;\n        ", "\n         ", " {\n            /* grid-template-columns:repeat(1,auto); */\n            justify-content:center;\n    }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ProductsStyled = _styledComponents["default"].div(_templateObject(), function (props) {
  return !props.full && "\n            display: grid;\n            grid-template-columns:repeat(auto-fill,minmax(250px,auto));\n            justify-content:space-between;\n            gap:10px;\n        ";
}, function (_ref) {
  var media = _ref.theme.media;
  return media.xs;
});

exports.ProductsStyled = ProductsStyled;