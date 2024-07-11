"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledHero = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* background: linear-gradient(45deg,", ",#843abc); */\n  .conatainer{ \n  min-height:calc(100dvh - 113px); \n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center; \n}\nfigure {\n  flex: 1;\n  text-align: center;\n  img{\n    width: min(100%,300px);\n    filter: drop-shadow(2px 4px 6px white);\n    min-width: 250px\n  }\n}\ncolor:", ";  \n.text{\n  min-width: min(100%,400px);\n  flex: 1;\n  padding: 20px;\n  text-align: center;\n  font-family: 'Times New Roman', Times, serif;\n  h1{\n    font-size: 5rem;\n  }\n  p{\n    font-size: 1.2rem;\n    direction:rtl;\n    padding: 20px;\n    color:", ";\n    /* color:black;   */\n    font-size:22px;\n    font-weight:bold;\n      margin-top: 30px;\n      line-height: 35px;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledHero = _styledComponents["default"].section(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.palette.ColorApp.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.ColorApp.primary;
});

exports.StyledHero = StyledHero;