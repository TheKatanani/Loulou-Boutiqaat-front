"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectError = exports.selectOTPData = exports.selectStatus = exports.clearError = exports.setStatusFailed = exports.setStatusSucceeded = exports.setStatusIdle = exports.setStatusLoading = exports.handleInputOTPChange = exports.handleInputChangeReducer = exports.OTPSlice = exports.verifyOTP = exports.sendOTP = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _Actions = require("../../Actions");

var _auth = require("firebase/auth");

var _firebase = _interopRequireDefault(require("../../firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/store/slices/OTPSlice.js
var initialState = {
  phone: "",
  verificationId: "",
  OTP: "",
  status: _Actions.STATUS.IDLE,
  error: null
};
var sendOTP = (0, _toolkit.createAsyncThunk)("OTP/sendOTP", function _callee(_ref, _ref2) {
  var phone, appVerifier, navigate, rejectWithValue, confirmationResult;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          phone = _ref.phone, appVerifier = _ref.appVerifier, navigate = _ref.navigate;
          rejectWithValue = _ref2.rejectWithValue;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _auth.signInWithPhoneNumber)(_firebase["default"], phone, appVerifier));

        case 5:
          confirmationResult = _context.sent;
          return _context.abrupt("return", {
            verificationId: confirmationResult.verificationId,
            navigate: navigate
          });

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", rejectWithValue(_context.t0.message));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
exports.sendOTP = sendOTP;
var verifyOTP = (0, _toolkit.createAsyncThunk)("OTP/verifyOTP", function _callee2(_ref3, _ref4) {
  var verificationId, otp, rejectWithValue, credential, userCredential;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          verificationId = _ref3.verificationId, otp = _ref3.otp;
          rejectWithValue = _ref4.rejectWithValue;
          _context2.prev = 2;
          credential = _auth.PhoneAuthProvider.credential(verificationId, otp);
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _auth.signInWithCredential)(_firebase["default"], credential));

        case 6:
          userCredential = _context2.sent;
          return _context2.abrupt("return", {
            user: userCredential.user
          });

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", rejectWithValue(_context2.t0.message));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
exports.verifyOTP = verifyOTP;
var OTPSlice = (0, _toolkit.createSlice)({
  name: 'OTP',
  initialState: initialState,
  reducers: {
    handleInputChangeReducer: function handleInputChangeReducer(state, action) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          value = _action$payload.value;
      state[id] = value;
    },
    handleInputOTPChange: function handleInputOTPChange(state, action) {
      state.OTP = action.payload;
    },
    setStatusIdle: function setStatusIdle(state) {
      state.status = _Actions.STATUS.IDLE;
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
    clearError: function clearError(state) {
      state.error = null;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(sendOTP.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
    }).addCase(sendOTP.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      action.payload.navigate('/verifyOTP');
      state.verificationId = action.payload.verificationId;
    }).addCase(sendOTP.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    }).addCase(verifyOTP.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
    }).addCase(verifyOTP.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
    }).addCase(verifyOTP.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    });
  }
});
exports.OTPSlice = OTPSlice;
var _OTPSlice$actions = OTPSlice.actions,
    handleInputChangeReducer = _OTPSlice$actions.handleInputChangeReducer,
    handleInputOTPChange = _OTPSlice$actions.handleInputOTPChange,
    setStatusLoading = _OTPSlice$actions.setStatusLoading,
    setStatusIdle = _OTPSlice$actions.setStatusIdle,
    setStatusSucceeded = _OTPSlice$actions.setStatusSucceeded,
    setStatusFailed = _OTPSlice$actions.setStatusFailed,
    clearError = _OTPSlice$actions.clearError;
exports.clearError = clearError;
exports.setStatusFailed = setStatusFailed;
exports.setStatusSucceeded = setStatusSucceeded;
exports.setStatusIdle = setStatusIdle;
exports.setStatusLoading = setStatusLoading;
exports.handleInputOTPChange = handleInputOTPChange;
exports.handleInputChangeReducer = handleInputChangeReducer;

var selectStatus = function selectStatus(state) {
  return state.OTP.status;
};

exports.selectStatus = selectStatus;

var selectOTPData = function selectOTPData(state) {
  return state.OTP;
};

exports.selectOTPData = selectOTPData;

var selectError = function selectError(state) {
  return state.OTP.error;
};

exports.selectError = selectError;
var _default = OTPSlice.reducer;
exports["default"] = _default;