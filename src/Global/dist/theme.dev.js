"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkTheme = exports.lightTheme = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fontSizes = {
  h1: 3,
  h2: 2.5,
  h3: 2.0,
  h4: 1.8,
  h5: 1.6,
  h6: 1.4,
  body: 1.1,
  body2: 0.76
};
var media = {
  // X-Small devices (portrait phones, less than 576px)
  xs: '@media (max-width: 575.9px)',
  // Small devices (landscape phones, 576px and up)
  s: '@media (min-width: 576px)',
  // Medium devices (tablets, 768px and up)
  m: '@media (min-width: 768px)',
  // Large devices (desktops, 992px and up)
  l: '@media (min-width: 992px)',
  // X-Large devices (large desktops, 1200px and up)
  xl: '@media (min-width: 1200px)',
  // XX-Large devices (larger desktops, 1400px and up)
  xxl: '@media (min-width: 1400px)'
};
var ColorApp = {
  primary: "#843abc",
  primary_gradient: "linear-gradient(180deg, #127FFF 0%, #0067FF 100%)",
  primary_light: "#ad7cd3",
  orange: "#FF9017",
  green: "#00B517",
  dark: "#1C1C1C",
  white: "#FFFFFF",
  gray_800: "#606060",
  gray_600: "#505050",
  gray_500: "#8B96A5",
  gray_400: "#BBBCBE",
  gray_300: "#E3E8EE",
  gray_200: "#EFF2F4",
  gray_100: "#F7FAFC"
};
var lightTheme = {
  theme: 'light',
  palette: {
    main: ColorApp.white,
    ColorApp: ColorApp,
    page: ColorApp.gray_100,
    font: ColorApp.dark
  },
  fontSizes: fontSizes,
  media: media
};
exports.lightTheme = lightTheme;
var darkTheme = {
  theme: 'dark',
  palette: {
    main: ColorApp.dark,
    ColorApp: _objectSpread({}, ColorApp, {
      gray_800: "#F7FAFC",
      gray_600: "#EFF2F4",
      gray_500: "#E3E8EE",
      gray_300: "#8B96A5",
      gray_200: "#505050",
      gray_100: "#606060"
    }),
    page: ColorApp.gray_800,
    font: ColorApp.white
  },
  fontSizes: fontSizes,
  media: media
};
exports.darkTheme = darkTheme;