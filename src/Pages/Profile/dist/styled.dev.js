"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledUpdateUserInfo = exports.StyledProfile = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n/* margin: 30px 0; */\ndisplay:grid;\nplace-content:center;\nmin-height: 60vh;\nform{\n    direction:rtl;\n    padding: 20px;\n    margin:0 auto;\n    border-radius:8px;\n    box-shadow: 5px 5px 10px ", ";\n    background-color:", ";\n    padding:2rem; \n    width:400px;\n    /* width: min(400px , 100%) */ \n    color:", ";\n    .phone{\n      display: flex;\n      text-align:end;\n      gap:10px;\n      align-items:center;\n      direction: ltr;\n      .input{\n        flex:1;\n      }\n    }\n\n    .passwordInput{\n      position: relative;\n      .forgotPassword{\n        position:absolute;\n        left:0;\n        top:0;\n        font-size:", "rem;\n      }\n    }\n    .gender{\n      margin:10px;\n      label:nth-child(2){\n        margin:0 20px 0 0;\n        /* margin:10px 10px 10px 0; */\n      }\n      input{\n        margin-left: 6px;\n        transform: translateY(1px);\n      }\n    }\n  } \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  direction:rtl;\n  margin: 160px 0 60px;\n  min-height:calc(50dvh - 113px);\n  color:", ";\n  p{\n    text-transform: capitalize;\n  }\n  .container{\n    display: grid;\n    place-content: center;\n  } \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledProfile = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.font;
});

exports.StyledProfile = StyledProfile;

var StyledUpdateUserInfo = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.palette.ColorApp.gray_100;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.main;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body2;
});

exports.StyledUpdateUserInfo = StyledUpdateUserInfo;