"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiSignIn = exports.FaceButton = exports.GoogleButton = exports.IconButton = exports.Info = exports.NewsletterButton = exports.WhitePrimaryButton = exports.PrimaryButton = exports.LogInButton = exports.ButtonUpadte = exports.MainButton = exports.Container = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n    background-color:", ";\n    border: 1px solid #EEEEEE;\n    border-radius: 4px;\n    padding:2px;\n    width:35px;\n    text-align:center;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n    background-color: #4267B2;\n    color:", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    color:", ";\n    box-shadow: 0px 1px 3px rgba(56, 56, 56, 0.1);\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n    position:relative;\n    margin:10px 0;\n    img{\n        position:absolute;\n        left:11px;\n        top:9px;\n        width:22px\n    }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n            display: flex;\n            justify-content:flex-start;\n            align-items:baseline;\n            margin:7px 0;\n            > div , > p{\n                position:relative;\n                margin:5px 25px 5px 0;\n            }\n            *:not(:last-child)::after{\n                content:\"\";\n                position: absolute;\n                width:8px;\n                height:8px;\n                right:-15px;\n                top:50%;\n                border-radius: 50%;\n                transform:translateY(-50%);\n                background-color:", ";\n            }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    width:fit-content;\n    padding:10px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    border: 1px solid ", ";\n    background-color:", ";\n    color:", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    background-color:", ";\n    color:", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    background-color: ", ";\n    color:", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    padding: 5px 7px;\n    border-radius: 8px;\n    cursor: pointer;\n    font-weight: bold;\n    color:", ";\n    text-decoration: none!important;;\n    display:block;\n    font-size: ", "rem;\n    background-color:", ";\n    ", "{\n        font-weight: normal;\n        padding: 2px 4px;\n        font-size: 1rem;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    height: 40px;\n    border-radius: 6px;\n    font-weight: 500;\n    font-size: ", "rem;\n    color: ", ";\n    line-height: 19px;\n    text-align: center;\n    cursor: pointer;\n    border: none;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding: 0;\n    margin: 0 auto;\n/* Small */\n@media (min-width: 768px) {\n    width: 750px;\n}\n/* Medium */\n@media (min-width: 992px) {\n    width: 970px;\n}\n/* Large */\n@media (min-width: 1200px) {\n    width: 1170px;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents["default"].div(_templateObject());

exports.Container = Container;

var MainButton = _styledComponents["default"].button(_templateObject2(), function (props) {
  return props.theme.fontSizes.body;
}, function (props) {
  return props.theme.palette.font;
});

exports.MainButton = MainButton;

var ButtonUpadte = _styledComponents["default"].button(_templateObject3(), function (_ref) {
  var theme = _ref.theme;
  return theme.palette.ColorApp.white;
}, function (props) {
  return props.theme.fontSizes.body;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.ColorApp.primary_light;
}, function (_ref3) {
  var media = _ref3.theme.media;
  return media.xs;
});

exports.ButtonUpadte = ButtonUpadte;
var LogInButton = (0, _styledComponents["default"])(MainButton)(_templateObject4(), function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.white;
});
exports.LogInButton = LogInButton;
var PrimaryButton = (0, _styledComponents["default"])(MainButton)(_templateObject5(), function (props) {
  return props.theme.palette.ColorApp.primary;
}, function (props) {
  return props.theme.palette.ColorApp.white;
});
exports.PrimaryButton = PrimaryButton;
var WhitePrimaryButton = (0, _styledComponents["default"])(MainButton)(_templateObject6(), function (props) {
  return props.theme.palette.ColorApp.gray_300;
}, function (props) {
  return props.theme.palette.ColorApp.white;
}, function (props) {
  return props.theme.palette.ColorApp.primary;
});
exports.WhitePrimaryButton = WhitePrimaryButton;
var NewsletterButton = (0, _styledComponents["default"])(LogInButton)(_templateObject7());
exports.NewsletterButton = NewsletterButton;

var Info = _styledComponents["default"].div(_templateObject8(), function (props) {
  return props.theme.palette.ColorApp.gray_300;
});

exports.Info = Info;

var IconButton = _styledComponents["default"].div(_templateObject9());

exports.IconButton = IconButton;
var GoogleButton = (0, _styledComponents["default"])(MainButton)(_templateObject10(), function (props) {
  return props.theme.palette.ColorApp.gray_200;
}, function (props) {
  return props.theme.palette.ColorApp.gray_800;
});
exports.GoogleButton = GoogleButton;
var FaceButton = (0, _styledComponents["default"])(MainButton)(_templateObject11(), function (props) {
  return props.theme.palette.ColorApp.white;
});
exports.FaceButton = FaceButton;

var LiSignIn = _styledComponents["default"].li(_templateObject12(), function (props) {
  return props.theme.palette.ColorApp.white;
});

exports.LiSignIn = LiSignIn;