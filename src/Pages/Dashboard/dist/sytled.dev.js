"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTable = exports.StyledAdd = exports.StyledForm = exports.StyledDashboard = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  td .checkbox{\n    justify-content:center;\n  }\n  width:100%;\n  overflow-x: auto;\n  margin: 20px 0;\n  box-shadow: 5px 5px 10px ", ";\n  @media (width <= 300px) {\n    .images{\n      display: none;\n    }\n  }\n  ", "{\n  .id\n,.description\n,.previous\n,.count\n,.barthDay\n,.gender\n,.password\n,.role\n,.stars{\n  display:none\n}}\n", "{\n  .id \n  ,.role\n  ,.barthDay\n  ,.gender\n  ,.description \n,.stars{\ndisplay:none\n}}\n  ", "{\n  .id\n,.description\n,.previous\n,.count\n,.barthDay\n,.gender\n,.password\n,.role\n,.stars{\ndisplay:table-cell\n}\n  }\n  th , td {\n    width: fit-content;\n    max-width: 150px;\n    padding: 5px;\n    text-align: center;\n  }\n  th{\n    background-color:", ";\n  }\n  td{\n    background-color:", "; \n    color:", "; \n    &.images{\n    img{\n      width: 30px;\n      height: 30px;\n      border-radius: 50%;\n      border:1px solid;\n      object-fit: cover;\n    }\n      overflow-x: auto;\n    }\n    button{\n      padding: 5px 7px;\n      border-radius: 8px;\n      cursor: pointer;\n      font-weight: bold;\n      ", "{\n        font-weight: normal;\n        padding: 2px 4px;\n        font-size: 1rem;\n  }\n      color:", "; \n      border:2px solid ", ";\n      &.update{\n        background-color:", ";\n      }\n      &.delete{\n        background-color:red;\n      }\n    }\n  }\n  tr{\n    &:nth-child(2n){\n      td{\n        background-color:", ";\n      }\n  }\n    \n    &.underUpdate \n    {\n      td{ \n        background-color:", ";\n      }\n      button{\n        background-color: ", ";\n        opacity: 0.7;\n        cursor:not-allowed;\n      }\n    }\n}\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  #description{\n    resize: vertical;\n    height: 100px;\n  }\n  form{\n    padding:20px;\n    margin-top: 20px; \n  }\n  .input{\n    margin-top: 20px;\n    input{\n      background-color:", ";\n    }\n      margin: 0px auto;\n      width: max(50%,100px);\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral([" \n  margin: 30px 0;\n  padding: 20px;\n  border-radius:8px;\n  background-color:", ";\n  box-shadow: 5px 5px 10px ", ";\n  .d-flex{\n    div{\n      flex:1;\n    }\n    display: flex;\n    justify-content: center;\n    align-items:end;\n    ", "{\n    flex-wrap: wrap;\n  }\n    ", "{\n    flex-wrap: wrap;\n  }\n    ", "{\n    flex-wrap: nowrap;\n  }\n    gap:10px;\n    .input,.select,select{\n      width: 100%;\n    }\n  }\n  button{\n  background-color:", ";\n  &.disabled{\n    opacity: 0.7;\n    background-color:", ";\n    cursor:not-allowed\n    }\n  } \n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n.content{\n  display: flex; \n  gap:20px;\n  min-height: calc(100dvh - 63.2px);\n}\n  ", "{\n    padding-inline-start: 0px;\n  }\n  ", "{\n    padding-inline-start: 0px;\n  }\n  ", "{\n  .container{\n    max-width: 1150px;\n    margin: 0 auto;\n  }\n  }\n  .layout{\n    position:fixed;\n    inset:0;\n    background-color: ", "55;\n  }\n  ", "{\n  main{\n    padding-inline-start: 140px;\n  }\n  }\n  aside{\n    position: fixed;\n    z-index: 999;\n    top:0;\n    padding: 30px  0px;\n    min-height: 100vh;\n    background-color:", ";\n    transition: .3s;\n    button{\n      display: none;\n    }\n    ", "{\n      &.opened{\n        inset-inline-start: 0px; \n      } \n      &.colsed{\n        inset-inline-start: -105px; \n      } \n    button{  \n      display: block;\n      position:absolute;\n      width:fit-content;\n      color:", ";\n      background-color:", ";\n      top:0;\n      right: -18px;\n      padding:2px 5px;\n      border-top-left-radius:0;\n      border-bottom-left-radius:0;\n    }\n  }\n    li{\n      a{\n        display: block;\n        width: 100%;\n        padding: 25px 20px;\n        color:", ";\n        transition: 0.3s; \n    } \n    :hover{\n      background-color:", ";\n    }\n    }\n    li:last-child{\n            padding:15px 5px;\n            >div{\n                position:unset;\n                background-color:", "; \n                display: flex;\n                flex-wrap: wrap; \n                justify-content:center;\n                align-items: center;\n                gap:10px;\n                text-align: center;\n                button{\n                    display: block;\n                    border: 1px solid ", ";\n                    a{\n                      padding: 0;\n                    }\n                }\n            }\n            :hover{\n      background-color:transparent;\n    }\n    ", "{\n      display:none\n    }\n    ", "{\n      display:none\n    }\n    ", "{\n      display:initial\n    } \n        }\n  }\n  main{\n    flex:1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledDashboard = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var media = _ref.theme.media;
  return media.xs;
}, function (_ref2) {
  var media = _ref2.theme.media;
  return media.s;
}, function (_ref3) {
  var media = _ref3.theme.media;
  return media.xl;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.palette.ColorApp.gray_600;
}, function (_ref5) {
  var media = _ref5.theme.media;
  return media.s;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.palette.main;
}, function (_ref7) {
  var media = _ref7.theme.media;
  return media.xs;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.palette.ColorApp.white;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.palette.ColorApp.primary;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.palette.font;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.palette.ColorApp.primary_light;
}, function (props) {
  return props.theme.palette.ColorApp.gray_200;
}, function (props) {
  return props.theme.palette.ColorApp.gray_500;
}, function (_ref12) {
  var media = _ref12.theme.media;
  return media.xs;
}, function (_ref13) {
  var media = _ref13.theme.media;
  return media.s;
}, function (_ref14) {
  var media = _ref14.theme.media;
  return media.m;
});

exports.StyledDashboard = StyledDashboard;

var StyledForm = _styledComponents["default"].form(_templateObject2(), function (_ref15) {
  var theme = _ref15.theme;
  return theme.palette.main;
}, function (props) {
  return props.theme.palette.ColorApp.gray_100;
}, function (_ref16) {
  var media = _ref16.theme.media;
  return media.xs;
}, function (_ref17) {
  var media = _ref17.theme.media;
  return media.s;
}, function (_ref18) {
  var media = _ref18.theme.media;
  return media.m;
}, function (_ref19) {
  var theme = _ref19.theme;
  return theme.palette.ColorApp.primary_light;
}, function (_ref20) {
  var theme = _ref20.theme;
  return theme.palette.ColorApp.gray_500;
});

exports.StyledForm = StyledForm;

var StyledAdd = _styledComponents["default"].div(_templateObject3(), function (_ref21) {
  var theme = _ref21.theme;
  return theme.palette.main;
});

exports.StyledAdd = StyledAdd;

var StyledTable = _styledComponents["default"].table(_templateObject4(), function (props) {
  return props.theme.palette.ColorApp.gray_100;
}, function (_ref22) {
  var media = _ref22.theme.media;
  return media.xs;
}, function (_ref23) {
  var media = _ref23.theme.media;
  return media.s;
}, function (_ref24) {
  var media = _ref24.theme.media;
  return media.l;
}, function (_ref25) {
  var theme = _ref25.theme;
  return theme.palette.ColorApp.primary_light;
}, function (_ref26) {
  var theme = _ref26.theme;
  return theme.palette.main;
}, function (_ref27) {
  var theme = _ref27.theme;
  return theme.palette.font;
}, function (_ref28) {
  var media = _ref28.theme.media;
  return media.xs;
}, function (_ref29) {
  var theme = _ref29.theme;
  return theme.palette.main;
}, function (_ref30) {
  var theme = _ref30.theme;
  return theme.palette.ColorApp.gray_100;
}, function (_ref31) {
  var theme = _ref31.theme;
  return theme.palette.ColorApp.primary_light;
}, function (_ref32) {
  var theme = _ref32.theme;
  return theme.palette.ColorApp.gray_200;
}, function (_ref33) {
  var theme = _ref33.theme;
  return theme.palette.ColorApp.gray_400;
}, function (_ref34) {
  var theme = _ref34.theme;
  return theme.palette.ColorApp.gray_400;
});

exports.StyledTable = StyledTable;