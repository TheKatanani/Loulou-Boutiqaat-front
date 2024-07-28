"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledContactus = exports.StyledVerifyOTP = exports.StyledForgotPassword = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n\n  .container{\n    min-height:calc(100vh - 63.2px); \n    display: flex;\n    justify-content:space-evenly;\n    align-items:center;\n    text-align:center;\n    ", "{\n      flex-direction: column;\n      justify-content:center;\n    }\n    ", "{  \n      justify-content:center;\n      flex-direction: column;\n    }\n    ", "{  \n    justify-content:space-evenly;\n    flex-direction: row;\n    }\n    img{\n      width:50%; \n    }\n    h1{\n      font-size:", "rem;\n      color:", ";\n      /* color:", "; */\n    }\n    p{\n      color:", ";\n      margin:10px 0 25px;\n      font-size:", "rem;\n    }\n    .buttons{\n      display: flex;\n      justify-content:center;\n      align-items:center;\n      text-align:center;\n      gap: 15px;\n      a{\n        display: block;\n      }\n      button{\n        width:fit-content;\n        padding:10px 20px;\n        font-weight: bold;\n        &.signIn{\n          color:", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display:grid;\n  place-content:center;\n  min-height:100vh; \n.container{\n  width: 400px;\n  padding: 3rem 4rem;\n  background-color: #ffffff;\n  border-radius: 16px; \n}\n\nh3.title {\n  font-size: 28px;\n  font-weight: 700;\n  color: #093030;\n  margin-bottom: 25px;\n}\n\np.sub-title {\n  color: #B5BAB8;\n  font-size: 14px;\n  margin-bottom: 25px;\n}\n\np span.phone-number {\n  display: block;\n  color: #093030;\n  font-weight: 600;\n}\n\n.wrapper {\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  justify-items: space-between;\n}\n\n.wrapper input  {\n  width: 50px;\n  line-height: 75px;\n  font-size: 32px;\n  border: none;\n  background-color: #EAF5F6;\n  border-radius: 5px;\n  text-align: center;\n  text-transform: uppercase;\n  color: #093030;\n  margin-bottom: 25px;\n}\n\n.wrapper input:focus {\n  outline: none;\n}\n\nbutton.resend {\n  background-color: transparent;\n  border: none;\n  font-weight: 600;\n  color: #3DAFE1;\n  cursor: pointer;\n  margin-top:1rem;\n} \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display:grid;\n  place-content:center;\n  min-height:100vh;\n  >div{\n    h3{\n      text-align: center;\n      margin-bottom: 1rem;\n    }\n    background-color:", ";\n    color:", ";\n    border-radius:16px; \n    padding:2rem;\n    /* width:min(400px,100%); */\n    width:400px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledForgotPassword = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.main;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.font;
});

exports.StyledForgotPassword = StyledForgotPassword;

var StyledVerifyOTP = _styledComponents["default"].div(_templateObject2());

exports.StyledVerifyOTP = StyledVerifyOTP;

var StyledContactus = _styledComponents["default"].div(_templateObject3(), function (_ref3) {
  var media = _ref3.theme.media;
  return media.xs;
}, function (_ref4) {
  var media = _ref4.theme.media;
  return media.s;
}, function (_ref5) {
  var media = _ref5.theme.media;
  return media.m;
}, function (props) {
  return props.theme.fontSizes.h1 * 1.5;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.palette.font;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.palette.ColorApp.primary;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.palette.font;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.palette.ColorApp.primary;
});

exports.StyledContactus = StyledContactus;