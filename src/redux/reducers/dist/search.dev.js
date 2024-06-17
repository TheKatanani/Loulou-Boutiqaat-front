"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectError = exports.selectCategoryId = exports.selectSearchTerm = exports.selectStatus = exports.selectSearchResults = exports.clearError = exports.setStatusFailed = exports.setStatusSucceeded = exports.setStatusLoading = exports.setStatusIdle = exports.setSearchResults = exports.setCategory = exports.setSearchTerm = exports.fetchSearchResults = exports.productsSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _axios = _interopRequireDefault(require("axios"));

var _API = require("../../API");

var _Actions = require("../../Actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productsSlice = (0, _toolkit.createSlice)({
  name: 'search',
  //this is a key
  initialState: {
    searchResults: [],
    status: 'idle',
    searchTerm: '',
    categoryId: '',
    error: null
  },
  reducers: {
    setSearchResults: function setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setStatusIdle: function setStatusIdle(state) {
      state.status = 'idle';
    },
    setSearchTerm: function setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setCategory: function setCategory(state, action) {
      state.categoryId = action.payload;
    },
    setStatusLoading: function setStatusLoading(state) {
      state.status = 'loading';
    },
    setStatusSucceeded: function setStatusSucceeded(state) {
      state.status = 'succeeded';
    },
    setStatusFailed: function setStatusFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearError: function clearError(state) {
      state.error = null;
    }
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchSearchResults.pending, function (state) {
      state.status = _Actions.STATUS.LOADING;
    }).addCase(fetchSearchResults.fulfilled, function (state, action) {
      state.status = _Actions.STATUS.SUCCEEDED;
      state.searchResults = action.payload;
    }).addCase(fetchSearchResults.rejected, function (state, action) {
      state.status = _Actions.STATUS.FAILED;
      state.error = action.payload;
    });
  }
});
exports.productsSlice = productsSlice;
var fetchSearchResults = (0, _toolkit.createAsyncThunk)("products/fetchSearchResults", function _callee(payload) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_API.API, "/products?name_like=").concat(encodeURIComponent(payload.searchTerm)).concat(payload.categoryId && "&categoryId=" + payload.categoryId)));

        case 2:
          response = _context.sent;
          return _context.abrupt("return", response);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.fetchSearchResults = fetchSearchResults;
var _productsSlice$action = productsSlice.actions,
    setSearchTerm = _productsSlice$action.setSearchTerm,
    setCategory = _productsSlice$action.setCategory,
    setSearchResults = _productsSlice$action.setSearchResults,
    setStatusIdle = _productsSlice$action.setStatusIdle,
    setStatusLoading = _productsSlice$action.setStatusLoading,
    setStatusSucceeded = _productsSlice$action.setStatusSucceeded,
    setStatusFailed = _productsSlice$action.setStatusFailed,
    clearError = _productsSlice$action.clearError;
exports.clearError = clearError;
exports.setStatusFailed = setStatusFailed;
exports.setStatusSucceeded = setStatusSucceeded;
exports.setStatusLoading = setStatusLoading;
exports.setStatusIdle = setStatusIdle;
exports.setSearchResults = setSearchResults;
exports.setCategory = setCategory;
exports.setSearchTerm = setSearchTerm;

var selectSearchResults = function selectSearchResults(state) {
  return state.search.searchResults;
};

exports.selectSearchResults = selectSearchResults;

var selectStatus = function selectStatus(state) {
  return state.search.status;
};

exports.selectStatus = selectStatus;

var selectSearchTerm = function selectSearchTerm(state) {
  return state.search.searchTerm;
};

exports.selectSearchTerm = selectSearchTerm;

var selectCategoryId = function selectCategoryId(state) {
  return state.search.categoryId;
};

exports.selectCategoryId = selectCategoryId;

var selectError = function selectError(state) {
  return state.search.error;
};

exports.selectError = selectError;
var _default = productsSlice.reducer;
exports["default"] = _default;