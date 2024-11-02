"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCard = exports.StyledTransactionOne = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  text-decoration: none;\n  color: #fff; \n  overflow: hidden;\n  position:relative;\n  padding: 20px; \n  border-radius: 8px;\n  border:1px solid;\n  cursor: pointer;\n  transition: 0.4s;\n  box-shadow: 5px 5px 10px   ", ";\n  header{\n    margin-top: 20px;\n    padding: 15px;\n    transform: translateY(-1rem);\n    h3{\n      padding: 10px 0;\n    }\n  } \nfooter{\n  padding: 20px;\n  margin-top: 30px;\n  display: flex;\n  justify-content: space-between;\n  transform: translateY(1rem);\n  width: 100%;\n    a{\n      color:", "; \n    }\n    .arrow{\n      background-color: #00a6ed; \n      border:1px solid  #00a6ed;\n      transform: translatex(-3rem)  rotate(180deg);\n      transition: .4s ease-in-out 0.4s;\n      border-radius: 50%;\n      width: 20px;\n      height: 20px;\n      cursor: pointer;\n      animation: arrow 1s infinite ease-in-out .4s forwards;\n    }\n    @keyframes arrow {\n      0%{\n      transform:translateX(0rem)\n    }\n      50%{\n      transform:translateX(.8rem)\n    }\n      80%{\n      transform:translateX(1rem)\n    }\n    }\n  }\n  img{\n    z-index: 1;\n    object-fit: cover;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    inset: 0;\n    transform: scale(1.2);\n    transition:transform 0.4s ease-out;\n  }\n  >div{\n      position: relative;\n      z-index: 3;\n    }\n  header,footer{\n    opacity: 0;\n    visibility: hidden;\n    transition: .4s ease-in-out ;\n  }\n  ::before{\n    content:'';\n    position: absolute;\n    inset:0;\n    background: linear-gradient(360deg,#000,#555);\n    opacity:0;\n    transition: 0.4s ease-in-out;\n    z-index: 2;\n  } \n    \n  width:100px;\n  height:300px;\n\n  &.active{\n    min-width: 220px;\n  }  \n  &.active , :hover{\n    width: 300px;\n  }  \n  &.active , :hover{\n  .arrow {\n    transform: translatex(0rem);\n  }\n  } \n  &.active , :hover{\n    ::before {\n      opacity: 0.75;\n    }\n  } >\n  div { \n    }\n\n  header,footer{\n\n    opacity: 0;\n\n    visibility: hidden;\n\n    transition: .4s ease-in-out ;\n\n  }\n\n  &.active , :hover{\n\n    header,\n\n  footer{\n\n    transform: translateY(0);\n\n    opacity: 1;\n\n    visibility: visible;\n\n  }\n\n  }   \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  padding: 60px 0;\n  min-height: calc(100vh - 113px);\n", "\n.two{\n  display:flex;\n  justify-content: center;\n  align-items: center; \n  overflow:auto;\n}\n.one{\n  display: grid;\n  grid-template-columns: repeat(3,auto);\n}\n.one,.two{\n  gap: 10px;\n  margin: 30px;\n  padding: 30px 0;\n  ", "{\n    gap:5px;\n    } \n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledTransactionOne = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.palette.main;
}, function (_ref) {
  var card = _ref.card,
      theme = _ref.theme;
  return card === 'one' ? "\n" : "\nbackground - color: $ {\n  $ {\n    theme.palette.main\n  }\n};\n";
}, function (_ref2) {
  var media = _ref2.theme.media;
  return media.xs;
});

exports.StyledTransactionOne = StyledTransactionOne;

var StyledCard = _styledComponents["default"].a(_templateObject2(), function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.primary_light;
});

exports.StyledCard = StyledCard;