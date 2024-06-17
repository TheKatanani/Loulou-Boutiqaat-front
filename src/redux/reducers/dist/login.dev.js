"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.showPassword = exports.handleCheckBoxChange = exports.clearError = exports.setStatusFailed = exports.setStatusSucceeded = exports.setStatusLoading = exports.setStatusIdle = exports.handleInputChange = exports.selectError = exports.selectStatus = exports.selectFormData = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initailState = {
  phone: "",
  selectPhone: "+972",
  password: "",
  agree: false,
  showPassword: false
};
var loginSlice = (0, _toolkit.createSlice)({
  name: 'login',
  initialState: {
    formData: initailState,
    status: 'idle',
    error: null
  },
  reducers: {}
});

var selectFormData = function selectFormData(state) {
  return state.login.formData;
};

exports.selectFormData = selectFormData;

var selectStatus = function selectStatus(state) {
  return state.login.status;
};

exports.selectStatus = selectStatus;

var selectError = function selectError(state) {
  return state.login.error;
};

exports.selectError = selectError;
var _loginSlice$actions = loginSlice.actions,
    handleInputChange = _loginSlice$actions.handleInputChange,
    setStatusIdle = _loginSlice$actions.setStatusIdle,
    setStatusLoading = _loginSlice$actions.setStatusLoading,
    setStatusSucceeded = _loginSlice$actions.setStatusSucceeded,
    setStatusFailed = _loginSlice$actions.setStatusFailed,
    clearError = _loginSlice$actions.clearError,
    handleCheckBoxChange = _loginSlice$actions.handleCheckBoxChange,
    showPassword = _loginSlice$actions.showPassword;
exports.showPassword = showPassword;
exports.handleCheckBoxChange = handleCheckBoxChange;
exports.clearError = clearError;
exports.setStatusFailed = setStatusFailed;
exports.setStatusSucceeded = setStatusSucceeded;
exports.setStatusLoading = setStatusLoading;
exports.setStatusIdle = setStatusIdle;
exports.handleInputChange = handleInputChange;
var _default = loginSlice.reducer;
exports["default"] = _default;