"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setStatusFailed = exports.showPassword = exports.handleCheckBoxChange = exports.setError = exports.setLoading = exports.handleInputChange = exports.selectError = exports.selectStatus = exports.selectcheckout = exports.selectFormData = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _Actions = require("../../Actions");

var checkoutSlice = (0, _toolkit.createSlice)({
  name: 'checkout',
  initialState: {
    formData: {
      location: ''
    },
    error: {},
    status: ''
  },
  reducers: {
    handleInputChange: function handleInputChange(state, action) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          value = _action$payload.value;
      state.formData[id] = value;
    },
    setStatusIdle: function setStatusIdle(state) {
      state.status = 'idle';
    },
    setStatusLoading: function setStatusLoading(state) {
      state.status = _Actions.STATUS.LOADING;
    },
    setStatusSucceeded: function setStatusSucceeded(state) {
      state.status = _Actions.STATUS.SUCCEEDED;
    },
    setStatusFailed: function setStatusFailed(state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    },
    setError: function setError(state, action) {
      state.error = action.payload.errors;
    },
    showPassword: function showPassword(state) {
      state.showPassword = !state.showPassword;
    }
  }
});

var selectFormData = function selectFormData(state) {
  return state.checkout.formData;
};

exports.selectFormData = selectFormData;

var selectcheckout = function selectcheckout(state) {
  return state.checkout.formData;
};

exports.selectcheckout = selectcheckout;

var selectStatus = function selectStatus(state) {
  return state.checkout.status;
};

exports.selectStatus = selectStatus;

var selectError = function selectError(state) {
  return state.checkout.error;
};

exports.selectError = selectError;
var _checkoutSlice$action = checkoutSlice.actions,
    handleInputChange = _checkoutSlice$action.handleInputChange,
    setLoading = _checkoutSlice$action.setLoading,
    setError = _checkoutSlice$action.setError,
    handleCheckBoxChange = _checkoutSlice$action.handleCheckBoxChange,
    showPassword = _checkoutSlice$action.showPassword,
    setStatusFailed = _checkoutSlice$action.setStatusFailed;
exports.setStatusFailed = setStatusFailed;
exports.showPassword = showPassword;
exports.handleCheckBoxChange = handleCheckBoxChange;
exports.setError = setError;
exports.setLoading = setLoading;
exports.handleInputChange = handleInputChange;
var _default = checkoutSlice.reducer;
exports["default"] = _default;