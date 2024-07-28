"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.showPassword = exports.handleCheckBoxChange = exports.setError = exports.setLoading = exports.handleInputChange = exports.selectStatus = exports.selectSocial = exports.selectFormData = exports.updateSocial = exports.setSocial = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _Actions = require("../../Actions");

var _axios = _interopRequireDefault(require("../../api/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var socialSlice = (0, _toolkit.createSlice)({
  name: 'social',
  initialState: {
    formData: {},
    error: {},
    status: [] // status: [{
    //     name: 'Instagram',
    //     status: 'idle'
    // }],

  },
  reducers: {
    handleInputChange: function handleInputChange(state, action) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          value = _action$payload.value;
      state.formData = state.formData.map(function (social) {
        return social.name === id ? _objectSpread({}, social, {
          value: value
        }) : social;
      });
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
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(setSocial.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
    }).addCase(setSocial.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.formData = action.payload;
    }).addCase(setSocial.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    }).addCase(updateSocial.pending, function (state, action) {
      // state.status = STATUS.LOADING;
      state.status = [];
      var name = action.meta.arg.social.name;
      console.log(action.meta.arg.social.name);
      var index = state.status.findIndex(function (el) {
        return el.name === name;
      });
      console.log("index", index);

      if (index !== -1) {
        state.status[index] = _objectSpread({}, state.status[index], {
          status: _Actions.STATUS.LOADING
        });
      } else {
        state.status.push({
          name: name,
          status: _Actions.STATUS.LOADING
        });
      }
    }).addCase(updateSocial.fulfilled, function (state, action) {
      // state.status = STATUS.SUCCEEDED;
      var name = action.meta.arg.social.name;
      var index = state.status.findIndex(function (el) {
        return el.name === name;
      });
      console.log("index", index);

      if (index !== -1) {
        state.status[index] = _objectSpread({}, state.status[index], {
          status: _Actions.STATUS.SUCCEEDED
        });
      }
    }).addCase(updateSocial.rejected, function (state, action) {
      // state.status = STATUS.FAILED;
      var name = action.meta.arg.social.name;
      console.log(action.meta.arg.social.name);
      var index = state.status.findIndex(function (el) {
        return el.name === name;
      });

      if (index !== -1) {
        state.status[index] = _objectSpread({}, state.status[index], {
          status: _Actions.STATUS.FAILED
        });
      }

      state.error = action.payload;
    });
  }
});
var setSocial = (0, _toolkit.createAsyncThunk)("social/setSocial", function _callee() {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/social"));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.setSocial = setSocial;
var updateSocial = (0, _toolkit.createAsyncThunk)("socials/updateSocial", function _callee2(_ref) {
  var social, axiosPrivate, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          social = _ref.social, axiosPrivate = _ref.axiosPrivate;
          _context2.next = 3;
          return regeneratorRuntime.awrap(axiosPrivate.put("/social", social));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // export const saveSocial = createAsyncThunk(
//     "socials/saveSocial",
//     async ({
//         social
//     }) => {
//         const response = await axios.post(`${API}/social`, {
//             ...social
//         });
//         return response.data
//     }
// )

exports.updateSocial = updateSocial;

var selectFormData = function selectFormData(state) {
  return state.social.formData;
};

exports.selectFormData = selectFormData;

var selectSocial = function selectSocial(state) {
  return state.social.formData;
};

exports.selectSocial = selectSocial;

var selectStatus = function selectStatus(state) {
  return state.social.status;
};

exports.selectStatus = selectStatus;
var _socialSlice$actions = socialSlice.actions,
    handleInputChange = _socialSlice$actions.handleInputChange,
    setLoading = _socialSlice$actions.setLoading,
    setError = _socialSlice$actions.setError,
    handleCheckBoxChange = _socialSlice$actions.handleCheckBoxChange,
    showPassword = _socialSlice$actions.showPassword;
exports.showPassword = showPassword;
exports.handleCheckBoxChange = handleCheckBoxChange;
exports.setError = setError;
exports.setLoading = setLoading;
exports.handleInputChange = handleInputChange;
var _default = socialSlice.reducer;
exports["default"] = _default;